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
      <div className="bg-[#061e17] rounded-2xl p-6 sm:p-7 border border-[#184538] shadow-xl">
        
        <div className="mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <LockKeyhole className="w-5 h-5 text-[#c29b57]" />
            Bảo Mật & Đổi Mật Khẩu
          </h3>
          <p className="text-xs text-[#d8b06c]/90 mt-1">
            Mật khẩu mới sẽ áp dụng ngay lập tức cho toàn bộ các lần đăng nhập tiếp theo vào hệ thống SSO Hub.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-[#c29b57] uppercase tracking-wider mb-1.5">
              Mật Khẩu Hiện Tại
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Nhập mật khẩu hiện tại"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a2920] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#c29b57] uppercase tracking-wider mb-1.5">
                Mật Khẩu Mới
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a2920] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c29b57] uppercase tracking-wider mb-1.5">
                Xác Nhận Mật Khẩu Mới
              </label>
              <input
                type="password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a2920] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition font-medium"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="py-2.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-[#0d4838] to-[#16654f] hover:from-[#073327] hover:to-[#0d4838] text-[#f5efe5] border border-[#c29b57]/50 shadow-md shadow-[#0d4838]/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#c29b57]" />
                  <span>Đang cập nhật mật khẩu...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#c29b57]" />
                  <span>Cập Nhật Mật Khẩu</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenKeycloakReset}
              className="py-2 px-3 rounded-xl text-xs font-medium text-[#d8b06c]/90 hover:text-[#c29b57] hover:bg-[#0a2920] border border-transparent hover:border-[#184538] transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Quên mật khẩu? Reset qua Email</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
