from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

DB_CONFIG = {
    "host": os.environ.get("POSTGRES_HOST", "poster-db"),
    "dbname": os.environ.get("POSTGRES_DB", "poster"),
    "user": os.environ.get("POSTGRES_USER", "poster_user"),
    "password": os.environ.get("POSTGRES_PASSWORD", "poster_pass")
}

def get_connection():
    return psycopg2.connect(**DB_CONFIG)

@app.route("/posts", methods=["POST"])
def add_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("pass")

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO posts (username, pass) VALUES (%s, %s)", (username, password))
            conn.commit()
    return jsonify({"status": "success"}), 201

@app.route("/posts", methods=["GET"])
def get_user():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT username, pass FROM posts ORDER BY id ASC")
            results = cur.fetchall()
    return jsonify([
        {"username": r[0], "pass": r[1]} for r in results
    ])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
