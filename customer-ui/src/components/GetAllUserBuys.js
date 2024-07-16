import React, { useState } from 'react';
import axios from 'axios';

const GetAllUserBuys = () => {
  const [purchases, setPurchases] = useState([]);

  const handleGetAllUserBuys = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getAllUserBuys');
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  return (
    <div>
      <h2>All User Purchases</h2>
      <button onClick={handleGetAllUserBuys}>Get All User Buys</button>
      <ul>
        {purchases.map((purchase, index) => (
          <li key={index}>
            {purchase.username} - {purchase.userid} - {purchase.price} - {purchase.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUserBuys;