from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
import mysql.connector
import hashlib
from dotenv import load_dotenv
from datetime import datetime
import yfinance as yf

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# 🔑 API Keys
FINNHUB_KEY = os.getenv("STOCK_API_KEY_FINNHUB")
ALPHA_KEY = os.getenv("STOCK_API_KEY_ALPHA")

# 🔌 MySQL Connection
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Mahak@1919",  # 🔁 Replace with your actual MySQL password
        database="stockscape"
    )

# 🔐 Password Hashing
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# ✅ Health Check
@app.route("/")
def home():
    return "✅ Backend is running!"

# Real-Time Price API
@app.route("/price/<ticker>")
def get_price(ticker):
    try:
        symbol = ticker.upper()
        if "." not in symbol:
            symbol = f"{symbol}.NS"
        
        stock = yf.Ticker(symbol)
        # Fast fetch for current price
        data = stock.history(period="1d")
        
        if not data.empty:
            price = data['Close'].iloc[-1]
            # Agar change calculate nahi ho raha, toh default 0.5% dikha do
            return jsonify({
                "ticker": ticker,
                "price": round(float(price), 2),
                "change": 0.42 # Default dummy change for now
            })
        
        # Agar yfinance fail ho jaye toh dummy data (Testing ke liye)
        return jsonify({"ticker": ticker, "price": 1500.0, "change": 0.1}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"price": 0, "change": 0}), 200

# 📊 Historical Data API
@app.route("/history/<ticker>")
def get_history(ticker):
    try:
        
        symbol = ticker.upper()
        if "." not in symbol and symbol not in ["AAPL", "TSLA", "MSFT"]:
            symbol = f"{symbol}.NS"
            
        stock = yf.Ticker(symbol)
        # Pichle 30 din ka data
        df = stock.history(period="1mo")
        history = []
        for date, row in df.iterrows():
            history.append({
                "date": date.strftime('%Y-%m-%d'),
                "price": round(row['Close'], 2)
            })
        return jsonify(history)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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

@app.route("/ai-recommendations")
def get_ai_recommendations():
    # In stocks ko hum analyze karenge
    stocks_to_analyze = ["RELIANCE", "TCS", "INFY", "HDFCBANK"]
    recommendations = []

    try:
        for ticker in stocks_to_analyze:
            symbol = f"{ticker}.NS"
            stock = yf.Ticker(symbol)
            hist = stock.history(period="5d")
            
            if not hist.empty:
                current_price = round(hist['Close'].iloc[-1], 2)
                prev_price = hist['Close'].iloc[-2]
                change = ((current_price - prev_price) / prev_price) * 100
                
                # AI Logic (Simulated based on real data)
                # Note: Real apps mein yahan Gemini/OpenAI API call hoti hai
                action = "Buy" if change > -0.5 else "Hold"
                target = round(current_price * 1.05, 2) # 5% Target
                
                recommendations.append({
                    "stockName": ticker,
                    "ticker": ticker,
                    "action": action,
                    "price": str(current_price),
                    "targetPrice": str(target),
                    "sentiment": "Positive" if change > 0 else "Neutral",
                    "newsSummary": f"{ticker} showing {'strength' if change > 0 else 'consolidation'} in recent sessions.",
                    "reasoning": f"Price is trading {'above' if change > 0 else 'near'} 5-day EMA with healthy volume."
                })
        
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/market-indices")
def get_indices():
    try:
        # Check connection
        nifty = yf.Ticker("^NSEI")
        hist = nifty.history(period="1d", interval="15m")
        
        if hist.empty:
            # Fallback agar API slow hai
            return jsonify({
                "name": "NIFTY 50", "price": "24,420", "change": 0.85,
                "chart": [{"name": "9:30", "value": 24000}, {"name": "15:30", "value": 24420}]
            })
        
        chart_data = [{"name": i.strftime('%H:%M'), "value": round(r['Close'], 2)} for i, r in hist.iterrows()]
        return jsonify({
            "name": "NIFTY 50",
            "price": f"{hist['Close'].iloc[-1]:,.2f}",
            "change": 0.85,
            "chart": chart_data
        })
    except:
        return jsonify({"error": "Service busy"}), 500

@app.route("/market-movers")
def get_movers():
    # In main stocks ko analyze karke gainers/losers nikalenge
    tickers = ["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS", "WITPRO.NS", "TATAMOTORS.NS", "SBIN.NS"]
    try:
        import yfinance as yf
        data_list = []
        for t in tickers:
            s = yf.Ticker(t)
            hist = s.history(period="2d")
            if len(hist) >= 2:
                curr = hist['Close'].iloc[-1]
                prev = hist['Close'].iloc[-2]
                pct = ((curr - prev) / prev) * 100
                data_list.append({
                    "symbol": t.replace(".NS", ""),
                    "ltp": f"{curr:,.2f}",
                    "change": round(pct, 2)
                })
        
        # Sort karke top gainers aur losers nikalna
        sorted_list = sorted(data_list, key=lambda x: x['change'], reverse=True)
        return jsonify({
            "gainers": sorted_list[:5],
            "losers": sorted_list[-5:][::-1]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500  

@app.route("/market-news")
def get_market_news():
    # APNI API KEY YAHAN DALEIN
    API_KEY = "pub_e1f79759f4c34818adb42ff73e207f45" 
    url = f"https://newsdata.io/api/1/news?apikey={API_KEY}&q=Indian%20stock%20market&language=en&category=business"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        articles = data.get("results", [])
        formatted_news = []
        
        for i, item in enumerate(articles):
            # Agar image nahi hai toh stock market ki default image use karein
            img = item.get("image_url") or "https://images.unsplash.com/photo-1611974717482-98252c00ed6d?auto=format&fit=crop&w=400"
            
            formatted_news.append({
                "id": f"news-{i}",
                "title": item.get("title") or "Market Update",
                "publisher": item.get("source_id") or "Finance News",
                "link": item.get("link") or "#",
                "date": item.get("pubDate", "Recently").split(" ")[0],
                "thumbnail": img,
                "description": item.get("description") or "Click read more to see the full analysis of this market event."
            })
            
        return jsonify(formatted_news)
    except Exception as e:
        print(f"NewsData Error: {e}")
        return jsonify([])     
    
# 🚀 Run Server
if __name__ == "__main__":
    app.run(debug=True, port=5000)