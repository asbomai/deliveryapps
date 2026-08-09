import API from '../api/api';
import { useState } from 'react';

export default function AdminVerify() {
  const [itemId, setItemId] = useState('');

  const verify = async () => {
    await API.post(`/agent/verify/${itemId}`);
    alert('Verified by Admin');
  };

  return (
    <div>
      <h2>Admin Verification</h2>
      <input placeholder="Item ID"
        onChange={e => setItemId(e.target.value)} />
      <button onClick={verify}>Verify</button>
    </div>
  );
}
