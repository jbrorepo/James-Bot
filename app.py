# Save this file as: app.py
#
# Minimal James Bell Bot backend using FastAPI + OpenAI.
# - Exposes a /chat endpoint that accepts a user message.
# - Uses embeddings over a local Q&A JSON file for retrieval.
# - Calls an OpenAI chat model (configured in config.yaml).
#
# NOTE:
# * Set the OPENAI_API_KEY environment variable before running.
# * Ensure you have installed: openai, fastapi, uvicorn, pyyaml
#   e.g. `pip install openai fastapi uvicorn pyyaml`

import json
import os
from typing import List, Dict, Any

import yaml
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from openai import OpenAI


# ---------- Config & Data Loading ----------

CONFIG_PATH = "config.yaml"
QA_PATH = "james_qa.json"  # rename james_qa.txt to this
RESUME_PATH = "resume.txt"  # optional, if you want extra context


def load_config(path: str) -> Dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_qa(path: str) -> List[Dict[str, str]]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
        # Handle both formats: direct array or wrapped in "questions_and_answers"
        if isinstance(data, list):
            return data
        elif isinstance(data, dict) and "questions_and_answers" in data:
            return data["questions_and_answers"]
        else:
            raise ValueError("Invalid Q&A JSON format")


def load_resume(path: str) -> str:
    if not os.path.exists(path):
        return ""
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


config = load_config(CONFIG_PATH)
qa_pairs = load_qa(QA_PATH)
resume_text = load_resume(RESUME_PATH)


# ---------- OpenAI Setup ----------

client = OpenAI()

llm_model = config["llm"]["config"]["model"]
embed_model = config["embedder"]["config"]["model"]
system_prompt = config["bot"]["system_prompt"]


# ---------- Embedding & Retrieval ----------

def compute_embeddings(texts: List[str]) -> List[List[float]]:
    # Chunk texts so we don't exceed embedding input limits if the list is large.
    embeddings: List[List[float]] = []
    batch_size = 64
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        resp = client.embeddings.create(
            model=embed_model,
            input=batch,
        )
        for d in resp.data:
            embeddings.append(d.embedding)
    return embeddings


def cosine_similarity(a: List[float], b: List[float]) -> float:
    # Basic cosine similarity without external dependencies.
    import math

    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


# Precompute embeddings for all QA entries at startup.
qa_corpus = [f"Q: {item['question']}\nA: {item['answer']}" for item in qa_pairs]

# Initialize embeddings with error handling
qa_embeddings = []
try:
    print("Computing embeddings for knowledge base...")
    qa_embeddings = compute_embeddings(qa_corpus)
    print(f"Successfully computed {len(qa_embeddings)} embeddings")
except Exception as e:
    print(f"Warning: Failed to compute embeddings at startup: {e}")
    print("Embeddings will be computed on first request")


def retrieve_relevant_qa(query: str, k: int = 6) -> List[Dict[str, str]]:
    """Return the top-k most semantically similar Q&A entries for the user query."""
    global qa_embeddings
    
    # Compute embeddings on first request if not done at startup
    if not qa_embeddings:
        print("Computing embeddings on first request...")
        qa_embeddings = compute_embeddings(qa_corpus)
    
    resp = client.embeddings.create(
        model=embed_model,
        input=[query],
    )
    query_emb = resp.data[0].embedding

    scored = []
    for item, emb in zip(qa_pairs, qa_embeddings):
        score = cosine_similarity(query_emb, emb)
        scored.append((score, item))

    scored.sort(key=lambda x: x[0], reverse=True)
    top_items = [item for score, item in scored[:k]]
    return top_items


# ---------- LLM Call ----------

def build_context_block(user_query: str) -> str:
    relevant = retrieve_relevant_qa(user_query, k=6)
    lines = []
    for item in relevant:
        lines.append(f"Q: {item['question']}")
        lines.append(f"A: {item['answer']}")
        lines.append("")
    qa_block = "\n".join(lines)

    resume_block = ""
    if resume_text.strip():
        resume_block = "\n\n[RESUME]\n" + resume_text.strip()

    context = f"""[Q&A KNOWLEDGE BASE]
{qa_block}{resume_block}
"""
    return context


def generate_answer(user_query: str) -> str:
    context = build_context_block(user_query)
    messages = [
        {
            "role": "system",
            "content": system_prompt + "\n\n" + context,
        },
        {
            "role": "user",
            "content": user_query,
        },
    ]

    # Use max_completion_tokens for newer models (GPT-5.1, o3, etc.)
    # Fall back to max_tokens for older models
    completion_params = {
        "model": llm_model,
        "messages": messages,
        "temperature": config["llm"]["config"]["temperature"],
        "top_p": config["llm"]["config"]["top_p"],
    }
    
    # GPT-5.1 and o3 models use max_completion_tokens
    if "gpt-5" in llm_model.lower() or "o3" in llm_model.lower():
        completion_params["max_completion_tokens"] = config["llm"]["config"]["max_tokens"]
    else:
        completion_params["max_tokens"] = config["llm"]["config"]["max_tokens"]
    
    resp = client.chat.completions.create(**completion_params)

    return resp.choices[0].message.content.strip()


# ---------- FastAPI Web App ----------

app = FastAPI(title="James Bell Bot")

# Enable CORS for website embedding
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static file serving removed - using simple FileResponse instead


class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []


class ChatResponse(BaseModel):
    reply: str


@app.get("/health")
def health_check():
    return {
        "status": "ok", 
        "qa_pairs_loaded": len(qa_pairs),
        "embeddings_ready": len(qa_embeddings) > 0
    }

@app.get("/")
def serve_portfolio():
    """Serve the main portfolio page at the root URL"""
    return FileResponse("index.html")

@app.get("/chat.html")
def serve_chat():
    """Serve the AI chat interface"""
    return FileResponse("chat.html")

@app.get("/portfolio.html")
def serve_portfolio_backup():
    """Serve the backup portfolio page"""
    return FileResponse("portfolio.html")

@app.get("/james-headshot.jpg")
def serve_headshot():
    """Serve the headshot image"""
    return FileResponse("james-headshot.jpg")


@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    # For now, we ignore `history` in retrieval to keep things simple and deterministic.
    answer = generate_answer(payload.message)
    return ChatResponse(reply=answer)


# You can run this locally with:
#   uvicorn app:app --host 0.0.0.0 --port 8000
#
# Your web team can then put a simple frontend on top of the /chat endpoint
# or wrap this in whatever hosting platform they prefer.