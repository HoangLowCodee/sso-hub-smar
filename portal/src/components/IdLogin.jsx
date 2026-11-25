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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#141412] text-[#e9e5da] font-[Inter,sans-serif]">
      
      {/* Quầng sáng Ambient Heritage (Đỏ Di Sản & Vàng Kim Hoàng Gia) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#710008]/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#d49520]/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-8">

        {/* Badge Header: ĐĂNG NHẬP VỚI SSO-SMAR-HUB (Bỏ localhost theo yêu cầu) */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e0e0c] border border-[#39321f] text-xs font-semibold text-[#d49520] shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-[#d49520] animate-pulse"></span>
            <span>ĐĂNG NHẬP VỚI SSO-SMAR-HUB</span>
          </div>
        </div>

        {/* Khung Card Đăng Nhập Tone Heritage */}
        <div className="bg-[#1e1e1a] border border-[#39321f] rounded-2xl shadow-2xl p-7 sm:p-9 backdrop-blur-md relative overflow-hidden">
          
          {/* Đường viền ánh vàng hoàng gia trên đầu thẻ */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d49520] to-transparent"></div>

          {/* Logo & Tiêu Đề */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0e0e0c] border border-[#39321f] mb-3.5 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-[#d49520]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5 uppercase font-[Plus_Jakarta_Sans,sans-serif]">
              Cổng Đăng Nhập ID
            </h1>
            <p className="text-xs text-[#b8aa85] leading-relaxed">
              Hệ thống xác thực tập trung & quản trị toàn bộ các dự án trong hệ sinh thái SSO-SMAR-HUB
            </p>
          </div>

          {/* Nút Đăng Nhập Nhanh 1 Chạm */}
          <div className="mb-6 p-3 rounded-xl bg-[#141412] border border-[#39321f] flex items-center justify-between text-xs">
            <span className="text-[#b8aa85] flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#d49520]" /> Đăng nhập nhanh:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleQuickLogin('alice')}
                className="px-3 py-1.5 rounded-lg bg-[#1e1e1a] hover:bg-[#710008] text-[#d49520] hover:text-white font-bold transition border border-[#39321f] cursor-pointer disabled:opacity-50"
              >
                Alice (Admin)
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleQuickLogin('bob')}
                className="px-3 py-1.5 rounded-lg bg-[#1e1e1a] hover:bg-[#710008] text-[#d49520] hover:text-white font-medium transition border border-[#39321f] cursor-pointer disabled:opacity-50"
              >
                Bob (User)
              </button>
            </div>
          </div>

          {/* Form Đăng Nhập Trực Tiếp */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-[#d49520] mb-1.5 uppercase tracking-wider">
                Tài Khoản ID / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ví dụ: alice hoặc alice@creative.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141412] border border-[#39321f] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d49520] focus:ring-1 focus:ring-[#d49520] transition font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[#d49520] uppercase tracking-wider">
                  Mật Khẩu
                </label>
                <span className="text-[11px] text-[#b8aa85]">Mặc định: 123456</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#141412] border border-[#39321f] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d49520] focus:ring-1 focus:ring-[#d49520] transition font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#d49520] transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Nút Đăng Nhập Chính - Màu Đỏ Di Sản / Kỷ Lục Hoàng Gia */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#710008] to-[#91131c] hover:from-[#840610] hover:to-[#a31923] text-white shadow-lg shadow-[#710008]/40 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Đang xác thực với SSO-SMAR-HUB...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>ĐĂNG NHẬP VỚI SSO-SMAR-HUB & VÀO DASHBOARD</span>
                </>
              )}
            </button>

          </form>

          {/* Phân Cách */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#39321f]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#1e1e1a] px-3 text-[#b8aa85]/80 text-[11px] uppercase tracking-wider font-semibold">
                Hoặc tùy chọn khác
              </span>
            </div>
          </div>

          {/* Nút Đăng Nhập Keycloak Hosted */}
          <button
            type="button"
            onClick={loginWithOidc}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-xs bg-[#141412] hover:bg-[#252520] border border-[#39321f] text-[#d49520] hover:text-[#f0b542] transition cursor-pointer shadow-sm"
          >
            <KeyRound className="w-4 h-4 text-[#d49520]" />
            <span>Mở Cổng Xác Thực Keycloak Hosted</span>
          </button>

          {/* Chú Thích Dưới Thẻ */}
          <div className="mt-6 pt-5 border-t border-[#39321f]/60 text-center">
            <p className="text-[11px] text-[#b8aa85]/80 flex items-center justify-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-[#d49520]" />
              <span>Tự động chuyển hướng vào Trang Quản Lý Dự Án sau khi đăng nhập</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
