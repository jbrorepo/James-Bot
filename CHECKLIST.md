# Pre-Launch Checklist

Use this checklist before starting the server or deploying.

## Local Development Setup

- [ ] Python 3.11+ installed
- [ ] Virtual environment created (`python -m venv venv`)
- [ ] Virtual environment activated
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created from `.env.example`
- [ ] OpenAI API key added to `.env` file
- [ ] API key is valid (starts with `sk-`)
- [ ] Diagnostic script passes (`python check_setup.py`)

## File Verification

- [ ] `app_minimal.py` exists
- [ ] `config.yaml` exists and is valid
- [ ] `james_qa.json` exists with Q&A pairs
- [ ] `index.html` exists
- [ ] `chat.html` exists
- [ ] `requirements.txt` exists
- [ ] `.gitignore` includes `.env`

## Server Testing

- [ ] Server starts without errors
- [ ] Health endpoint works: http://localhost:8000/health
- [ ] Health check shows `"openai_ready": true`
- [ ] Health check shows `"qa_pairs_loaded": 46` (or similar)
- [ ] Portfolio page loads: http://localhost:8000
- [ ] Chat page loads: http://localhost:8000/chat.html
- [ ] Chat sends messages successfully
- [ ] Bot responds with relevant answers
- [ ] Bot redirects when asked unknown questions

## Functionality Testing

- [ ] Ask: "What is your current role at Arctic Wolf?"
  - Should get detailed answer about CSE3 & Team Lead role
- [ ] Ask: "Tell me about your hobbies"
  - Should get answer about personal interests
- [ ] Ask: "What is the meaning of life?"
  - Should redirect to contact James directly
- [ ] Test suggested questions in chat interface
- [ ] Test export functionality (PDF, Word)
- [ ] Test contact buttons work
- [ ] Test resume download link

## Security Checks

- [ ] `.env` file is in `.gitignore`
- [ ] No API keys in code files
- [ ] No API keys in config files
- [ ] `conversation_logs/` in `.gitignore`
- [ ] CORS configured appropriately for environment

## Pre-Deployment Checklist

### Environment Variables
- [ ] `OPENAI_API_KEY` set on hosting platform
- [ ] No hardcoded API keys in code
- [ ] Environment-specific configs ready

### Code Updates
- [ ] CORS origins updated in `app_minimal.py` (if needed)
- [ ] Model in `config.yaml` is available and tested
- [ ] All file paths are relative, not absolute
- [ ] No localhost URLs in production code

### Platform-Specific
- [ ] Railway: `railway.json` configured
- [ ] Heroku: `Procfile` configured
- [ ] Health check endpoint working
- [ ] Port configuration uses `$PORT` environment variable

### Testing
- [ ] Test deployment on staging environment first
- [ ] Verify all pages load correctly
- [ ] Test chat functionality on deployed URL
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Test on different browsers

### Documentation
- [ ] README.md updated with deployment URL
- [ ] Contact information is correct
- [ ] Links to LinkedIn, email, Calendly work
- [ ] Resume file is uploaded and accessible

## Post-Deployment Verification

- [ ] Portfolio page loads on production URL
- [ ] Chat interface works on production
- [ ] Bot responds correctly
- [ ] Analytics endpoints work (if enabled)
- [ ] No console errors in browser
- [ ] SSL certificate valid (HTTPS)
- [ ] Mobile responsive design works
- [ ] All external links work

## Monitoring Setup

- [ ] Error logging configured
- [ ] Analytics tracking set up (optional)
- [ ] Conversation logging working (optional)
- [ ] Health check monitoring (optional)
- [ ] API usage monitoring (OpenAI dashboard)

## Maintenance

- [ ] Backup `.env` file securely
- [ ] Document any custom configurations
- [ ] Set up alerts for API errors
- [ ] Plan for API key rotation
- [ ] Schedule regular dependency updates

---

## Quick Commands

**Run diagnostic:**
```bash
python check_setup.py
```

**Start server:**
```bash
# Windows
start_server.bat

# Mac/Linux
./start_server.sh
```

**Test health:**
```bash
curl http://localhost:8000/health
```

**Test chat:**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "history": []}'
```

---

## Common Issues

If any check fails, see:
- `TROUBLESHOOTING.md` - Detailed solutions
- `SETUP_GUIDE.md` - Complete setup instructions
- `QUICK_START.md` - Fast setup guide

---

## Ready to Launch?

All checkboxes checked? Great! You're ready to:

1. **Local:** Run `start_server.bat` or `./start_server.sh`
2. **Deploy:** Push to your hosting platform
3. **Share:** Send the URL to recruiters and contacts

Good luck! 🚀
