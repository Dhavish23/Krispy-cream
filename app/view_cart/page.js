'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter(); // Initialize useRouter

  // Fetch cart items from the backend or local state
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch('/api/putinCart'); // Mock backend API call
        const data = await res.json();
        setCartItems(data.items || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }

    fetchCart();
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '10px' }}>Product</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Quantity</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Price</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid black', padding: '10px' }}>{item.name}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{item.quantity}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>${item.price.toFixed(2)}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign: 'right', border: '1px solid black', padding: '10px' }}>
                <strong>Total:</strong>
              </td>
              <td style={{ border: '1px solid black', padding: '10px' }}>
                <strong>${total.toFixed(2)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => router.push('/shop')} // Navigate to the Shop Page
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Continue Shopping
        </button>
        {cartItems.length > 0 && (
          <button
            onClick={() => router.push('/checkout')} // Navigate to the Checkout Page
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewCart;
