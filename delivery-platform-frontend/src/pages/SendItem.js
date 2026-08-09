import API from '../api/api';
import { useState } from 'react';

export default function SendItem() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({});

  const submit = async () => {
    await API.post('/items/create', {
      senderId: user._id,
      receiverPhone: form.receiverPhone,
      description: form.description,
      imageUrl: form.imageUrl
    });
    alert('Item sent successfully');
  };

  return (
    <div>
      <h2>Send Item</h2>
      <input placeholder="Item Image URL"
        onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
      <input placeholder="Item Description"
        onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Receiver Phone Number"
        onChange={e => setForm({ ...form, receiverPhone: e.target.value })} />
      <button onClick={submit}>Register Item</button>
    </div>
  );
}
