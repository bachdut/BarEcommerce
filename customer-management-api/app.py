from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from kafka import KafkaConsumer
import json
import threading

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://mongodb:27017/shop"
mongo = PyMongo(app)

# Kafka consumer setup
consumer = KafkaConsumer(
    'purchases',
    bootstrap_servers=['kafka:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='purchase-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

def consume_purchases():
    for message in consumer:
        purchase = message.value
        mongo.db.purchases.insert_one(purchase)

threading.Thread(target=consume_purchases, daemon=True).start()

@app.route('/')
def index():
    return "Welcome to the Customer Management API"

@app.route('/purchases', methods=['GET'])
def get_purchases():
    purchases = mongo.db.purchases.find()
    result = []
    for purchase in purchases:
        result.append({
            'username': purchase['username'],
            'userid': purchase['userid'],
            'price': purchase['price'],
            'timestamp': purchase['timestamp']
        })
    return jsonify(result)

@app.route('/purchase', methods=['POST'])
def add_purchase():
    purchase = request.json
    mongo.db.purchases.insert_one(purchase)
    return '', 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)