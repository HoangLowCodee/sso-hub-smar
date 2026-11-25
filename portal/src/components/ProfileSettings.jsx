import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserPen, Save, Loader2 } from 'lucide-react';

export default function ProfileSettings() {
  const { session, updateProfile, showToast } = useAuth();
  const profile = session?.profile || {};

  const [firstName, setFirstName] = useState(profile.given_name || '');
  const [lastName, setLastName] = useState(profile.family_name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Email không được để trống.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({ firstName, lastName, email });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-[#061e17] rounded-2xl p-6 sm:p-7 border border-[#184538] shadow-xl">
        
        <div className="mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UserPen className="w-5 h-5 text-[#c29b57]" />
            Cập Nhật Hồ Sơ Người Dùng
          </h3>
          <p className="text-xs text-[#d8b06c]/90 mt-1">
            Thông tin sau khi cập nhật sẽ tự động đồng bộ trên toàn bộ các ứng dụng trong hệ thống SSO Hub.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#c29b57] uppercase tracking-wider mb-1.5">
                Họ & Tên Đệm (First Name)
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ví dụ: Alice"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a2920] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c29b57] uppercase tracking-wider mb-1.5">
                Tên (Last Name)
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ví dụ: Creative"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a2920] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#c29b57] uppercase tracking-wider mb-1.5">
              Địa Chỉ Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@creative.com"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a2920] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#d8b06c]/70 uppercase tracking-wider mb-1.5">
              Tên Đăng Nhập (Username - Cố định)
            </label>
            <input
              type="text"
              value={profile.preferred_username || 'alice'}
              disabled
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a2920]/50 border border-[#184538]/50 text-sm text-gray-400 cursor-not-allowed font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="py-2.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-[#0d4838] to-[#16654f] hover:from-[#073327] hover:to-[#0d4838] text-[#f5efe5] border border-[#c29b57]/50 shadow-md shadow-[#0d4838]/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#c29b57]" />
                  <span>Đang lưu thông tin...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#c29b57]" />
                  <span>Lưu Thay Đổi Hồ Sơ</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
