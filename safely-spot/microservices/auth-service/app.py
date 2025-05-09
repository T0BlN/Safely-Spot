from flask import Flask, request, jsonify
import psycopg2
import requests 
from requests.exceptions import RequestException
import os
import time
import logging

PORT = 4001
REGISTRY_URL = "http://registry:3000"

logger = logging.getLogger("auth-service")
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)

DB_CONFIG = {
    "host": os.environ.get("POSTGRES_HOST", "auth-db"),
    "dbname": os.environ.get("POSTGRES_DB", "auth"),
    "user": os.environ.get("POSTGRES_USER", "postgres"),
    "password": os.environ.get("POSTGRES_PASSWORD", "postgres")
}

def get_connection():
    return psycopg2.connect(**DB_CONFIG)

def register_with_retry(name: str, url: str, max_retries: int = 5) -> None:
    registry_url = "http://registry:3000/register"
    
    for attempt in range(max_retries):
        try:
            response = requests.post(
                registry_url,
                json={"name": name, "url": url},
                timeout=2
            )
            response.raise_for_status()  # Raises exception for 4XX/5XX responses
            logging.info("Successfully registered with registry")
            return
            
        except Exception as e:
            wait_time = (attempt + 1) * 1  # Exponential backoff (1s, 2s, 3s...)
            logging.warning(
                f"Registration attempt {attempt + 1}/{max_retries} failed: {str(e)}. "
                f"Retrying in {wait_time}s..."
            )
            time.sleep(wait_time)
    
    logging.error("Could not register after %d retries, exiting", max_retries)
    sys.exit(1)

register_with_retry("auth-service", "http://auth-service:4001")

@app.route("/auth/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Missing username or password"}), 400

        with get_connection() as conn:
            with conn.cursor() as cur:

                cur.execute(
                    "INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id",
                    (username, password)
                )
                user_id = cur.fetchone()[0]
                conn.commit()
        return jsonify({
            "status": "success",
            "user_id": user_id
        }), 201

    except psycopg2.IntegrityError:
        return jsonify({"error": "Username already exists"}), 409
    except Exception as e:
        return jsonify({"error": "Registration failed", "details": str(e)}), 500

@app.route("/auth/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Missing username or password"}), 400

        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, username FROM users WHERE username = %s AND password = %s LIMIT 1",
                    (username, password)
                )
                user = cur.fetchone()

        if not user:
            return jsonify({"error": "Invalid credentials"}), 401

        return jsonify({
            "user_id": user[0],
            "username": user[1],
            "message": "Login successful"
        })

    except Exception as e:
        return jsonify({"error": "Login failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4001)
