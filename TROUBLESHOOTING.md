# Troubleshooting Guide

## Quick Diagnostic

Run this first to check your setup:
```bash
python check_setup.py
```

This will identify most common issues automatically.

---

## Common Issues and Solutions

### 1. "Cannot connect to server" / Chat not working

**Symptoms:**
- Chat interface shows "Failed to connect" error
- Messages don't send
- Typing indicator appears but no response

**Solutions:**

**A. Server not running**
```bash
# Check if server is running
# You should see output like "Uvicorn running on http://0.0.0.0:8000"

# If not running, start it:
uvicorn app_minimal:app --reload --host 0.0.0.0 --port 8000
```

**B. Opening HTML file directly (wrong!)**
- ❌ Wrong: `file:///C:/Users/You/project/index.html`
- ✅ Correct: `http://localhost:8000`

**Solution:** Always access through the server URL, not by opening the HTML file directly.

**C. Port already in use**
```bash
# Use a different port
uvicorn app_minimal:app --reload --host 0.0.0.0 --port 8001

# Then access: http://localhost:8001
```

---

### 2. "OpenAI API key not found" / "Authentication failed"

**Symptoms:**
- Server starts but chat returns errors
- Health check shows `"openai_ready": false`
- Console shows "OpenAI setup failed"

**Solutions:**

**A. Missing .env file**
```bash
# Create .env file
cp .env.example .env

# Edit .env and add your key:
OPENAI_API_KEY=sk-your-actual-key-here
```

**B. Invalid API key format**
- API keys start with `sk-`
- No spaces or quotes around the key
- Get a new key from: https://platform.openai.com/api-keys

**C. Environment variable not loaded**
```bash
# Windows CMD:
set OPENAI_API_KEY=sk-your-key-here

# Windows PowerShell:
$env:OPENAI_API_KEY="sk-your-key-here"

# Mac/Linux:
export OPENAI_API_KEY=sk-your-key-here
```

---

### 3. "Module not found" errors

**Symptoms:**
```
ModuleNotFoundError: No module named 'fastapi'
ModuleNotFoundError: No module named 'openai'
```

**Solutions:**

**A. Dependencies not installed**
```bash
pip install -r requirements.txt
```

**B. Wrong Python environment**
```bash
# Create and activate virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate

# Then install:
pip install -r requirements.txt
```

**C. Multiple Python versions**
```bash
# Use python3 explicitly
python3 -m pip install -r requirements.txt
```

---

### 4. "Model not found" / "Invalid model" errors

**Symptoms:**
```
Error: The model `gpt-5.2` does not exist
```

**Solution:**

Edit `config.yaml` and change to an available model:
```yaml
llm:
  config:
    model: gpt-4o-mini  # Recommended
    # Or: gpt-4, gpt-4-turbo, gpt-3.5-turbo
```

**Available models:**
- `gpt-4o-mini` (recommended - fast and cheap)
- `gpt-4o` (more capable)
- `gpt-4-turbo`
- `gpt-4`
- `gpt-3.5-turbo`

---

### 5. Server starts but pages show 404

**Symptoms:**
- http://localhost:8000 shows "Not Found"
- http://localhost:8000/health works
- HTML files exist but don't load

**Solutions:**

**A. Check file locations**
```bash
# Files must be in project root:
ls -la index.html chat.html portfolio.html

# If missing, they might be in a subdirectory
```

**B. Check FastAPI routes**
The server should have these routes:
- `/` → serves index.html
- `/chat.html` → serves chat.html
- `/chat` → API endpoint
- `/health` → health check

---

### 6. Chat works but gives wrong/generic answers

**Symptoms:**
- Bot responds but doesn't use james_qa.json
- Answers are generic or made up
- Bot doesn't redirect when it should

**Solutions:**

**A. Check Q&A file loaded**
Visit http://localhost:8000/health and check:
```json
{
  "qa_pairs_loaded": 42  // Should be > 0
}
```

**B. Verify james_qa.json format**
```bash
python -c "import json; print(len(json.load(open('james_qa.json'))['questions_and_answers']))"
```

**C. Check system prompt**
The `config.yaml` should have strict instructions about using only the Q&A data.

---

### 7. Slow responses or timeouts

**Symptoms:**
- Chat takes 30+ seconds to respond
- Sometimes times out completely
- Works but very slow

**Solutions:**

**A. Use faster model**
Edit `config.yaml`:
```yaml
llm:
  config:
    model: gpt-4o-mini  # Fastest
    max_tokens: 300     # Shorter responses = faster
```

**B. Check API rate limits**
- Free tier has lower rate limits
- Upgrade to paid tier for better performance
- Check: https://platform.openai.com/account/limits

**C. Network issues**
```bash
# Test OpenAI API directly
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

### 8. Python version too old

**Symptoms:**
```
SyntaxError: invalid syntax
TypeError: unsupported operand type(s)
```

**Solution:**

Check Python version:
```bash
python --version
# Need: Python 3.11 or higher
```

If too old:
1. Download Python 3.11+ from https://www.python.org/
2. Install and add to PATH
3. Recreate virtual environment with new Python

---

### 9. CORS errors in browser console

**Symptoms:**
```
Access to fetch at 'http://localhost:8000/chat' from origin 'null' has been blocked by CORS policy
```

**Solution:**

This happens when opening HTML files directly. Always use:
- ✅ http://localhost:8000
- ❌ file:///path/to/index.html

The server already has CORS enabled for all origins during development.

---

### 10. Conversation logs filling up disk

**Symptoms:**
- `conversation_logs/` folder getting large
- Disk space running low

**Solution:**

**A. Clear old logs**
```bash
# Windows:
rmdir /s /q conversation_logs

# Mac/Linux:
rm -rf conversation_logs
```

**B. Disable logging**
Comment out logging in `app_minimal.py`:
```python
# log_conversation(session_id, payload.message, bot_response, request)
```

---

## Still Having Issues?

### Check the logs

**Server logs:**
Look at the terminal where you ran `uvicorn` - errors will appear there.

**Browser console:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red error messages

### Verify setup

Run the diagnostic script:
```bash
python check_setup.py
```

### Test individual components

**1. Test Python imports:**
```bash
python -c "import fastapi, openai, yaml; print('OK')"
```

**2. Test OpenAI connection:**
```bash
python -c "from openai import OpenAI; client = OpenAI(); print('OK')"
```

**3. Test server health:**
```bash
curl http://localhost:8000/health
```

**4. Test chat endpoint:**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "history": []}'
```

---

## Getting Help

If none of these solutions work:

1. Run `python check_setup.py` and save the output
2. Check the server logs for error messages
3. Check browser console for errors
4. Note your:
   - Operating system
   - Python version
   - What you were trying to do
   - Exact error message

---

## Prevention Tips

1. **Always use a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```

2. **Keep dependencies updated**
   ```bash
   pip install --upgrade -r requirements.txt
   ```

3. **Never commit .env file**
   - It's in .gitignore for a reason
   - Use environment variables in production

4. **Test after changes**
   - Run `python check_setup.py`
   - Visit http://localhost:8000/health
   - Try a test chat message

5. **Use the startup scripts**
   - `start_server.bat` (Windows)
   - `start_server.sh` (Mac/Linux)
   - They handle environment setup automatically
