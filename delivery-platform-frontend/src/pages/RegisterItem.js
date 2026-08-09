import { useState } from 'react';
import API from '../api/api';
import CameraCapture from '../components/CameraCapture';
import DashboardLayout from '../components/DashboardLayout';

const angles = ['front', 'back', 'left', 'right'];

export default function RegisterItem() {
  const [receiverPhone, setReceiverPhone] = useState('');
  const [images, setImages] = useState({});

  const submit = async () => {
    await API.post('/item/create', {
      receiverPhone,
      images
    });
    alert('Item registered');
  };

  return (
    <DashboardLayout>
      <h2>Register Item</h2>

      <input
        placeholder="Receiver Phone"
        value={receiverPhone}
        onChange={e => setReceiverPhone(e.target.value)}
      />

      {angles.map(angle => (
        <div key={angle}>
          <h4>{angle.toUpperCase()}</h4>

          <CameraCapture
            onCapture={(img) =>
              setImages(prev => ({
                ...prev,
                [angle]: { ...prev[angle], image: img }
              }))
            }
          />

          <textarea
            placeholder="Description"
            onChange={e =>
              setImages(prev => ({
                ...prev,
                [angle]: { ...prev[angle], description: e.target.value }
              }))
            }
          />
        </div>
      ))}

      <button onClick={submit}>Submit Item</button>
    </DashboardLayout>
  );
}
