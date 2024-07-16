import React, { useState } from 'react';
import axios from 'axios';

const Buy = () => {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [price, setPrice] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [message, setMessage] = useState('');

  const handleBuy = async () => {
    try {
      const response = await axios.post('http://localhost:8080/buy', {
        username,
        userid,
        price,
        timestamp,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error making purchase:', error);
      setMessage('Error making purchase');
    }
  };

  return (
    <div>
      <h2>Buy Product</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="User ID" value={userid} onChange={(e) => setUserid(e.target.value)} />
      <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="text" placeholder="Timestamp" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
      <button onClick={handleBuy}>Buy</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Buy;