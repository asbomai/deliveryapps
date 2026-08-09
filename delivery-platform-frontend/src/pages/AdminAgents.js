import { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminAgents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    phone: '',
    agentType: 'PARK',
    agentLocation: ''
  });

  useEffect(() => {
    API.get('/admin/agents').then(res => setAgents(res.data));
  }, []);

  const createAgent = async () => {
    await API.post('/admin/create-agent', form);
    window.location.reload();
  };

  const toggle = async (id) => {
    await API.put(`/admin/agent-status/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <h2>Agent Management</h2>

      <input placeholder="Phone" onChange={e => setForm({...form, phone:e.target.value})}/>
      <input placeholder="Location" onChange={e => setForm({...form, agentLocation:e.target.value})}/>
      <select onChange={e => setForm({...form, agentType:e.target.value})}>
        <option value="PARK">Park Agent</option>
        <option value="PICKUP">Pickup Agent</option>
      </select>

      <button onClick={createAgent}>Create Agent</button>

      {agents.map(a => (
        <div key={a._id}>
          <p>{a.phone} | {a.agentType} | {a.agentLocation}</p>
          <button onClick={() => toggle(a._id)}>
            {a.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      ))}
    </div>
  );
}
