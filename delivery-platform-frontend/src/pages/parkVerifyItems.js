import { useEffect, useState } from 'react';
import API from '../api/api';
import DashboardLayout from '../components/DashboardLayout';

export default function ParkVerifyItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/item/park-items').then(res => setItems(res.data));
  }, []);

  const verify = async (id) => {
    await API.put(`/item/park-verify/${id}`);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <DashboardLayout>
      <h2>Park Verification</h2>

      {items.map(item => (
        <div key={item._id} style={{ border: '1px solid #ccc', marginBottom: 20 }}>
          <p><b>Item ID:</b> {item.itemId}</p>
          <p><b>Sender:</b> {item.sender.phone}</p>
          <p><b>Receiver:</b> {item.receiver.phone}</p>

          {Object.entries(item.images).map(([angle, data]) => (
            <div key={angle}>
              <img src={data.url} width="150" />
              <p>{angle}: {data.description}</p>
            </div>
          ))}

          <button onClick={() => verify(item._id)}>
            Confirm Verification
          </button>
        </div>
      ))}
    </DashboardLayout>
  );
}
