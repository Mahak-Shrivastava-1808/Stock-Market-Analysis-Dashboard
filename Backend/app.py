from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
import mysql.connector
import hashlib
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# 🔑 API Keys
FINNHUB_KEY = os.getenv("STOCK_API_KEY_FINNHUB")
ALPHA_KEY = os.getenv("STOCK_API_KEY_ALPHA")

# 🔌 MySQL Connection
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password=os.getenv("DB_PASSWORD"),  # 🔁 Replace with your actual MySQL password
        database="stockscape"
    )

# 🔐 Password Hashing
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# ✅ Health Check
@app.route("/")
def home():
    return "✅ Backend is running!"

# 📈 Real-Time Price API
@app.route("/price/<ticker>")
def get_price(ticker):
    url = f"https://finnhub.io/api/v1/quote?symbol={ticker}&token={FINNHUB_KEY}"
    response = requests.get(url).json()

    if "c" not in response:
        return jsonify({"error": "Price data not available"}), 404

    return jsonify({
        "ticker": ticker,
        "price": round(response["c"], 2)
    })

# 📊 Historical Data API
@app.route("/history/<ticker>")
def get_history(ticker):
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={ticker}&apikey={ALPHA_KEY}&outputsize=compact"
    response = requests.get(url).json()

    if "Time Series (Daily)" not in response:
        return jsonify({"error": "No historical data found"}), 404

    series = response["Time Series (Daily)"]
    history = []

    for date_str in sorted(series.keys(), reverse=True)[:30]:
        price = float(series[date_str]["4. close"])
        history.append({
            "date": date_str,
            "price": round(price, 2)
        })

    return jsonify(history)

# 🧾 Signup Route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data["name"]
    email = data["email"]
    password = hash_password(data["password"])

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    if cursor.fetchone():
        return jsonify({"error": "User already exists"}), 400

    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    conn.commit()
    return jsonify({"message": "Signup successful"}), 200

# 🔓 Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = hash_password(data["password"])

    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    if user:
        return jsonify({"message": "Login successful", "user": user}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# 🚀 Run Server
if __name__ == "__main__":
    app.run(debug=True)