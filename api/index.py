# Vercel serverless function wrapper
from app_minimal import app

# Export the FastAPI app for Vercel
handler = app
