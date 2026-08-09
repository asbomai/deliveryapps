import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    const res = await API.post('/auth/login', { phone, password });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);

    if (!res.data.profileComplete) {
      navigate('/profile');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit}>Login</button>
    </div>
  );
}
