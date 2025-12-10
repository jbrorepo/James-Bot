# Simplified version for debugging Railway deployment
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
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def load_qa(path: str) -> List[Dict[str, str]]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
        if isinstance(data, list):
            return data
        elif isinstance(data, dict) and "questions_and_answers" in data:
            return data["questions_and_answers"]
        else:
            raise ValueError("Invalid Q&A JSON format")

# Load configuration
config = load_config("config.yaml")
qa_pairs = load_qa("james_qa.json")

# OpenAI Setup
client = OpenAI()
llm_model = config["llm"]["config"]["model"]
system_prompt = config["bot"]["system_prompt"]

# ---------- FastAPI App ----------

app = FastAPI(title="James Bell Bot")

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
    return {"status": "ok", "qa_pairs": len(qa_pairs)}

@app.get("/")
def serve_portfolio():
    return FileResponse("index.html")

@app.get("/chat.html")
def serve_chat():
    return FileResponse("chat.html")

@app.get("/james-headshot.jpg")
def serve_headshot():
    return FileResponse("james-headshot.jpg")

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    # Simple response without embeddings for now
    message = payload.message.lower()
    
    # Simple keyword matching for testing
    for qa in qa_pairs[:5]:  # Just check first 5 for speed
        if any(word in message for word in qa["question"].lower().split()[:3]):
            return ChatResponse(reply=qa["answer"])
    
    # Default response
    return ChatResponse(reply="I don't have specific information about that. Please contact James directly at jamesbellworkrelated@gmail.com or connect on LinkedIn at https://www.linkedin.com/in/james-bell-tam")