// Importing React and useState hook for component state management, and axios for HTTP requests
import React, { useState } from 'react';
import axios from 'axios';

// Define the GetAllUserBuys component
const GetAllUserBuys = () => {
  // State hook for managing the list of purchases
  const [purchases, setPurchases] = useState([]);

  // Function to fetch all user purchases from the server
  const handleGetAllUserBuys = async () => {
    try {
      // Making a GET request to the server's getAllUserBuys endpoint
      const response = await axios.get('http://localhost:8080/getAllUserBuys');
      // Update the purchases state with the data received from the server
      setPurchases(response.data);
    } catch (error) {
      // Log the error to the console if the request fails
      console.error('Error fetching purchases:', error);
    }
  };

  // Render the GetAllUserBuys component UI
  return (
    <div>
      <h2>All User Purchases</h2>
      {/* Button to fetch all user purchases */}
      <button onClick={handleGetAllUserBuys}>Get All User Buys</button>
      <ul>
        {/* Map over the purchases state to display each purchase */}
        {purchases.map((purchase, index) => (
          <li key={index}>
            {/* Display purchase details */}
            {purchase.username} - {purchase.userid} - {purchase.price} - {purchase.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the GetAllUserBuys component for use in other parts of the application
export default GetAllUserBuys;