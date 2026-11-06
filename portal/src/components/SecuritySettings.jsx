import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LockKeyhole, Check, Loader2, KeyRound } from 'lucide-react';

export default function SecuritySettings() {
  const { currentConfig, updatePassword, showToast } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmation) {
      showToast('Mật khẩu xác nhận không khớp.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Mật khẩu mới phải có tối thiểu 6 ký tự.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword({ currentPassword, newPassword, confirmation });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmation('');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenKeycloakReset = () => {
    const resetUrl = `${currentConfig.baseUrl}/realms/${currentConfig.realm}/login-actions/reset-credentials`;
    window.open(resetUrl, '_blank');
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-7 border border-zinc-800 shadow-xl">
        
        <div className="mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <LockKeyhole className="w-5 h-5 text-white" />
            Bảo Mật & Đổi Mật Khẩu
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Mật khẩu mới sẽ áp dụng ngay lập tức cho tất cả các lần đăng nhập SSO sau này.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Mật Khẩu Hiện Tại
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Nhập mật khẩu hiện tại (ví dụ: 123456)"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Mật Khẩu Mới
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Tối thiểu 6 ký tự"
              required
              minLength={6}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Xác Nhận Mật Khẩu Mới
            </label>
            <input
              type="password"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              required
              minLength={6}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleOpenKeycloakReset}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 transition flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Đặt lại mật khẩu qua giao diện Keycloak ↗
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl font-bold text-xs bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/5 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Đang cập nhật...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Cập Nhật Mật Khẩu</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
