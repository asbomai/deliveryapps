import { Link } from "react-router-dom";
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      {user.role === 'ADMIN' && (
  <>
    <Link to="/admin/agents">Manage Agents</Link>
    <Link to="/admin/items">All Items</Link>
  </>
)}



      <div style={{ padding: 20, flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
