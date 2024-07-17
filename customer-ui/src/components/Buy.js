// Importing React and useState hook for component state management, and axios for HTTP requests
import React, { useState } from 'react';
import axios from 'axios';

// Define the Buy component
const Buy = () => {
  // State hooks for managing form inputs and server response message
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [price, setPrice] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle the buy action
  const handleBuy = async () => {
    try {
      // Making a POST request to the server's buy endpoint with form data
      const response = await axios.post('http://localhost:8080/buy', {
        username,
        userid,
        price,
        timestamp,
      });
      // Update the message state with the response from the server
      setMessage(response.data.message);
    } catch (error) {
      // Log the error to the console and update the message state with an error message
      console.error('Error making purchase:', error);
      setMessage('Error making purchase');
    }
  };

  // Render the Buy component UI
  return (
    <div>
      <h2>Buy Product</h2>
      {/* Input fields for the purchase form */}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="User ID" value={userid} onChange={(e) => setUserid(e.target.value)} />
      <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="text" placeholder="Timestamp" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
      {/* Button to submit the form and make a purchase */}
      <button onClick={handleBuy}>Buy</button>
      {/* Display the message from the server if it exists */}
      {message && <p>{message}</p>}
    </div>
  );
};

// Export the Buy component for use in other parts of the application
export default Buy;