from flask import Flask, request, jsonify
from kafka import KafkaProducer
import json
import requests

app = Flask(__name__)

# Kafka Producer
producer = KafkaProducer(bootstrap_servers='kafka:9092',
                         value_serializer=lambda v: json.dumps(v).encode('utf-8'))

@app.route('/')
def index():
    return "Welcome to the Customer Facing Web Server"

@app.route('/buy', methods=['POST'])
def buy():
    data = request.json
    producer.send('purchases', data)
    producer.flush()
    return jsonify({'message': 'Purchase request sent'}), 200

@app.route('/getAllUserBuys', methods=['GET'])
def get_all_user_buys():
    response = requests.get('http://customer-management-api:3000/purchases')
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)