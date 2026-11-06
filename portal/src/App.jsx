import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import IdLogin from './components/IdLogin';
import SsoDashboard from './components/SsoDashboard';
import Toast from './components/Toast';

// Component bảo vệ Route: Chưa đăng nhập sẽ bị đẩy về trang /login
function ProtectedRoute({ children }) {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const { session } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black bg-grid-pattern flex flex-col font-sans text-zinc-100 selection:bg-white selection:text-black">
        <Toast />
        <Routes>
          {/* Trang ID Đăng Nhập */}
          <Route path="/login" element={<IdLogin />} />

          {/* Trang Dashboard Quản Lý Dự Án Hiện Có */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SsoDashboard />
              </ProtectedRoute>
            }
          />

          {/* Đường dẫn mặc định (Root) */}
          <Route
            path="/"
            element={<Navigate to={session ? '/dashboard' : '/login'} replace />}
          />

          {/* Fallback cho các URL khác */}
          <Route
            path="*"
            element={<Navigate to={session ? '/dashboard' : '/login'} replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
