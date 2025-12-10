# James Bell AI Assistant — 2025 Edition

A secure, strictly factual AI web assistant designed to provide validated, pre-approved information about James Bell.

## PURPOSE

The assistant exists to enhance recruiter experience by:
- Answering common questions about James's experience at Arctic Wolf, personality, skills, and work history
- Demonstrating how AI can support—not replace—human interaction
- Redirecting users to James's real contact information when questions exceed validated content

**This is not a roleplay bot.** It is an informational retrieval system with personality guardrails.

## CORE PRINCIPLES

- **No hallucinations** — zero tolerance
- **No fabrication** of education, employers, claims, or achievements
- **No making up stories** or anecdotes not in the Q&A file
- **Only respond** with information in the james_qa.json file
- **If a question is outside the dataset**, redirect politely to James directly

## COMPONENTS

### 1. config.yaml
Defines:
- **OpenAI GPT-5.1** model for generation (with automatic parameter handling)
- **text-embedding-3-large** for retrieval
- Strict factuality mode with zero-tolerance system prompt
- Vector-based retrieval with cosine similarity

### 2. james_qa.json
A curated set of 42+ validated Q&A pairs about:
- James's current role as Concierge Security Engineer 3 & Team Lead at Arctic Wolf
- Leadership experience managing a team of 3 engineers supporting 120+ customers
- Cloud security hardening across AWS, Azure, and GCP
- Automation, scripting, and log analysis expertise
- Customer-facing communication and post-incident recovery
- AI career goals and technical philosophy
- Personal hobbies and professional tone

**This JSON file is the only allowed knowledge source.**

### 3. app.py (FastAPI Backend)
Implements:
- FastAPI REST API with `/chat` endpoint
- Strict system prompt controlling model behavior
- Semantic retrieval using embeddings and cosine similarity
- Fallback refusal logic with automatic redirect to:
  - LinkedIn: https://www.linkedin.com/in/james-bell-tam
  - Email: jamesbellworkrelated@gmail.com
- CORS enabled for website embedding

### 4. index.html (Chat UI)
Provides:
- Clean, professional dark-themed chat interface
- Real-time communication with FastAPI backend
- Typing indicators and smooth animations
- Suggested starter questions
- Mobile-responsive design

### 5. Deployment Requirements
- Python 3.11+
- FastAPI and Uvicorn
- OpenAI Python client
- PyYAML
- james_qa.json in project root
- config.yaml co-located
- See requirements.txt for full dependencies

## BEHAVIOR SUMMARY

```
User asks a question
  ↓
App normalizes input
  ↓
App checks stored Q&A pairs via semantic search
  ↓
  - If a match → return validated answer
  - If no match → polite refusal + redirect to James
  
No new facts are ever generated.
No improvisation is allowed.
```

## INTENDED OUTPUT STYLE

Tone is:
- Professional
- Empathetic
- Confident
- Brief when appropriate
- Slight humor allowed in personal questions

## WHY THIS MATTERS

The assistant demonstrates:
- Strong AI system design
- Ethical information containment
- Resume augmentation without misrepresentation
- AI-human partnership philosophy
- James's technical understanding of embeddings, retrieval, and system prompts

---

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

Or on Windows, simply run:
```cmd
start_server.bat
```

### 2. Set OpenAI API Key

The `start_server.bat` file already includes the API key configuration.

Alternatively, set it manually:

**Windows (CMD):**
```cmd
set OPENAI_API_KEY=your-api-key-here
```

**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY="your-api-key-here"
```

### 3. Start the Backend

**Easy way (Windows):**
```cmd
start_server.bat
```

**Manual way:**
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 4. Open the UI

Simply open `index.html` in your browser. The chat interface will connect to your local backend at `http://localhost:8000`.

## Testing

Once the server is running:
1. Open `index.html` in your browser
2. Try the suggested questions or ask your own
3. The bot will respond using **only** verified information from `james_qa.json`
4. If you ask something outside the knowledge base, it will redirect you to James's contact info

## Files

- `app.py` - FastAPI backend with semantic search and GPT-5.1 integration
- `config.yaml` - Model configuration and strict system prompt
- `james_qa.json` - 42 curated, validated Q&A pairs
- `index.html` - Dark-themed chat UI
- `requirements.txt` - Python dependencies
- `start_server.bat` - Windows startup script

## Deployment

For production:
1. Update CORS origins in `app.py` to your domain (change `allow_origins=["*"]`)
2. Deploy backend to your hosting platform (Heroku, Railway, AWS, etc.)
3. Update `API_URL` in `index.html` to your backend URL
4. Embed `index.html` on your website or serve it statically

## Model Information

This project uses **GPT-5.1** which requires `max_completion_tokens` instead of the older `max_tokens` parameter. The code automatically handles this difference and will work with both newer models (GPT-5.x, o3) and older models (GPT-4, GPT-3.5).

## Contact

If the bot doesn't have the information you need:
- **LinkedIn**: https://www.linkedin.com/in/james-bell-tam
- **Email**: jamesbellworkrelated@gmail.com
