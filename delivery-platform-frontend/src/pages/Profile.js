import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [form, setForm] = useState({
    fullName: '',
    businessName: '',
    businessAddress: ''
  });

  const navigate = useNavigate();

  const submit = async () => {
    await API.put('/user/profile', form);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Complete Profile</h2>

      <input placeholder="Full Name" onChange={e => setForm({...form, fullName: e.target.value})} />
      <input placeholder="Business Name" onChange={e => setForm({...form, businessName: e.target.value})} />
      <input placeholder="Business Address" onChange={e => setForm({...form, businessAddress: e.target.value})} />

      <button onClick={submit}>Save</button>
    </div>
  );
}
