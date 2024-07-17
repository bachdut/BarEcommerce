// Importing necessary libraries and hooks from React and axios for making HTTP requests
import React, { useState } from 'react';
import axios from 'axios';

// Main App component
function App() {
  // State hooks for managing form inputs and purchases list
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [price, setPrice] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [purchases, setPurchases] = useState([]);

  // Function to handle the purchase action
  const handleBuy = async () => {
    try {
      // Making a POST request to the buy endpoint with form data
      const response = await axios.post('http://localhost:8080/buy', {
        username,
        userid: userId,
        price,
        timestamp
      });
      // Alerting the user with the response message
      alert(response.data.message);
    } catch (error) {
      // Logging and alerting in case of an error
      console.error('Error making purchase:', error);
      alert('Error making purchase');
    }
  };

  // Function to fetch all purchases made by users
  const handleGetAllUserBuys = async () => {
    try {
      // Making a GET request to fetch all user purchases
      const response = await axios.get('http://localhost:8080/getAllUserBuys');
      // Updating the purchases state with the fetched data
      setPurchases(response.data);
    } catch (error) {
      // Logging and alerting in case of an error
      console.error('Error fetching purchases:', error);
      alert('Error fetching purchases');
    }
  };

  // Rendering the UI components
  return (
    <div>
      <h1>Customer Service Application</h1>
      <div>
        <h2>Buy Product</h2>
        {/* Input fields for purchase details */}
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
        {/* Button to trigger the purchase action */}
        <button onClick={handleBuy}>Buy</button>
      </div>
      <div>
        <h2>All User Purchases</h2>
        {/* Button to fetch and display all user purchases */}
        <button onClick={handleGetAllUserBuys}>Get All User Buys</button>
        <ul>
          {/* Mapping through purchases state to display each purchase */}
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

// Exporting the App component for use in other parts of the application
export default App;