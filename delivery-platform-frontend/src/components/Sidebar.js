import { Link } from 'react-router-dom';

export default function Sidebar() {
  const role = localStorage.getItem('role');

  return (
    <div style={{ width: 220, background: '#f5f5f5', padding: 20 }}>
      <h3>Menu</h3>

      <Link to="/dashboard">Dashboard</Link><br />

      {role === 'USER' && (
        <>
          <Link to="/register-item">Register Item</Link><br />
          <Link to="/sent-items">Sent Items</Link><br />
          <Link to="/received-items">Received Items</Link><br />
        </>
      )}

      {role === 'AGENT' && (
        <>
          <Link to="/verify-items">Verify Items</Link><br />
          <Link to="/item-history">Item History</Link><br />
        </>
      )}

      {role === 'ADMIN' && (
        <>
          <Link to="/manage-agents">Manage Agents</Link><br />
          <Link to="/all-items">All Items</Link><br />
        </>
      )}

      <br />
      <Link to="/profile">Profile</Link><br />
      <button onClick={() => {
        localStorage.clear();
        window.location.href = '/login';
      }}>
        Logout
      </button>
    </div>
  );
}
