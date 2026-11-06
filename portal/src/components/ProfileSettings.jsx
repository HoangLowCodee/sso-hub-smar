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
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-7 border border-zinc-800 shadow-xl">
        
        <div className="mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UserPen className="w-5 h-5 text-white" />
            Cập Nhật Hồ Sơ Người Dùng
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Thông tin sau khi cập nhật sẽ tự động đồng bộ trên toàn bộ các ứng dụng trong hệ thống SSO.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Họ & Tên Đệm (First Name)
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ví dụ: Alice"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Tên (Last Name)
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ví dụ: Nguyen"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Địa Chỉ Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@creative.com"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                Tên Đăng Nhập (Username)
              </label>
              <input
                type="text"
                value={profile.preferred_username || ''}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800/80 text-sm text-zinc-400 cursor-not-allowed font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                Mã Định Danh Keycloak (UUID)
              </label>
              <input
                type="text"
                value={profile.sub || ''}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800/80 text-xs text-zinc-500 cursor-not-allowed font-mono truncate"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="py-2.5 px-5 rounded-xl font-bold text-xs bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/5 active:scale-[0.99] transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Đang lưu thay đổi...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-black" />
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
