# Vercel serverless function for FastAPI
import os
import sys

# Ensure we can import from parent directory
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from mangum import Mangum
    from app_minimal import app
    
    # Create handler with proper configuration for Vercel
    handler = Mangum(app, lifespan="off", api_gateway_base_path="/")
    
except Exception as e:
    # Fallback error handler
    def handler(event, context):
        return {
            "statusCode": 500,
            "body": f"Error loading application: {str(e)}"
        }
