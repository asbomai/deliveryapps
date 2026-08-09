import { useEffect, useState } from 'react';
import API from '../api/api';
import DashboardLayout from '../components/DashboardLayout';

export default function ReceivedItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/item/received').then(res => setItems(res.data));
  }, []);

  return (
    <DashboardLayout>
      <h2>Received Items</h2>

      {items.map(item => (
        <div key={item._id} style={{ border: '1px solid #ccc', marginBottom: 15 }}>
          <p><b>Item ID:</b> {item.itemId}</p>
          <p><b>Sender:</b> {item.sender.phone}</p>
          <p><b>Status:</b> {item.status}</p>

          <a href={`/item/${item._id}`}>View Details</a>
        </div>
      ))}
    </DashboardLayout>
  );
}
