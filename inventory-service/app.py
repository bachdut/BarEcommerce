from flask import Flask, request, jsonify
from kafka import KafkaProducer, KafkaConsumer
import json

app = Flask(__name__)

# Kafka Producer
producer = KafkaProducer(bootstrap_servers='kafka:9092',
                         value_serializer=lambda v: json.dumps(v).encode('utf-8'))

# Kafka Consumer
consumer = KafkaConsumer('inventory_updates',
                         bootstrap_servers='kafka:9092',
                         auto_offset_reset='earliest',
                         enable_auto_commit=True,
                         group_id='inventory-group',
                         value_deserializer=lambda x: json.loads(x.decode('utf-8')))

inventory = {}

@app.route('/inventory', methods=['GET'])
def get_inventory():
    return jsonify(inventory), 200

@app.route('/inventory', methods=['POST'])
def update_inventory():
    data = request.json
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    inventory[product_id] = quantity

    # Produce Kafka message
    producer.send('inventory_updates', data)
    producer.flush()

    return jsonify({'message': 'Inventory updated'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)