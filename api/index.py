# Vercel serverless function wrapper for FastAPI
import sys
import os

# Add the parent directory to the path so we can import app_minimal
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app_minimal import app
from mangum import Mangum

# Create the handler for Vercel
handler = Mangum(app, lifespan="off")
