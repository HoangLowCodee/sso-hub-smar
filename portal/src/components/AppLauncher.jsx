import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Rocket,
  Palette,
  Coffee,
  Shield,
  ExternalLink,
  Monitor,
  CheckCircle2,
} from 'lucide-react';

export default function AppLauncher() {
  const { currentConfig, showToast } = useAuth();

  const creativeCloudUrl = import.meta.env.VITE_CREATIVE_URL || 'https://creative-industry-center.vercel.app/admin/login';
  const lavietCloudUrl = import.meta.env.VITE_LAVIET_URL || 'https://la-vi-et.vercel.app/admin/login';

  const handleOpenApp = (url, appName) => {
    showToast(`Đang chuyển hướng sang ${appName} với phiên SSO...`, 'info');
    setTimeout(() => {
      window.open(url, '_blank');
    }, 400);
  };

  const handleOpenAdmin = () => {
    const adminUrl = `${currentConfig.baseUrl}/admin/${currentConfig.realm}/console/`;
    showToast('Đang mở Keycloak Administration Console...', 'info');
    window.open(adminUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Rocket className="w-5 h-5 text-brand-400" />
          Hệ Sinh Thái Ứng Dụng Tích Hợp
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Chọn một trong các ứng dụng dưới đây để mở và đăng nhập tức thì thông qua Single Sign-On (SSO):
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* APP 1: TRUNG TÂM CÔNG NGHIỆP SÁNG TẠO */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition group shadow-xl">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/40 text-red-400 flex items-center justify-center font-bold text-lg shadow-sm">
                <Palette className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Online
              </span>
            </div>
            
            <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition">
              Trung Tâm Công Nghiệp Sáng Tạo
            </h4>
            
            <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
              Cổng thông tin và bảng điều khiển quản trị số hồ sơ, đề án, sự kiện và không gian sáng tạo.
            </p>

            <div className="flex flex-wrap gap-1.5 my-4">
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono">React SPA</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono">Flask API</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-brand-500/10 border border-brand-500/20 text-brand-300 font-mono">PKCE (app-a)</span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => handleOpenApp(creativeCloudUrl, 'Trung Tâm Sáng Tạo')}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-red-700 hover:bg-red-600 text-white shadow-md shadow-red-700/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mở Bản Cloud (Vercel)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleOpenApp('http://localhost:5173/admin/login', 'Trung Tâm Sáng Tạo (Local)')}
              className="w-full py-2 px-3 rounded-xl font-medium text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Mở Bản Local (:5173)</span>
              <Monitor className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>

        {/* APP 2: LÀ VIỆT COFFEE */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition group shadow-xl">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/40 text-amber-400 flex items-center justify-center font-bold text-lg shadow-sm">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Online
              </span>
            </div>
            
            <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition">
              Là Việt Coffee
            </h4>
            
            <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
              Hệ thống thương mại điện tử, đặt hàng và quản lý chuỗi cà phê thương hiệu Là Việt Coffee.
            </p>

            <div className="flex flex-wrap gap-1.5 my-4">
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono">Next.js 16</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono">Prisma ORM</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">Confidential (app-b)</span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => handleOpenApp(lavietCloudUrl, 'Là Việt Coffee')}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-md shadow-amber-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mở Bản Cloud (Vercel)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleOpenApp('http://localhost:3000/admin/login', 'Là Việt Coffee (Local)')}
              className="w-full py-2 px-3 rounded-xl font-medium text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Mở Bản Local (:3000)</span>
              <Monitor className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>

        {/* APP 3: KEYCLOAK ADMIN CONSOLE */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition group shadow-xl">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-400 flex items-center justify-center font-bold text-lg shadow-sm">
                <Shield className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                IAM Core
              </span>
            </div>
            
            <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition">
              Bảng Quản Trị Keycloak IdP
            </h4>
            
            <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
              Bảng điều khiển quản trị trung tâm: Cấu hình Realm, quản lý người dùng, phân quyền RBAC và Clients OIDC.
            </p>

            <div className="flex flex-wrap gap-1.5 my-4">
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono">Keycloak 24</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono">Quarkus</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono">Admin Only</span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleOpenAdmin}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-white transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mở Keycloak Console</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

