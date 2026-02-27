# Simple test endpoint to verify Vercel is working
from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        response = {
            "status": "ok",
            "message": "Vercel serverless function is working",
            "test": "success"
        }
        
        self.wfile.write(json.dumps(response).encode())
        return
