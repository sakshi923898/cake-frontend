import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const confirmDelivery = async (orderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/confirm`);
      alert('Thank you for confirming your delivery!');
      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm delivery');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ddd', marginTop: 10, padding: 10 }}>
          {order.cakeId && (
            <>
              <h4>Cake: {order.cakeId.name}</h4>
              <img
                src={`http://localhost:5000${order.cakeId.imageUrl}`}
                alt={order.cakeId.name}
                style={{ width: 150, height: 100, objectFit: 'cover' }}
              />
              <p>Price: ₹{order.cakeId.price}</p>
            </>
          )}
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          {order.status !== 'Delivered' && (
            <button onClick={() => confirmDelivery(order._id)}>
              Confirm Delivery
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Order;
