# James Bell AI Assistant - Setup Guide

## Quick Start (5 minutes)

### Prerequisites
- Python 3.11 or higher
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Git (optional, for cloning)

### Step 1: Install Dependencies

**Windows:**
```cmd
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 2: Configure OpenAI API Key

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### Step 3: Start the Server

**Windows (Easy Way):**
```cmd
start_server.bat
```

**Mac/Linux:**
```bash
chmod +x start_server.sh
./start_server.sh
```

**Manual Way (All Platforms):**
```bash
uvicorn app_minimal:app --reload --host 0.0.0.0 --port 8000
```

### Step 4: Open in Browser

1. Open your browser to: http://localhost:8000
2. You should see the portfolio page
3. Click "Chat with My AI Assistant" to test the chatbot

---

## Troubleshooting

### Issue: "OpenAI API key not found"
**Solution:** Make sure you've created a `.env` file with your API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

### Issue: "Module not found" errors
**Solution:** Install dependencies:
```bash
pip install -r requirements.txt
```

### Issue: "Port 8000 already in use"
**Solution:** Either:
1. Stop the other process using port 8000, or
2. Use a different port:
   ```bash
   uvicorn app_minimal:app --reload --host 0.0.0.0 --port 8001
   ```

### Issue: Chat not working / "Failed to connect"
**Solution:** 
1. Make sure the backend server is running (check terminal)
2. Check that you're accessing http://localhost:8000 (not just opening the HTML file)
3. Verify your OpenAI API key is valid

### Issue: "GPT-5.2 model not found"
**Solution:** The config has been updated to use `gpt-4o-mini` which is widely available. If you want to use a different model, edit `config.yaml`:
```yaml
llm:
  config:
    model: gpt-4o-mini  # or gpt-4, gpt-3.5-turbo, etc.
```

---

## File Structure

```
.
├── app_minimal.py          # FastAPI backend server
├── config.yaml             # Model and bot configuration
├── james_qa.json           # Knowledge base (Q&A pairs)
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (create this!)
├── index.html              # Main portfolio page
├── chat.html               # AI chat interface
├── portfolio.html          # Alternative portfolio page
├── start_server.bat        # Windows startup script
├── start_server.sh         # Mac/Linux startup script
└── README.md               # Project documentation
```

---

## Testing the Application

### 1. Test the Backend API

Open http://localhost:8000/health in your browser. You should see:
```json
{
  "status": "ok",
  "version": "full_ai_v2",
  "qa_pairs_loaded": 42,
  "openai_ready": true,
  "model": "gpt-4o-mini"
}
```

### 2. Test the Portfolio Page

Open http://localhost:8000 - you should see James Bell's portfolio.

### 3. Test the Chat Interface

1. Click "Chat with My AI Assistant" or go to http://localhost:8000/chat.html
2. Try asking: "What is your current role at Arctic Wolf?"
3. The bot should respond with information about James's role

### 4. Test Analytics Endpoints

- http://localhost:8000/analytics - View basic analytics
- http://localhost:8000/conversations - View conversation logs

---

## Deployment

### Deploy to Railway

1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add environment variable: `OPENAI_API_KEY`
4. Railway will automatically detect and deploy using `railway.json`

### Deploy to Heroku

1. Create account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create your-app-name
   heroku config:set OPENAI_API_KEY=your-key-here
   git push heroku main
   ```

### Deploy to Other Platforms

The app uses standard Python/FastAPI, so it works on:
- AWS (Elastic Beanstalk, Lambda)
- Google Cloud (App Engine, Cloud Run)
- Azure (App Service)
- DigitalOcean (App Platform)
- Vercel, Netlify (with serverless functions)

---

## Configuration

### Changing the AI Model

Edit `config.yaml`:
```yaml
llm:
  config:
    model: gpt-4o-mini  # Change to: gpt-4, gpt-3.5-turbo, etc.
    temperature: 0.3    # Lower = more focused, Higher = more creative
    max_tokens: 900     # Maximum response length
```

### Adding More Q&A Pairs

Edit `james_qa.json` and add new entries:
```json
{
  "question": "Your question here?",
  "answer": "Your detailed answer here."
}
```

### Customizing the System Prompt

Edit the `bot.system_prompt` section in `config.yaml` to change how the AI behaves.

---

## Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Protect your API key** - Don't share it publicly
3. **Use environment variables** - For production deployments
4. **Enable CORS properly** - Update `allow_origins` in `app_minimal.py` for production
5. **Rate limiting** - Consider adding rate limiting for production use

---

## Support

If you encounter issues:
1. Check this guide's Troubleshooting section
2. Review the terminal output for error messages
3. Verify all prerequisites are installed
4. Check that your OpenAI API key is valid and has credits

---

## License

This project is for portfolio demonstration purposes.
