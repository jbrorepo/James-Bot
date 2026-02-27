import sys
import os

# Add parent directory to Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import after path is set
from mangum import Mangum
from app_minimal import app

# Create Mangum handler
_handler = Mangum(app, lifespan="off")

# Vercel serverless function entry point
def handler(event, context):
    return _handler(event, context)
