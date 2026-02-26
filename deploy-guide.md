# Deployment Guide for James Bell Portfolio

## 🚀 Quick Deploy to Railway (Recommended)

### Step 1: Prepare Files
1. Create a GitHub repository
2. Upload all your files to the repo:
   - `portfolio.html`
   - `index.html` 
   - `james-headshot.jpg`
   - `app.py`
   - `config.yaml`
   - `james_qa.json`
   - `requirements.txt`
   - `railway.json`
   - `Procfile`

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your portfolio repository
5. Railway will automatically detect Python and deploy

### Step 3: Configure Environment Variables
1. In Railway dashboard, go to your project
2. Click "Variables" tab
3. Add: `OPENAI_API_KEY` = `your-actual-openai-api-key-here`
4. Railway will redeploy automatically

**SECURITY NOTE:** Never commit API keys to GitHub! Use environment variables only.

### Step 4: Get Your URL
1. Railway provides a URL like: `https://your-app-name.railway.app`
2. Your portfolio will be at: `https://your-app-name.railway.app/portfolio.html`
3. Set this as your main page in Railway settings

### Step 5: Custom Domain (Optional)
1. Buy a domain (like `jamesbell.dev`)
2. In Railway, go to Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

## 🌐 Alternative: Vercel + Render

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Deploy `portfolio.html` as main page
4. Get URL like: `https://james-bell.vercel.app`

### Backend (Render)
1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repo
4. Set start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `OPENAI_API_KEY`
6. Update `API_URL` in `index.html` to Render backend URL

## 📱 Final Steps

1. **Test everything** works on the live site
2. **Update LinkedIn** with your new portfolio URL
3. **Add to email signature**
4. **Share with network**

## 🔧 Troubleshooting

- **Chat not working?** Check API_URL points to correct backend
- **Images not loading?** Ensure `james-headshot.jpg` is uploaded
- **Backend errors?** Check environment variables are set
- **CORS issues?** Verify CORS settings in `app.py`

Your portfolio will be live and professional! 🎉