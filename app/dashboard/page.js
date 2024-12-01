// Add this at the very top of your file
"use client"; // Marks this file as a client-side component

import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function Dashboard() {
  const [data, setData] = useState(null);

  // Fetch the products when the component loads
  useEffect(() => {
    fetch('http://localhost:3000/api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      {data ? (
        data.map((item, i) => (
          <div style={{ padding: '20px' }} key={i}>
            Unique ID: {item._id}
            <br />
            {item.pname} - ${item.price}
            <br />
            <Button variant="outlined"> Add to cart </Button>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default Dashboard;
