import { useEffect, useState } from 'react';
import API from '../api/api';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/user/me').then(res => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <h2>Welcome, {user.fullName || user.phone}</h2>

      <p><b>Role:</b> {user.role}</p>
      <p><b>Phone:</b> {user.phone}</p>

      {user.businessName && <p><b>Business:</b> {user.businessName}</p>}
      {user.businessAddress && <p><b>Address:</b> {user.businessAddress}</p>}

      {user.role === 'AGENT' && (
        <>
          <p><b>Agent Type:</b> {user.agentType}</p>
          <p><b>Location:</b> {user.agentLocation}</p>
        </>
      )}
    </DashboardLayout>
  );
}
