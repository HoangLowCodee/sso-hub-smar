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
  CheckCircle,
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

  const [username, setUsername] = useState('alice');
  const [password, setPassword] = useState('123456');
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
      navigate('/dashboard', { replace: true });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (acc) => {
    const user = acc === 'alice' ? 'alice' : 'bob';
    setUsername(user);
    setPassword('123456');
    setIsLoading(true);
    try {
      await loginWithPassword(user, '123456');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative z-10 bg-black text-white selection:bg-white selection:text-black">
      
      {/* Selector: Máy chủ SSO - Trắng Đen */}
      <div className="mb-6 flex items-center gap-2 p-1.5 rounded-full bg-zinc-950 text-xs text-zinc-300 shadow-xl border border-zinc-800">
        <span className="px-3 py-1 font-semibold text-zinc-400 flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-zinc-300" />
          Máy chủ SSO:
        </span>
        <button
          type="button"
          onClick={() => switchEnv('render')}
          className={`px-3.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
            activeEnv === 'render'
              ? 'bg-white text-black shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Cloud Render (Live)
        </button>
        <button
          type="button"
          onClick={() => switchEnv('local')}
          className={`px-3.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
            activeEnv === 'local'
              ? 'bg-white text-black shadow-sm'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Localhost (:8888)
        </button>
      </div>

      {/* Card Đăng Nhập ID - Minimalist Monochrome */}
      <div className="w-full max-w-md bg-zinc-950 rounded-2xl p-8 sm:p-9 shadow-2xl relative overflow-hidden border border-zinc-800">
        
        {/* Đường viền trắng bạc trên cùng */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>

        {/* Tiêu đề & Logo ID */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-black mb-4 shadow-xl shadow-white/5 font-black">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-1.5 uppercase">
            Cổng Đăng Nhập ID
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Đăng nhập một lần để truy cập và quản lý toàn bộ các dự án trong hệ sinh thái
          </p>
        </div>

        {/* Nút đăng nhập 1 chạm nhanh */}
        <div className="mb-6 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-white" /> Đăng nhập nhanh:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleQuickLogin('alice')}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-extrabold transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              Alice (Admin)
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleQuickLogin('bob')}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition border border-zinc-700 cursor-pointer disabled:opacity-50"
            >
              Bob (User)
            </button>
          </div>
        </div>

        {/* Form Đăng Nhập Trực Tiếp */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Tài Khoản ID / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ví dụ: alice hoặc alice@creative.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Mật Khẩu
              </label>
              <span className="text-[11px] text-zinc-500">Mặc định: 123456</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary Action Button - Pure White background with black text */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-white hover:bg-zinc-200 text-black shadow-xl shadow-white/5 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Đang xử lý đăng nhập...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-black" />
                <span>Đăng Nhập & Vào Dashboard Dự Án</span>
              </>
            )}
          </button>

        </form>

        {/* Phân cách */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-zinc-950 px-3 text-zinc-500 text-[11px] uppercase tracking-wider font-semibold">
              Hoặc đăng nhập chuẩn Keycloak
            </span>
          </div>
        </div>

        {/* Nút chuyển sang Keycloak OIDC */}
        <button
          type="button"
          onClick={loginWithOidc}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 text-zinc-400" />
          <span>Mở Cổng Xác Thực Keycloak Hosted</span>
        </button>

        {/* Chú thích điều hướng */}
        <div className="mt-6 pt-5 border-t border-zinc-900 text-center text-xs text-zinc-500 flex items-center justify-center gap-1.5">
          <FolderKanban className="w-3.5 h-3.5 text-zinc-400" />
          <span>Tự động chuyển hướng vào Trang Quản Lý Dự Án sau khi đăng nhập</span>
        </div>

      </div>

    </div>
  );
}
