import React from 'react';
import { useAuth } from './context/AuthContext';
import IdLogin from './components/IdLogin';
import SsoDashboard from './components/SsoDashboard';
import Toast from './components/Toast';

export default function App() {
  const { session } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 bg-mesh flex flex-col font-sans text-slate-100">
      <Toast />
      {session ? <SsoDashboard /> : <IdLogin />}
    </div>
  );
}

