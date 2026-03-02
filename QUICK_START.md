# Quick Start - Get Running in 2 Minutes

## Step 1: Get Your OpenAI API Key (30 seconds)

1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

## Step 2: Configure the Project (30 seconds)

Open the `.env` file in this directory and replace the placeholder:

```
OPENAI_API_KEY=sk-your-actual-key-here
```

Paste your actual API key there.

## Step 3: Start the Server (30 seconds)

**Windows:**
```cmd
start_server.bat
```

**Mac/Linux:**
```bash
chmod +x start_server.sh
./start_server.sh
```

Wait for the message: `Uvicorn running on http://0.0.0.0:8000`

## Step 4: Open in Browser (30 seconds)

Open your browser to: **http://localhost:8000**

Click "Chat with My AI Assistant" and try asking:
- "What is your current role at Arctic Wolf?"
- "Tell me about your leadership experience"
- "What are your AI career goals?"

---

## That's It!

You should now have:
- ✅ Portfolio page at http://localhost:8000
- ✅ AI chat at http://localhost:8000/chat.html
- ✅ Working chatbot that answers questions about James Bell

---

## Troubleshooting

**If something doesn't work:**

1. Run the diagnostic:
   ```bash
   python check_setup.py
   ```

2. Check the terminal for error messages

3. See `TROUBLESHOOTING.md` for detailed solutions

---

## Next Steps

- **Customize:** Edit `james_qa.json` to add more Q&A pairs
- **Deploy:** See `SETUP_GUIDE.md` for deployment instructions
- **Configure:** Edit `config.yaml` to change AI behavior

---

## Important Files

- `.env` - Your API key (NEVER commit this!)
- `config.yaml` - AI model settings
- `james_qa.json` - Knowledge base
- `app_minimal.py` - Backend server
- `index.html` - Portfolio page
- `chat.html` - Chat interface

---

## Support

- Full setup guide: `SETUP_GUIDE.md`
- Troubleshooting: `TROUBLESHOOTING.md`
- Project info: `README.md`
