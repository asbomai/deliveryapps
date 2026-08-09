import API from '../api/api';
import { useState } from 'react';

export default function AgentVerify() {
  const [itemId, setItemId] = useState('');

  const verify = async () => {
    try {
      await API.post(`/agent/verify/${itemId}`);
      alert('Item verified successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div>
      <h2>Agent Verification</h2>
      <input
        placeholder="Enter Item ID"
        value={itemId}
        onChange={e => setItemId(e.target.value)}
      />
      <button onClick={verify}>Verify Item</button>
    </div>
  );
}
