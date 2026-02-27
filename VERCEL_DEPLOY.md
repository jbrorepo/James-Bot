# Vercel Deployment Guide for James Bell AI Portfolio

## 🚀 Quick Setup (5 minutes)

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project
1. Click "Add New..." → "Project"
2. Find and select your repository: `jbrorepo/James-Bot`
3. Click "Import"

### Step 3: Configure Project
Vercel will auto-detect the settings. Verify:
- **Framework Preset**: Other
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `pip install -r requirements.txt`

### Step 4: Add Environment Variable
1. Click "Environment Variables"
2. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with sk-)
   - **Environment**: Production, Preview, Development (select all)
3. Click "Add"

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `james-bot-xyz.vercel.app`

### Step 6: Add Custom Domain
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add `jameslbell.com`
4. Vercel will provide DNS records
5. Update your DNS settings at Cloudflare:
   - **Type**: CNAME
   - **Name**: @ (or jameslbell.com)
   - **Target**: cname.vercel-dns.com
   - **Type**: CNAME
   - **Name**: www
   - **Target**: cname.vercel-dns.com

### Step 7: Verify Deployment
Visit your site:
- https://jameslbell.com/health
- https://jameslbell.com/chat.html
- https://jameslbell.com

## 🔄 Auto-Deployment

Every time you push to GitHub, Vercel will automatically:
1. Detect the changes
2. Build and deploy
3. Update your live site

## 📊 Features on Vercel

✅ **Free tier includes:**
- Unlimited bandwidth
- Automatic HTTPS
- Global CDN
- Auto-scaling
- GitHub integration
- Custom domains

✅ **What works:**
- All chat functionality
- Conversation logging
- Analytics endpoints
- Resume downloads
- Mobile optimizations

## ⚠️ Important Notes

1. **Serverless Functions**: Vercel uses serverless functions, so:
   - In-memory data (like `conversations` dict) resets between requests
   - File-based logging (`conversation_logs/`) persists

2. **Cold Starts**: First request after inactivity may take 2-3 seconds

3. **Timeouts**: Serverless functions have 10-second timeout on free tier

## 🆘 Troubleshooting

**Issue**: "Module not found" error
**Fix**: Ensure all dependencies are in `requirements.txt`

**Issue**: API key not working
**Fix**: Re-add the environment variable in Vercel dashboard

**Issue**: 404 errors
**Fix**: Check that `vercel.json` and `api/index.py` are committed

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Visit Vercel documentation: https://vercel.com/docs
3. Check GitHub repo is connected properly

---

**Your project is now ready for Vercel deployment!** 🎉
