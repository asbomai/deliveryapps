import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import RegisterItem from './pages/RegisterItem';
import ReceivedItems from './pages/ReceivedItems';
import ItemDetails from './pages/ItemDetails';
import AgentVerify from './pages/AgentVerify';
import PickupConfirmItems from './pages/PickupComfirmItems';
import AdminAgents from './pages/AdminAgents';

import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register-item"
          element={
            <ProtectedRoute roles={['USER']}>
              <RegisterItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/received-items"
          element={
            <ProtectedRoute roles={['USER']}>
              <ReceivedItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/item/:id"
          element={
            <ProtectedRoute roles={['USER']}>
              <ItemDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/verify-items"
          element={
            <ProtectedRoute roles={['AGENT']}>
              <AgentVerify />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pickup-confirm"
          element={
            <ProtectedRoute roles={['AGENT']}>
              <PickupConfirmItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/agents"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminAgents />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
