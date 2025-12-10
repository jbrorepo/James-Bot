# Full James Bell Portfolio with AI Chat
import json
import os
from typing import List, Dict, Any
from datetime import datetime
import logging

import yaml
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from openai import OpenAI

# Set up logging for analytics
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Simple in-memory analytics (in production, use a database)
analytics_data = {
    "page_views": 0,
    "chat_interactions": 0,
    "resume_downloads": 0,
    "visitors": [],
    "chat_sessions": []
}

# Conversation logging system
conversations = {}  # session_id -> conversation data
import uuid
import hashlib

def get_session_id(request: Request) -> str:
    """Generate a unique session ID for tracking conversations"""
    # Use IP + User Agent to create a session identifier
    ip = request.client.host
    user_agent = request.headers.get("user-agent", "")
    session_data = f"{ip}_{user_agent}_{datetime.now().strftime('%Y%m%d')}"
    return hashlib.md5(session_data.encode()).hexdigest()[:12]

def log_conversation(session_id: str, user_message: str, bot_response: str, request: Request):
    """Log a complete conversation turn"""
    if session_id not in conversations:
        conversations[session_id] = {
            "session_id": session_id,
            "start_time": datetime.now().isoformat(),
            "ip_address": request.client.host,
            "user_agent": request.headers.get("user-agent", ""),
            "conversation_turns": [],
            "total_messages": 0
        }
    
    # Add this conversation turn
    turn = {
        "turn_number": len(conversations[session_id]["conversation_turns"]) + 1,
        "timestamp": datetime.now().isoformat(),
        "user_message": user_message,
        "bot_response": bot_response,
        "message_length": len(user_message),
        "response_length": len(bot_response)
    }
    
    conversations[session_id]["conversation_turns"].append(turn)
    conversations[session_id]["total_messages"] += 1
    conversations[session_id]["last_activity"] = datetime.now().isoformat()
    
    # Also save to file for persistence
    save_conversation_to_file(session_id, turn)

def save_conversation_to_file(session_id: str, turn: dict):
    """Save conversation turn to a file for persistence"""
    try:
        # Create logs directory if it doesn't exist
        os.makedirs("conversation_logs", exist_ok=True)
        
        # Save individual conversation file
        filename = f"conversation_logs/session_{session_id}.json"
        
        # Load existing conversation or create new
        if os.path.exists(filename):
            with open(filename, 'r', encoding='utf-8') as f:
                conversation_data = json.load(f)
        else:
            conversation_data = conversations[session_id].copy()
            conversation_data["conversation_turns"] = []
        
        # Add new turn
        conversation_data["conversation_turns"].append(turn)
        conversation_data["total_messages"] = len(conversation_data["conversation_turns"])
        conversation_data["last_activity"] = turn["timestamp"]
        
        # Save back to file
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(conversation_data, f, indent=2, ensure_ascii=False)
            
        logger.info(f"Saved conversation turn to {filename}")
        
    except Exception as e:
        logger.error(f"Failed to save conversation: {e}")

def export_all_conversations():
    """Export all conversations to a single file for analysis"""
    try:
        export_data = {
            "export_timestamp": datetime.now().isoformat(),
            "total_sessions": len(conversations),
            "conversations": list(conversations.values())
        }
        
        filename = f"conversation_logs/all_conversations_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, ensure_ascii=False)
            
        return filename
    except Exception as e:
        logger.error(f"Failed to export conversations: {e}")
        return None

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
        "version": "full_ai_v2",
        "qa_pairs_loaded": len(qa_pairs),
        "openai_ready": client is not None,
        "model": llm_model if client else "not configured"
    }

@app.get("/analytics")
def get_analytics():
    """Analytics dashboard - basic stats"""
    recent_visitors = analytics_data["visitors"][-10:]  # Last 10 visitors
    recent_chats = analytics_data["chat_sessions"][-5:]  # Last 5 chats
    
    return {
        "summary": {
            "total_page_views": analytics_data["page_views"],
            "total_chat_interactions": analytics_data["chat_interactions"],
            "total_resume_downloads": analytics_data["resume_downloads"],
            "total_visitors": len(analytics_data["visitors"]),
            "total_conversation_sessions": len(conversations),
            "total_conversation_turns": sum(conv["total_messages"] for conv in conversations.values())
        },
        "recent_activity": {
            "recent_visitors": recent_visitors,
            "recent_chats": recent_chats
        },
        "generated_at": datetime.now().isoformat()
    }

@app.get("/conversations")
def get_conversations():
    """Get all conversation sessions for analysis"""
    return {
        "total_sessions": len(conversations),
        "conversations": list(conversations.values()),
        "generated_at": datetime.now().isoformat()
    }

@app.get("/conversations/export")
def export_conversations():
    """Export all conversations to a downloadable file"""
    filename = export_all_conversations()
    if filename and os.path.exists(filename):
        return FileResponse(filename, 
                          filename=os.path.basename(filename),
                          media_type="application/json")
    return {"error": "Failed to export conversations"}

@app.get("/conversations/{session_id}")
def get_conversation(session_id: str):
    """Get a specific conversation by session ID"""
    if session_id in conversations:
        return conversations[session_id]
    
    # Try to load from file if not in memory
    filename = f"conversation_logs/session_{session_id}.json"
    if os.path.exists(filename):
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            return {"error": f"Failed to load conversation: {e}"}
    
    return {"error": "Conversation not found"}

@app.delete("/conversations/{session_id}")
def delete_conversation(session_id: str):
    """Delete a specific conversation"""
    # Remove from memory
    if session_id in conversations:
        del conversations[session_id]
    
    # Remove file
    filename = f"conversation_logs/session_{session_id}.json"
    if os.path.exists(filename):
        try:
            os.remove(filename)
            return {"message": f"Conversation {session_id} deleted successfully"}
        except Exception as e:
            return {"error": f"Failed to delete conversation file: {e}"}
    
    return {"message": "Conversation not found or already deleted"}

@app.get("/")
def serve_portfolio(request: Request):
    """Serve the main portfolio page"""
    # Track page view
    analytics_data["page_views"] += 1
    visitor_info = {
        "timestamp": datetime.now().isoformat(),
        "ip": request.client.host,
        "user_agent": request.headers.get("user-agent", ""),
        "page": "portfolio"
    }
    analytics_data["visitors"].append(visitor_info)
    logger.info(f"Portfolio view from {request.client.host}")
    
    if os.path.exists("index.html"):
        return FileResponse("index.html")
    return {"message": "James Bell Portfolio API", "status": "running", "note": "index.html not found"}

@app.get("/chat.html")
def serve_chat(request: Request):
    """Serve the AI chat interface"""
    # Track chat page view
    visitor_info = {
        "timestamp": datetime.now().isoformat(),
        "ip": request.client.host,
        "user_agent": request.headers.get("user-agent", ""),
        "page": "chat"
    }
    analytics_data["visitors"].append(visitor_info)
    logger.info(f"Chat page view from {request.client.host}")
    
    if os.path.exists("chat.html"):
        return FileResponse("chat.html")
    return {"error": "chat.html not found"}

@app.get("/resume")
def download_resume(request: Request):
    """Serve downloadable resume"""
    # Track resume download
    analytics_data["resume_downloads"] += 1
    visitor_info = {
        "timestamp": datetime.now().isoformat(),
        "ip": request.client.host,
        "user_agent": request.headers.get("user-agent", ""),
        "action": "resume_download"
    }
    analytics_data["visitors"].append(visitor_info)
    logger.info(f"Resume download from {request.client.host}")
    
    # Check for resume file
    resume_filename = "James Bell Resume 2025.pdf"
    if os.path.exists(resume_filename):
        return FileResponse(resume_filename, 
                          filename="James_Bell_Resume_2025.pdf",
                          media_type="application/pdf")
    
    # Fallback if file not found
    return {"message": f"Resume file not found. Please ensure '{resume_filename}' is uploaded to the project."}

@app.get("/james-headshot.jpg")
def serve_headshot():
    """Serve the headshot image"""
    if os.path.exists("james-headshot.jpg"):
        return FileResponse("james-headshot.jpg")
    return {"error": "james-headshot.jpg not found"}

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest, request: Request):
    """AI Chat endpoint with comprehensive conversation logging"""
    # Get session ID for this user
    session_id = get_session_id(request)
    
    # Track chat interaction
    analytics_data["chat_interactions"] += 1
    chat_session = {
        "timestamp": datetime.now().isoformat(),
        "session_id": session_id,
        "ip": request.client.host,
        "user_agent": request.headers.get("user-agent", ""),
        "message": payload.message[:100],  # First 100 chars for privacy
        "message_length": len(payload.message)
    }
    analytics_data["chat_sessions"].append(chat_session)
    logger.info(f"Chat interaction from {request.client.host} (session: {session_id}): {len(payload.message)} chars")
    
    try:
        if not client:
            return ChatResponse(reply="AI assistant is currently unavailable. Please contact James directly at jamesbellworkrelated@gmail.com")
        
        # Handle conversational patterns and Q&A matching
        message = payload.message.lower().strip()
        
        # Handle greetings and basic conversation
        greeting_patterns = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'howdy']
        thanks_patterns = ['thank you', 'thanks', 'appreciate it', 'thx', 'ty']
        goodbye_patterns = ['bye', 'goodbye', 'see you', 'farewell', 'take care', 'later', 'ttyl']
        help_patterns = ['help', 'what can you do', 'what do you know', 'how does this work']
        who_patterns = ['who are you', 'what are you', 'tell me about yourself', 'introduce yourself']
        
        # Check for conversational patterns first
        if any(pattern in message for pattern in greeting_patterns):
            greeting_response = """Hello! I'm James Bell's AI assistant, designed to answer questions about his professional background and experience. I only provide information that's been verified and documented in my knowledge base - no fabrications or assumptions.

I can tell you about James's current role as a Concierge Security Engineer 3 & Team Lead at Arctic Wolf, his technical skills, leadership experience, customer success approach, and AI career goals.

What would you like to know about James's background?"""
            
            # Log the conversation turn
            log_conversation(session_id, payload.message, greeting_response, request)
            return ChatResponse(reply=greeting_response)
        
        elif any(pattern in message for pattern in thanks_patterns):
            thanks_response = "You're welcome! Feel free to ask me anything else about James's experience, or you can contact him directly at jamesbellworkrelated@gmail.com or connect on LinkedIn at https://www.linkedin.com/in/james-bell-tam"
            
            # Log the conversation turn
            log_conversation(session_id, payload.message, thanks_response, request)
            return ChatResponse(reply=thanks_response)
        
        elif any(pattern in message for pattern in goodbye_patterns):
            goodbye_response = "Thanks for chatting! If you'd like to continue the conversation with James directly, you can reach him at jamesbellworkrelated@gmail.com or schedule a call at https://calendly.com/jamesbellworkrelated. Have a great day!"
            
            # Log the conversation turn
            log_conversation(session_id, payload.message, goodbye_response, request)
            return ChatResponse(reply=goodbye_response)
        
        elif any(pattern in message for pattern in help_patterns):
            help_response = """I'm here to answer questions about James Bell's professional background! I can tell you about:

• His current role as Concierge Security Engineer 3 & Team Lead at Arctic Wolf
• His technical skills in security, cloud platforms, and automation
• His leadership experience and customer success approach
• His AI projects and career goals
• His work philosophy and personal interests

I only share verified information from my knowledge base - no made-up details. What specific aspect of James's background interests you most?"""
            
            # Log the conversation turn
            log_conversation(session_id, payload.message, help_response, request)
            return ChatResponse(reply=help_response)
        
        elif any(pattern in message for pattern in who_patterns):
            intro_response = """I'm James Bell's AI assistant! I was actually built by James himself as a demonstration of his AI development skills. 

I'm designed to answer questions about James's professional background using only verified information from a curated knowledge base. I can tell you about his role at Arctic Wolf, his technical expertise, leadership experience, and career goals.

This AI assistant showcases James's hands-on experience with GPT-5.1, FastAPI, retrieval-augmented generation, and responsible AI practices.

What would you like to know about James?"""
            
            # Log the conversation turn
            log_conversation(session_id, payload.message, intro_response, request)
            return ChatResponse(reply=intro_response)
        
        # Find best matching Q&A for substantive questions
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
            bot_response = resp.choices[0].message.content.strip()
            
            # Log the complete conversation turn
            log_conversation(session_id, payload.message, bot_response, request)
            
            return ChatResponse(reply=bot_response)
        
        # No good match found
        fallback_response = "I don't have specific information about that. Please contact James directly at jamesbellworkrelated@gmail.com or connect on LinkedIn at https://www.linkedin.com/in/james-bell-tam"
        
        # Log the conversation turn even for fallback responses
        log_conversation(session_id, payload.message, fallback_response, request)
        
        return ChatResponse(reply=fallback_response)
        
    except Exception as e:
        print(f"Chat error: {e}")
        error_response = "I'm experiencing technical difficulties. Please contact James directly at jamesbellworkrelated@gmail.com"
        
        # Log error conversations too for debugging
        try:
            log_conversation(session_id, payload.message, error_response, request)
        except:
            pass  # Don't let logging errors break the response
            
        return ChatResponse(reply=error_response)

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)