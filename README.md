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

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Get your API key from:** https://platform.openai.com/api-keys

### 3. Start the Backend

**Easy way (Windows):**
```cmd
start_server.bat
```

**Easy way (Mac/Linux):**
```bash
chmod +x start_server.sh
./start_server.sh
```

**Manual way:**
```bash
uvicorn app_minimal:app --reload --host 0.0.0.0 --port 8000
```

### 4. Open the UI

Open your browser to: **http://localhost:8000**

The chat interface will connect to your local backend automatically.

## Testing

Once the server is running:
1. Open http://localhost:8000 in your browser (not just the HTML file!)
2. Click "Chat with My AI Assistant" or navigate to http://localhost:8000/chat.html
3. Try the suggested questions or ask your own
4. The bot will respond using **only** verified information from `james_qa.json`
5. If you ask something outside the knowledge base, it will redirect you to James's contact info

**Health Check:** Visit http://localhost:8000/health to verify the server is running correctly.

## Files

- `app_minimal.py` - FastAPI backend with semantic search and GPT integration
- `config.yaml` - Model configuration and strict system prompt
- `james_qa.json` - 42+ curated, validated Q&A pairs
- `index.html` - Main portfolio page with dark theme
- `chat.html` - AI chat interface
- `requirements.txt` - Python dependencies
- `start_server.bat` - Windows startup script
- `start_server.sh` - Mac/Linux startup script
- `.env` - Environment variables (create from .env.example)

## Deployment

For production:
1. Set your OpenAI API key as an environment variable on your hosting platform
2. Update CORS origins in `app_minimal.py` to your domain (change `allow_origins=["*"]` to your specific domain)
3. Deploy backend to your hosting platform (Railway, Heroku, AWS, etc.)
4. The app will automatically serve the HTML files from the root directory
5. Access your deployed URL to see the portfolio

**Recommended Platforms:**
- Railway (easiest - uses railway.json config)
- Heroku (uses Procfile)
- AWS Elastic Beanstalk
- Google Cloud Run
- Azure App Service

See `SETUP_GUIDE.md` for detailed deployment instructions.

## Model Information

This project uses **gpt-4o-mini** by default for reliable performance and cost-effectiveness. The code automatically handles parameter differences between model versions and will work with:
- GPT-4o-mini (default, recommended)
- GPT-4, GPT-4-turbo
- GPT-3.5-turbo
- Newer models (GPT-5.x, o3, o1) when available

To change the model, edit `config.yaml` and update the `model` field.

## Contact

If the bot doesn't have the information you need:
- **LinkedIn**: https://www.linkedin.com/in/james-bell-tam
- **Email**: jamesbellworkrelated@gmail.com
