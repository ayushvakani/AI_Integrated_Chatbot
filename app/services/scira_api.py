import os
import requests
from dotenv import load_dotenv

load_dotenv()

def call_scira(prompt):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-8b-8192",  # or llama3-70b-8192
        "messages": [{"role": "user", "content": prompt}]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            return f"Groq error {response.status_code}: {response.text}"
    except Exception as e:
        return f"Groq request failed: {str(e)}"
