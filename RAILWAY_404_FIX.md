# Railway 404 Error - Fixed!

## What Was Wrong

The app was using relative file paths (`"index.html"`) which don't work correctly on Railway because the working directory can be different from where the files are located.

## What Was Fixed

Updated `app_minimal.py` to use absolute paths:
- Added `BASE_DIR = os.path.dirname(os.path.abspath(__file__))`
- Updated all file serving routes to use `os.path.join(BASE_DIR, filename)`
- This ensures files are found regardless of working directory

## Changes Pushed to GitHub

The fix has been committed and pushed to your repository. Railway will automatically detect the changes and redeploy.

---

## What to Do Now

### 1. Wait for Railway to Redeploy (2-3 minutes)

Railway automatically detects GitHub pushes and redeploys. You can monitor this in:
1. Go to your Railway dashboard
2. Click on your service
3. Go to "Deployments" tab
4. You should see a new deployment starting

### 2. Check the Deployment Status

Watch for:
- ✅ Build succeeds
- ✅ Deploy succeeds
- ✅ Health check passes

### 3. Test Your Site

Once deployed, test these URLs:

**Health Check (should work first):**
```
https://your-app.railway.app/health
```

Expected response:
```json
{
  "status": "ok",
  "version": "full_ai_v2",
  "qa_pairs_loaded": 46,
  "openai_ready": true,
  "model": "gpt-4o-mini"
}
```

**Main Page:**
```
https://your-app.railway.app/
```
Should show your portfolio page.

**Chat Page:**
```
https://your-app.railway.app/chat.html
```
Should show the chat interface.

---

## If Still Getting 404

### Check Railway Logs

1. Go to Railway dashboard
2. Click your service
3. Click "View Logs"
4. Look for errors

### Common Issues

**Issue: "index.html not found"**

Check the logs for the `base_dir` value. If you see this in the error response, it means the files aren't being found.

**Solution:** The files should be in the repository root. Verify:
```bash
# Locally, check files exist:
ls -la index.html chat.html
```

**Issue: Environment variable not set**

If health check shows `"openai_ready": false`:

**Solution:**
1. Go to Railway → Your Service → Variables
2. Add `OPENAI_API_KEY` with your actual key
3. Redeploy

**Issue: Build fails**

Check build logs in Railway for errors.

**Common causes:**
- Missing dependencies
- Python version issues
- Syntax errors

---

## Verify Files Are in Repository

Make sure these files are in your GitHub repository root:

```bash
# Check locally:
git ls-files | grep -E '\.(html|pdf|jpg)$'
```

Should show:
- index.html
- chat.html
- portfolio.html
- james-headshot.jpg
- James Bell Resume 2025.pdf

If any are missing, add them:
```bash
git add index.html chat.html james-headshot.jpg "James Bell Resume 2025.pdf"
git commit -m "Add missing static files"
git push origin main
```

---

## Debug Mode

If you're still having issues, you can check what Railway sees:

### Check Health Endpoint

Visit: `https://your-app.railway.app/health`

This will tell you:
- Is the server running? ✅
- Are Q&A pairs loaded? ✅
- Is OpenAI configured? ✅

### Check Root Endpoint

If you get a JSON response instead of HTML, it means the file wasn't found. The response will include `base_dir` showing where the app is looking for files.

### Check Railway Environment

In Railway logs, look for startup messages that show:
```
OpenAI client initialized with model: gpt-4o-mini
```

---

## Expected Timeline

1. **Push to GitHub:** ✅ Done
2. **Railway detects push:** ~30 seconds
3. **Railway builds:** ~1-2 minutes
4. **Railway deploys:** ~30 seconds
5. **Health check passes:** ~10 seconds
6. **Site is live:** ✅ Ready!

**Total time:** ~3-4 minutes from push

---

## Success Checklist

After redeployment, verify:

- [ ] Health endpoint returns JSON with `"status": "ok"`
- [ ] Root URL shows portfolio page (not JSON error)
- [ ] Chat page loads at `/chat.html`
- [ ] Chat interface sends messages
- [ ] Bot responds to questions
- [ ] Resume download works
- [ ] Headshot image loads
- [ ] No 404 errors in browser console

---

## Still Having Issues?

### 1. Check Railway Logs

Look for these specific errors:
- `FileNotFoundError` - Files not in repository
- `ModuleNotFoundError` - Missing dependencies
- `OpenAI API error` - API key issue

### 2. Test Locally First

Before debugging Railway, test locally:
```bash
python check_setup.py
start_server.bat  # or ./start_server.sh
```

Visit http://localhost:8000 - if it works locally but not on Railway, it's a deployment issue.

### 3. Verify Railway Configuration

Check `railway.json`:
```json
{
  "deploy": {
    "startCommand": "uvicorn app_minimal:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/health"
  }
}
```

### 4. Check Environment Variables

In Railway dashboard:
- `OPENAI_API_KEY` should be set
- `PORT` is automatically set by Railway (don't add it manually)

---

## Contact Support

If none of this works:

**Railway Support:**
- Discord: https://discord.gg/railway
- Docs: https://docs.railway.app

**Provide them with:**
1. Your Railway project URL
2. Recent deployment logs
3. Error messages from browser console
4. Health check response

---

## Summary

✅ **Fix applied:** Absolute file paths now used
✅ **Pushed to GitHub:** Railway will auto-deploy
⏳ **Wait:** 3-4 minutes for redeployment
✅ **Test:** Visit your Railway URL

The 404 error should be resolved after Railway redeploys!
