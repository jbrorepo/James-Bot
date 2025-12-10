# Minimal test version - no dependencies on external files
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
def serve_root():
    return {"message": "James Bell Portfolio API", "status": "running"}

@app.post("/chat")
def chat_endpoint(payload: ChatRequest):
    return ChatResponse(reply="Hello! This is a test response. The full AI assistant will be available soon.")

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)