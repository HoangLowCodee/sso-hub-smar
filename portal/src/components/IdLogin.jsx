import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ExternalLink,
  Sparkles,
  Server,
  Loader2,
  FolderKanban,
} from 'lucide-react';

export default function IdLogin() {
  const {
    session,
    activeEnv,
    switchEnv,
    loginWithPassword,
    loginWithOidc,
    showToast,
  } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Nếu người dùng đã có phiên đăng nhập -> Tự động chuyển hướng sang Dashboard quản lý dự án
  useEffect(() => {
    if (session) {
      navigate('/dashboard', { replace: true });
    }
  }, [session, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setIsLoading(true);
    try {
      await loginWithPassword(username, password);
      // Đăng nhập thành công -> Redirect sang Dashboard quản lý các dự án
      navigate('/dashboard', { replace: true });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (account) => {
    if (account === 'alice') {
      setUsername('alice');
      setPassword('123456');
    } else {
      setUsername('bob');
      setPassword('123456');
    }
    showToast(`Đã nạp sẵn tài khoản mẫu: ${account}`, 'info');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative z-10">
      
      {/* Bộ chọn môi trường máy chủ SSO */}
      <div className="mb-6 flex items-center gap-2 p-1.5 rounded-full glass-panel text-xs text-slate-300 shadow-xl border border-slate-800">
        <span className="px-3 py-1 font-semibold text-slate-400 flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-brand-400" />
          Máy chủ SSO:
        </span>
        <button
          type="button"
          onClick={() => switchEnv('render')}
          className={`px-3.5 py-1 rounded-full font-medium transition-all ${
            activeEnv === 'render'
              ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Cloud Render (Live)
        </button>
        <button
          type="button"
          onClick={() => switchEnv('local')}
          className={`px-3.5 py-1 rounded-full font-medium transition-all ${
            activeEnv === 'local'
              ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Localhost (:8888)
        </button>
      </div>

      {/* Khung Card Đăng Nhập ID */}
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 sm:p-9 shadow-2xl relative overflow-hidden border border-slate-800/80">
        
        {/* Đường viền ánh kim trên cùng */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-amber-500 to-red-600"></div>

        {/* Tiêu đề & Logo ID */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-700/30 border border-brand-500/40 text-brand-400 mb-4 shadow-lg shadow-brand-500/10">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5">
            Cổng Đăng Nhập ID
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Đăng nhập tài khoản định danh để truy cập và quản lý toàn bộ các dự án trong hệ sinh thái
          </p>
        </div>

        {/* Nút thử nghiệm nhanh tài khoản */}
        <div className="mb-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Dùng thử nhanh:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickFill('alice')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-brand-500/20 hover:text-brand-300 text-slate-300 font-medium transition border border-slate-700 cursor-pointer"
            >
              Alice (Admin)
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('bob')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-brand-500/20 hover:text-brand-300 text-slate-300 font-medium transition border border-slate-700 cursor-pointer"
            >
              Bob (User)
            </button>
          </div>
        </div>

        {/* Form Đăng Nhập Trực Tiếp */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Tài Khoản ID / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ví dụ: alice hoặc alice@creative.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Mật Khẩu
              </label>
              <span className="text-[11px] text-slate-500">Mặc định: 123456</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-brand-500 to-amber-600 hover:from-brand-600 hover:to-amber-700 text-white shadow-lg shadow-brand-500/20 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang xác thực ID...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập & Vào Dashboard Dự Án</span>
              </>
            )}
          </button>

        </form>

        {/* Phân cách */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-950/90 px-3 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
              Hoặc đăng nhập chuẩn Keycloak
            </span>
          </div>
        </div>

        {/* Nút chuyển sang Keycloak OIDC */}
        <button
          type="button"
          onClick={loginWithOidc}
          className="w-full py-2.5 px-4 rounded-xl font-medium text-xs bg-slate-900 hover:bg-slate-800 text-brand-300 hover:text-brand-200 border border-slate-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <ExternalLink className="w-4 h-4 text-brand-400" />
          <span>Đăng nhập qua Giao diện Keycloak (PKCE)</span>
        </button>

        {/* Chú thích điều hướng */}
        <div className="mt-6 pt-5 border-t border-slate-900 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <FolderKanban className="w-3.5 h-3.5 text-brand-400" />
          <span>Tự động chuyển hướng vào Trang Quản Lý Dự Án sau khi đăng nhập</span>
        </div>

      </div>

    </div>
  );
}
