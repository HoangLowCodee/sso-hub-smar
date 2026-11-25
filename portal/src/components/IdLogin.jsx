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
  Sparkles,
  Loader2,
  FolderKanban,
  KeyRound,
} from 'lucide-react';

export default function IdLogin() {
  const {
    session,
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#061e17] text-[#f5efe5] font-[Inter,sans-serif]">
      
      {/* Quầng sáng Ambient Heritage Economy (Xanh Ngọc Di Sản & Vàng Hoàng Kim) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#0d4838]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#c29b57]/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-8">

        {/* Badge Header: SSO HUB */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041510] border border-[#184538] text-xs font-semibold text-[#c29b57] shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-[#c29b57] animate-pulse"></span>
            <span>ĐĂNG NHẬP VỚI SSO HUB</span>
          </div>
        </div>

        {/* Khung Card Đăng Nhập Tone Heritage Economy (Jade & Gold) */}
        <div className="bg-[#0a2920] border border-[#184538] rounded-2xl shadow-2xl p-7 sm:p-9 backdrop-blur-md relative overflow-hidden">
          
          {/* Đường viền ánh vàng hoàng gia trên đầu thẻ */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c29b57] to-transparent"></div>

          {/* Logo & Tiêu Đề */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#061e17] border border-[#184538] mb-3.5 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-[#c29b57]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5 uppercase font-[Plus_Jakarta_Sans,sans-serif]">
              Cổng Đăng Nhập ID
            </h1>
            <p className="text-xs text-[#d8b06c]/90 leading-relaxed">
              Hệ thống xác thực tập trung & quản trị toàn bộ các dự án trong hệ sinh thái SSO Hub
            </p>
          </div>

          {/* Nút Đăng Nhập Nhanh 1 Chạm */}
          <div className="mb-6 p-3 rounded-xl bg-[#061e17] border border-[#184538] flex items-center justify-between text-xs">
            <span className="text-[#d8b06c] flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#c29b57]" /> Đăng nhập nhanh:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleQuickLogin('alice')}
                className="px-3 py-1.5 rounded-lg bg-[#0a2920] hover:bg-[#0d4838] text-[#c29b57] hover:text-[#f5efe5] font-bold transition border border-[#184538] hover:border-[#c29b57] cursor-pointer disabled:opacity-50"
              >
                Alice (Admin)
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleQuickLogin('bob')}
                className="px-3 py-1.5 rounded-lg bg-[#0a2920] hover:bg-[#0d4838] text-[#c29b57] hover:text-[#f5efe5] font-medium transition border border-[#184538] hover:border-[#c29b57] cursor-pointer disabled:opacity-50"
              >
                Bob (User)
              </button>
            </div>
          </div>

          {/* Form Đăng Nhập Trực Tiếp */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-[#c29b57] mb-1.5 uppercase tracking-wider">
                Tài Khoản ID / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600/70">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ví dụ: alice hoặc alice@creative.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#061e17] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[#c29b57] uppercase tracking-wider">
                  Mật Khẩu
                </label>
                <span className="text-[11px] text-[#d8b06c]/80">Mặc định: 123456</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#061e17] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-500 hover:text-[#c29b57] transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Nút Đăng Nhập Chính - Tone Xanh Ngọc Di Sản & Vàng Kim Chuẩn Heritage Economy */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#0d4838] to-[#16654f] hover:from-[#073327] hover:to-[#0d4838] text-[#f5efe5] border border-[#c29b57]/60 shadow-lg shadow-[#0d4838]/50 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#c29b57]" />
                  <span>Đang đăng nhập với SSO Hub...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#c29b57]" />
                  <span>Đăng nhập với SSO Hub</span>
                </>
              )}
            </button>

          </form>

          {/* Phân Cách */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#184538]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0a2920] px-3 text-[#d8b06c]/80 text-[11px] uppercase tracking-wider font-semibold">
                Hoặc tùy chọn khác
              </span>
            </div>
          </div>

          {/* Nút Đăng Nhập Keycloak Hosted */}
          <button
            type="button"
            onClick={loginWithOidc}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-xs bg-[#061e17] hover:bg-[#0d4838]/40 border border-[#184538] hover:border-[#c29b57]/50 text-[#c29b57] hover:text-[#d8b06c] transition cursor-pointer shadow-sm"
          >
            <KeyRound className="w-4 h-4 text-[#c29b57]" />
            <span>Mở Cổng Xác Thực Keycloak Hosted</span>
          </button>

          {/* Chú Thích Dưới Thẻ */}
          <div className="mt-6 pt-5 border-t border-[#184538]/60 text-center">
            <p className="text-[11px] text-[#d8b06c]/80 flex items-center justify-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-[#c29b57]" />
              <span>Tự động chuyển hướng vào Trang Quản Lý Dự Án sau khi đăng nhập</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
