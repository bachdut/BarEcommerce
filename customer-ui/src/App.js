import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [price, setPrice] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [purchases, setPurchases] = useState([]);

  const handleBuy = async () => {
    try {
      const response = await axios.post('http://localhost:8080/buy', {
        username,
        userid: userId,
        price,
        timestamp
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error making purchase:', error);
      alert('Error making purchase');
    }
  };

  const handleGetAllUserBuys = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAllUserBuys');
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      alert('Error fetching purchases');
    }
  };

  return (
    <div>
      <h1>Customer Service Application</h1>
      <div>
        <h2>Buy Product</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <button onClick={handleBuy}>Buy</button>
      </div>
      <div>
        <h2>All User Purchases</h2>
        <button onClick={handleGetAllUserBuys}>Get All User Buys</button>
        <ul>
          {purchases.map((purchase, index) => (
            <li key={index}>
              {purchase.username} bought {purchase.price} at {purchase.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;