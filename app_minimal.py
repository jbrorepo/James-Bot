# Full James Bell Portfolio with AI Chat
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

def load_config(path: str) -> Dict[str, Any]:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except Exception as e:
        print(f"Warning: Could not load config: {e}")
        return {
            "llm": {"config": {"model": "gpt-4o-mini", "temperature": 0.3, "max_tokens": 900, "top_p": 1.0}},
            "embedder": {"config": {"model": "text-embedding-3-large"}},
            "bot": {"system_prompt": "You are James Bell's AI assistant. Answer questions about his professional background."}
        }

def load_qa(path: str) -> List[Dict[str, str]]:
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
            elif isinstance(data, dict) and "questions_and_answers" in data:
                return data["questions_and_answers"]
            else:
                return []
    except Exception as e:
        print(f"Warning: Could not load Q&A: {e}")
        return [{"question": "Who is James Bell?", "answer": "James Bell is a Concierge Security Engineer 3 & Team Lead at Arctic Wolf."}]

# Load configuration with error handling
config = load_config("config.yaml")
qa_pairs = load_qa("james_qa.json")

# OpenAI Setup with error handling
try:
    client = OpenAI()
    llm_model = config["llm"]["config"]["model"]
    system_prompt = config["bot"]["system_prompt"]
    print(f"OpenAI client initialized with model: {llm_model}")
except Exception as e:
    print(f"Warning: OpenAI setup failed: {e}")
    client = None

app = FastAPI(title="James Bell Portfolio")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        "openai_ready": client is not None,
        "model": llm_model if client else "not configured"
    }

@app.get("/")
def serve_portfolio():
    """Serve the main portfolio page"""
    if os.path.exists("index.html"):
        return FileResponse("index.html")
    return {"message": "James Bell Portfolio API", "status": "running", "note": "index.html not found"}

@app.get("/chat.html")
def serve_chat():
    """Serve the AI chat interface"""
    if os.path.exists("chat.html"):
        return FileResponse("chat.html")
    return {"error": "chat.html not found"}

@app.get("/james-headshot.jpg")
def serve_headshot():
    """Serve the headshot image"""
    if os.path.exists("james-headshot.jpg"):
        return FileResponse("james-headshot.jpg")
    return {"error": "james-headshot.jpg not found"}

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    """AI Chat endpoint with fallback logic"""
    try:
        if not client:
            return ChatResponse(reply="AI assistant is currently unavailable. Please contact James directly at jamesbellworkrelated@gmail.com")
        
        # Simple keyword matching for relevant Q&A
        message = payload.message.lower()
        
        # Find best matching Q&A
        best_match = None
        best_score = 0
        
        for qa in qa_pairs:
            question_words = qa["question"].lower().split()
            message_words = message.split()
            
            # Simple word overlap scoring
            overlap = len(set(question_words) & set(message_words))
            if overlap > best_score:
                best_score = overlap
                best_match = qa
        
        # If we found a decent match, use it
        if best_match and best_score > 0:
            context = f"Based on this Q&A: Q: {best_match['question']} A: {best_match['answer']}"
            
            messages = [
                {"role": "system", "content": f"{system_prompt}\n\n{context}"},
                {"role": "user", "content": payload.message}
            ]
            
            # Use max_completion_tokens for GPT-5.1 and newer models
            completion_params = {
                "model": llm_model,
                "messages": messages,
                "temperature": config["llm"]["config"]["temperature"],
                "top_p": config["llm"]["config"]["top_p"],
            }
            
            if "gpt-5" in llm_model.lower() or "o3" in llm_model.lower():
                completion_params["max_completion_tokens"] = config["llm"]["config"]["max_tokens"]
            else:
                completion_params["max_tokens"] = config["llm"]["config"]["max_tokens"]
            
            resp = client.chat.completions.create(**completion_params)
            return ChatResponse(reply=resp.choices[0].message.content.strip())
        
        # No good match found
        return ChatResponse(reply="I don't have specific information about that. Please contact James directly at jamesbellworkrelated@gmail.com or connect on LinkedIn at https://www.linkedin.com/in/james-bell-tam")
        
    except Exception as e:
        print(f"Chat error: {e}")
        return ChatResponse(reply="I'm experiencing technical difficulties. Please contact James directly at jamesbellworkrelated@gmail.com")

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)