import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppLauncher from './AppLauncher';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import SessionInspector from './SessionInspector';
import {
  LayoutGrid,
  UserCog,
  KeyRound,
  ShieldAlert,
  LogOut,
  Sparkles,
} from 'lucide-react';

export default function SsoDashboard() {
  const { session, currentConfig, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('apps');

  const profile = session?.profile || {};
  const fullName =
    profile.name ||
    `${profile.given_name || ''} ${profile.family_name || ''}`.trim() ||
    profile.preferred_username ||
    'Người dùng';
  
  const initial = fullName.charAt(0).toUpperCase();

  const roles = profile.realm_access?.roles || [];
  const primaryRole = roles.includes('admin')
    ? 'ADMIN'
    : roles.includes('creator')
    ? 'CREATOR'
    : 'USER';

  return (
    <div className="min-h-screen flex flex-col z-10">
      
      {/* Top Header */}
      <header className="glass-panel border-b border-slate-800/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 font-bold text-base">
              SSO
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                SSO Hub Portal
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Đang hoạt động
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Máy chủ: {currentConfig.name} ({currentConfig.realm})
              </div>
            </div>
          </div>

          {/* Right User Nav & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center border border-brand-500/30">
                {initial}
              </div>
              <div className="text-left">
                <div className="font-semibold text-white leading-tight">{fullName}</div>
                <div className="text-[10px] text-brand-400 uppercase font-bold tracking-wider">
                  {primaryRole}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="py-2 px-3 sm:px-3.5 rounded-xl font-semibold text-xs bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 transition flex items-center gap-1.5 cursor-pointer"
              title="Đăng xuất khỏi SSO Hub"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 mb-8 border border-slate-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Cổng thông tin điều hướng tập trung
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Xin chào,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-yellow-500">
                  {fullName}
                </span>
                !
              </h2>
              <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
                Bạn đang sở hữu phiên làm việc tập trung (SSO Session). Chọn ứng dụng bạn muốn truy cập bên dưới để đăng nhập tức thì không cần mật khẩu, hoặc cập nhật hồ sơ cá nhân.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center min-w-[120px]">
                <div className="text-[11px] text-slate-400 font-medium">Giao thức</div>
                <div className="text-sm font-bold text-white mt-0.5">OIDC / PKCE</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center min-w-[120px]">
                <div className="text-[11px] text-slate-400 font-medium">Thời hạn phiên</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">30 Phút SSO</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-8 overflow-x-auto custom-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('apps')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'apps'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Kho Ứng Dụng & Điều Hướng</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCog className="w-4 h-4" />
            <span>Thông Tin Cá Nhân</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Đổi Mật Khẩu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('session')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'session'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Chi Tiết Phiên (Token)</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'apps' && <AppLauncher />}
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'session' && <SessionInspector />}

      </main>

    </div>
  );
}

