# Minimal test version - adding static file serving
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

app = FastAPI(title="James Bell Bot - Minimal")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "minimal"}

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

@app.post("/chat")
def chat_endpoint(payload: ChatRequest):
    return ChatResponse(reply="Hello! This is a test response. The full AI assistant will be available soon.")

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)