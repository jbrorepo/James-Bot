# Railway Deployment Guide

Your code has been pushed to GitHub and is ready for Railway deployment!

## Quick Deploy to Railway (5 minutes)

### Step 1: Connect to Railway

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository: `jbrorepo/James-Bot`
5. Railway will automatically detect the configuration from `railway.json`

### Step 2: Add Environment Variable

**CRITICAL:** You must add your OpenAI API key as an environment variable.

1. In your Railway project, click on your service
2. Go to the "Variables" tab
3. Click "New Variable"
4. Add:
   - **Variable Name:** `OPENAI_API_KEY`
   - **Value:** `sk-your-actual-api-key-here`
5. Click "Add"

### Step 3: Deploy

Railway will automatically:
- ✅ Detect Python project
- ✅ Install dependencies from `requirements.txt`
- ✅ Use the start command from `railway.json`
- ✅ Set up health checks at `/health`
- ✅ Assign a public URL

Wait for deployment to complete (usually 2-3 minutes).

### Step 4: Test Your Deployment

1. Railway will provide a URL like: `https://your-app.railway.app`
2. Click the URL to open your portfolio
3. Test the chat interface
4. Verify the health endpoint: `https://your-app.railway.app/health`

---

## Configuration Details

### railway.json (Already Configured)

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn app_minimal:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/health"
  }
}
```

This tells Railway:
- Use NIXPACKS builder (auto-detects Python)
- Start command for the FastAPI server
- Health check endpoint for monitoring

### Environment Variables Needed

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | ✅ Yes | Your OpenAI API key (starts with `sk-`) |
| `PORT` | ❌ No | Railway sets this automatically |

---

## Troubleshooting Railway Deployment

### Issue: Build Fails

**Check the build logs:**
1. Click on your service in Railway
2. Go to "Deployments" tab
3. Click on the failed deployment
4. Review the logs

**Common causes:**
- Missing dependencies in `requirements.txt`
- Python version incompatibility
- Syntax errors in code

**Solution:**
- Ensure `requirements.txt` is complete
- Railway uses Python 3.11+ by default (compatible)

### Issue: Deployment Succeeds but App Doesn't Work

**Check runtime logs:**
1. Go to your service in Railway
2. Click "View Logs"
3. Look for error messages

**Common causes:**
- Missing `OPENAI_API_KEY` environment variable
- Invalid API key
- Model not available

**Solution:**
1. Verify environment variable is set correctly
2. Test API key locally first
3. Check OpenAI API status

### Issue: Health Check Failing

**Symptoms:**
- Railway shows service as unhealthy
- Automatic restarts

**Solution:**
1. Test health endpoint: `https://your-app.railway.app/health`
2. Should return JSON with `"status": "ok"`
3. Check logs for startup errors

### Issue: Chat Not Working

**Symptoms:**
- Portfolio loads but chat doesn't respond
- "Failed to connect" errors

**Solution:**
1. Check browser console for errors (F12)
2. Verify `/chat` endpoint works: `https://your-app.railway.app/chat`
3. Check Railway logs for API errors
4. Verify OpenAI API key is valid

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Portfolio page loads: `https://your-app.railway.app`
- [ ] Health check works: `https://your-app.railway.app/health`
- [ ] Chat interface loads: `https://your-app.railway.app/chat.html`
- [ ] Chat sends and receives messages
- [ ] Bot responds with relevant information
- [ ] Resume download works
- [ ] All external links work (LinkedIn, Calendly, etc.)
- [ ] Mobile responsive design works
- [ ] No console errors in browser

---

## Monitoring Your Deployment

### Railway Dashboard

Monitor your app in Railway:
- **Metrics:** CPU, Memory, Network usage
- **Logs:** Real-time application logs
- **Deployments:** History of all deployments
- **Analytics:** Request counts and response times

### OpenAI Usage

Monitor API usage:
1. Go to [platform.openai.com/usage](https://platform.openai.com/usage)
2. Check daily usage and costs
3. Set up billing alerts if needed

### Health Checks

Railway automatically monitors `/health` endpoint:
- Green = Healthy
- Red = Unhealthy (will auto-restart)

---

## Updating Your Deployment

When you make changes:

1. **Commit changes locally:**
   ```bash
   git add .
   git commit -m "Your change description"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Railway auto-deploys:**
   - Railway detects the push
   - Automatically rebuilds and redeploys
   - Usually takes 2-3 minutes

---

## Custom Domain (Optional)

To use your own domain:

1. In Railway, go to your service
2. Click "Settings"
3. Scroll to "Domains"
4. Click "Add Domain"
5. Enter your domain (e.g., `jamesbell.dev`)
6. Follow DNS configuration instructions
7. Railway provides SSL certificate automatically

---

## Cost Estimation

### Railway Costs
- **Hobby Plan:** $5/month (includes $5 credit)
- **Pro Plan:** $20/month (includes $20 credit)
- Additional usage: ~$0.000463 per GB-hour

**Estimated monthly cost for this app:**
- Small traffic: ~$5-10/month
- Medium traffic: ~$10-20/month

### OpenAI Costs
- **gpt-4o-mini:** $0.150 per 1M input tokens, $0.600 per 1M output tokens
- **Estimated:** ~$0.01-0.05 per conversation
- **100 conversations/day:** ~$1-5/month

**Total estimated cost:** $6-25/month depending on traffic

---

## Security Best Practices

### Environment Variables
- ✅ Never commit `.env` file to git
- ✅ Use Railway's environment variables
- ✅ Rotate API keys periodically

### CORS Configuration
For production, update `app_minimal.py`:

```python
# Change from:
allow_origins=["*"]

# To:
allow_origins=[
    "https://your-domain.com",
    "https://your-app.railway.app"
]
```

### Rate Limiting
Consider adding rate limiting for production:
```bash
pip install slowapi
```

Then add to `app_minimal.py`:
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/chat")
@limiter.limit("10/minute")
async def chat_endpoint(...):
    ...
```

---

## Support

### Railway Support
- Documentation: https://docs.railway.app
- Discord: https://discord.gg/railway
- Status: https://status.railway.app

### Project Issues
- Check `TROUBLESHOOTING.md` for common issues
- Review Railway logs for errors
- Test locally first with `start_server.bat`

---

## Success! 🎉

Your James Bell AI Assistant is now live on Railway!

**Next steps:**
1. Share your Railway URL with recruiters
2. Add custom domain (optional)
3. Monitor usage and costs
4. Update content as needed

**Your deployment URL:**
`https://your-app.railway.app` (Railway will provide this)

---

## Quick Reference

**Deploy:** Push to GitHub → Railway auto-deploys
**Logs:** Railway Dashboard → Your Service → View Logs
**Environment:** Railway Dashboard → Your Service → Variables
**Health:** `https://your-app.railway.app/health`
**Update:** `git push origin main`

Good luck with your deployment! 🚀
