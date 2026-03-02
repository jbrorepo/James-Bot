#!/usr/bin/env python3
"""
Quick diagnostic script to check if the James Bell AI Assistant is properly configured.
Run this before starting the server to catch common issues.
"""

import os
import sys
import json

def check_python_version():
    """Check if Python version is 3.11+"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 11):
        print("❌ Python version is too old. Need 3.11+, found {}.{}.{}".format(
            version.major, version.minor, version.micro))
        return False
    print("✅ Python version {}.{}.{} is compatible".format(
        version.major, version.minor, version.micro))
    return True

def check_dependencies():
    """Check if required packages are installed"""
    required = ['fastapi', 'uvicorn', 'openai', 'yaml', 'pydantic']
    missing = []
    
    for package in required:
        try:
            if package == 'yaml':
                __import__('yaml')
            else:
                __import__(package)
        except ImportError:
            missing.append(package)
    
    if missing:
        print("❌ Missing packages: {}".format(', '.join(missing)))
        print("   Run: pip install -r requirements.txt")
        return False
    print("✅ All required packages are installed")
    return True

def check_env_file():
    """Check if .env file exists and has API key"""
    if not os.path.exists('.env'):
        print("❌ .env file not found")
        print("   Run: cp .env.example .env")
        print("   Then edit .env and add your OpenAI API key")
        return False
    
    with open('.env', 'r') as f:
        content = f.read()
        if 'your-openai-api-key-here' in content or 'OPENAI_API_KEY=' not in content:
            print("⚠️  .env file exists but API key not configured")
            print("   Edit .env and add your actual OpenAI API key")
            return False
    
    print("✅ .env file exists with API key configured")
    return True

def check_config_file():
    """Check if config.yaml exists and is valid"""
    if not os.path.exists('config.yaml'):
        print("❌ config.yaml not found")
        return False
    
    try:
        import yaml
        with open('config.yaml', 'r') as f:
            config = yaml.safe_load(f)
            model = config.get('llm', {}).get('config', {}).get('model', 'unknown')
            print("✅ config.yaml is valid (model: {})".format(model))
            return True
    except Exception as e:
        print("❌ config.yaml is invalid: {}".format(e))
        return False

def check_qa_file():
    """Check if james_qa.json exists and is valid"""
    if not os.path.exists('james_qa.json'):
        print("❌ james_qa.json not found")
        return False
    
    try:
        with open('james_qa.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, dict) and 'questions_and_answers' in data:
                qa_count = len(data['questions_and_answers'])
            elif isinstance(data, list):
                qa_count = len(data)
            else:
                print("❌ james_qa.json has invalid format")
                return False
            
            print("✅ james_qa.json is valid ({} Q&A pairs)".format(qa_count))
            return True
    except Exception as e:
        print("❌ james_qa.json is invalid: {}".format(e))
        return False

def check_html_files():
    """Check if required HTML files exist"""
    required_files = ['index.html', 'chat.html']
    missing = []
    
    for file in required_files:
        if not os.path.exists(file):
            missing.append(file)
    
    if missing:
        print("❌ Missing HTML files: {}".format(', '.join(missing)))
        return False
    print("✅ All required HTML files exist")
    return True

def main():
    print("=" * 60)
    print("James Bell AI Assistant - Setup Diagnostic")
    print("=" * 60)
    print()
    
    checks = [
        ("Python Version", check_python_version),
        ("Dependencies", check_dependencies),
        ("Environment File", check_env_file),
        ("Config File", check_config_file),
        ("Q&A Database", check_qa_file),
        ("HTML Files", check_html_files),
    ]
    
    results = []
    for name, check_func in checks:
        print("\nChecking {}...".format(name))
        results.append(check_func())
    
    print("\n" + "=" * 60)
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print("✅ All checks passed! You're ready to start the server.")
        print("\nRun: uvicorn app_minimal:app --reload --host 0.0.0.0 --port 8000")
        print("Or use: start_server.bat (Windows) / ./start_server.sh (Mac/Linux)")
    else:
        print("⚠️  {}/{} checks passed. Please fix the issues above.".format(passed, total))
        sys.exit(1)
    
    print("=" * 60)

if __name__ == '__main__':
    main()
