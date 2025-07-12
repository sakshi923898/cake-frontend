// src/components/CustomerDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendURL = 'https://cake-backend-t0i0.onrender.com';

function CustomerDashboard() {
  const [cakes, setCakes] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [order, setOrder] = useState({
    customerName: '',
    contact: '',
    address: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendURL}/api/cakes`)
      .then(res => setCakes(res.data))
      .catch(err => console.error('Error fetching cakes:', err));
  }, []);

  const handleOrderChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async () => {
    try {
      await axios.post(`${backendURL}/api/orders`, {
        ...order,
        cakeId: selectedCake._id,
      });
      setShowConfirmation(true);
      setOrder({ customerName: '', contact: '', address: '' });
      setSelectedCake(null);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🎂 Welcome to the Cake Shop</h1>
        <button
          onClick={() => navigate("/orders")}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 4
          }}
        >
          Show My Orders
        </button>
      </div>

      <h2>Available Cakes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {cakes.map(cake => (
          <div key={cake._id} style={{ border: '1px solid #ccc', padding: 10, width: 250 }}>
            <img
              src={`${backendURL}${cake.imageUrl.startsWith('/') ? cake.imageUrl : `/uploads/${cake.imageUrl}`}`}
              alt={cake.name}
              style={{ width: '100%', height: 150, objectFit: 'cover' }}
            />
            <h3>{cake.name}</h3>
            <p>₹{cake.price}</p>
            <p>{cake.description}</p>
            <button onClick={() => {
              setSelectedCake(cake);
              setShowConfirmation(false);
            }}>
              Order This
            </button>
          </div>
        ))}
      </div>

      {selectedCake && (
        <>
          <hr />
          <h2>Place Your Order for: {selectedCake.name}</h2>
          <img
            src={`${backendURL}${selectedCake.imageUrl.startsWith('/') ? selectedCake.imageUrl : `/uploads/${selectedCake.imageUrl}`}`}
            alt={selectedCake.name}
            style={{ width: 200, height: 120, objectFit: 'cover' }}
          />
          <br /><br />
          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            value={order.customerName}
            onChange={handleOrderChange}
          /><br />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={order.contact}
            onChange={handleOrderChange}
          /><br />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={order.address}
            onChange={handleOrderChange}
          /><br />
          <button onClick={handleOrderSubmit}>Submit Order</button>
        </>
      )}

      {showConfirmation && (
        <div style={{ marginTop: 20, padding: 15, background: '#d4edda', border: '1px solid #28a745' }}>
          ✅ Thank you! Your order has been placed.
        </div>
      )}
    </div>
  );
}

export default CustomerDashboard;
