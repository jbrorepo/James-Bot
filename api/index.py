from mangum import Mangum
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the FastAPI app
from app_minimal import app

# Mangum adapter for ASGI to AWS Lambda/Vercel
handler = Mangum(app, lifespan="off")
