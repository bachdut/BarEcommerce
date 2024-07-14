from flask import Flask, request, jsonify
from kafka import KafkaProducer, KafkaConsumer
import json

app = Flask(__name__)

# Kafka Producer
producer = KafkaProducer(bootstrap_servers='kafka:9092',
                         value_serializer=lambda v: json.dumps(v).encode('utf-8'))

# Kafka Consumer
consumer = KafkaConsumer('order_updates',
                         bootstrap_servers='kafka:9092',
                         auto_offset_reset='earliest',
                         enable_auto_commit=True,
                         group_id='order-group',
                         value_deserializer=lambda x: json.loads(x.decode('utf-8')))

orders = {}

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(orders), 200

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    order_id = data.get('order_id')
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    orders[order_id] = {
        'product_id': product_id,
        'quantity': quantity
    }

    # Produce Kafka message
    producer.send('order_updates', data)
    producer.flush()

    return jsonify({'message': 'Order created'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
