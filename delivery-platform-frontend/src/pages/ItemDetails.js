import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import DashboardLayout from '../components/DashboardLayout';

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('');

  useEffect(() => {
    API.get(`/item/${id}`).then(res => setItem(res.data));
  }, [id]);

  const approve = async () => {
    await API.put(`/item/approve/${id}`, { pickupLocation });
    alert('Item approved');
    window.location.href = '/received-items';
  };

  if (!item) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <h2>Item Details</h2>

      <p><b>Item ID:</b> {item.itemId}</p>
      <p><b>Status:</b> {item.status}</p>

      {Object.entries(item.images).map(([angle, data]) => (
        <div key={angle}>
          <h4>{angle.toUpperCase()}</h4>
          <img src={data.url} width="200" />
          <p>{data.description}</p>
        </div>
      ))}

      {item.status === 'CREATED' && (
        <>
          <select onChange={e => setPickupLocation(e.target.value)}>
            <option value="">Select Pickup Location</option>
            <option value="Abuja">Abuja</option>
            <option value="Lagos">Lagos</option>
            <option value="Kano">Kano</option>
          </select>

          <button onClick={approve}>Approve Item</button>
        </>
      )}
    </DashboardLayout>
  );
}
