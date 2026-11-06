import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import SessionInspector from './SessionInspector';
import {
  FolderKanban,
  Search,
  ExternalLink,
  Shield,
  Palette,
  Coffee,
  LogOut,
  User,
  CheckCircle2,
  Lock,
  Globe,
  Monitor,
  Sparkles,
  Server,
  ArrowUpRight,
  Layers,
  SlidersHorizontal,
  X,
  UserCog,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

export default function SsoDashboard() {
  const { session, currentConfig, logout, showToast } = useAuth();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [launchMode, setLaunchMode] = useState('cloud'); // 'cloud' | 'local'

  // Modal Settings state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('profile'); // 'profile' | 'security' | 'session'

  const profile = session?.profile || {};
  const fullName =
    profile.name ||
    `${profile.given_name || ''} ${profile.family_name || ''}`.trim() ||
    profile.preferred_username ||
    'Quản trị viên';
  const initial = fullName.charAt(0).toUpperCase();

  const roles = profile.realm_access?.roles || [];
  const primaryRole = roles.includes('admin')
    ? 'SUPER ADMIN'
    : roles.includes('creator')
    ? 'CREATOR'
    : 'MEMBER';

  // Danh sách các dự án hiện có trong hệ thống SSO
  const projects = [
    {
      id: 'creative-industry-center',
      title: 'Trung Tâm Công Nghiệp Sáng Tạo',
      category: 'culture',
      tags: ['React 18 SPA', 'Flask REST API', 'Vercel + Render'],
      description:
        'Hệ thống chuyển đổi số quản lý hồ sơ, đề án sáng tạo, bảo tàng nghệ thuật, sự kiện văn hóa và không gian sáng tạo quốc gia.',
      adminUrlCloud:
        import.meta.env.VITE_CREATIVE_URL ||
        'https://creative-industry-center.vercel.app/admin/login',
      adminUrlLocal: 'http://localhost:5173/admin/login',
      publicUrlCloud: 'https://creative-industry-center.vercel.app',
      publicUrlLocal: 'http://localhost:5173',
      icon: Palette,
      badgeText: 'OIDC Public + S256 PKCE',
    },
    {
      id: 'la-viet-coffee',
      title: 'Chuỗi Cà Phê Là Việt (Là Việt Coffee)',
      category: 'retail',
      tags: ['Next.js 16', 'Prisma ORM', 'NextAuth / Auth.js'],
      description:
        'Nền tảng thương mại điện tử, quản trị sản phẩm cà phê đặc sản, đơn hàng, điểm bán lẻ và chuỗi chi nhánh thương hiệu Là Việt Coffee.',
      adminUrlCloud:
        import.meta.env.VITE_LAVIET_URL ||
        'https://la-vi-et.vercel.app/admin/login',
      adminUrlLocal: 'http://localhost:3000/admin/login',
      publicUrlCloud: 'https://la-vi-et.vercel.app',
      publicUrlLocal: 'http://localhost:3000',
      icon: Coffee,
      badgeText: 'OIDC Confidential + Secret',
    },
    {
      id: 'keycloak-iam-admin',
      title: 'Hệ Thống Quản Trị Danh Tính (Keycloak IAM)',
      category: 'system',
      tags: ['Keycloak 24', 'Quarkus Low-RAM', 'PostgreSQL'],
      description:
        'Trung tâm quản trị Identity & Access Management: Quản lý Realm, tài khoản người dùng, phân quyền Roles (RBAC), phiên làm việc và Clients.',
      adminUrlCloud: `${currentConfig.baseUrl}/admin/${currentConfig.realm}/console/`,
      adminUrlLocal: 'http://localhost:8888/admin/sso-platform/console/',
      publicUrlCloud: `${currentConfig.baseUrl}/realms/${currentConfig.realm}/account/`,
      publicUrlLocal: 'http://localhost:8888/realms/sso-platform/account/',
      icon: Shield,
      badgeText: 'Master Identity Core',
    },
  ];

  // Lọc dự án theo tìm kiếm và danh mục
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      filterCategory === 'all' || proj.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // HÀNH ĐỘNG CHÍNH: REDIRECT TRỰC TIẾP SANG TRANG ADMIN CỦA DỰ ÁN ĐÓ
  const handleRedirectToAdmin = (project) => {
    const targetUrl =
      launchMode === 'cloud' ? project.adminUrlCloud : project.adminUrlLocal;

    showToast(`Đang chuyển hướng sang Trang Admin của ${project.title}...`, 'info');

    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 300);
  };

  const handleOpenPublicWeb = (e, project) => {
    e.stopPropagation();
    const targetUrl =
      launchMode === 'cloud' ? project.publicUrlCloud : project.publicUrlLocal;
    window.open(targetUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col z-10 bg-black text-zinc-100">
      
      {/* ===================================================================== */}
      {/* TOP HEADER NAVIGATION - TRẮNG ĐEN */}
      {/* ===================================================================== */}
      <header className="bg-zinc-950/90 border-b border-zinc-800/90 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-base shadow-lg shadow-white/5 tracking-wider">
              SSO
            </div>
            <div>
              <div className="font-extrabold text-sm text-white flex items-center gap-2 tracking-wide">
                HỆ THỐNG QUẢN LÝ DỰ ÁN
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SSO Active
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">
                Máy chủ: {currentConfig.name} ({currentConfig.realm})
              </div>
            </div>
          </div>

          {/* Right: User Profile & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* User Pill Button (Click to open Profile Modal) */}
            <button
              type="button"
              onClick={() => {
                setModalTab('profile');
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs transition cursor-pointer text-left group"
              title="Xem và chỉnh sửa thông tin tài khoản"
            >
              <div className="w-7 h-7 rounded-lg bg-white text-black font-black flex items-center justify-center group-hover:scale-105 transition shadow-sm">
                {initial}
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-white leading-tight group-hover:text-zinc-200 transition">
                  {fullName}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase font-semibold tracking-wider">
                  {primaryRole}
                </div>
              </div>
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              className="py-2 px-3 sm:px-3.5 rounded-xl font-bold text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Đăng xuất khỏi toàn bộ hệ thống"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>

          </div>

        </div>
      </header>

      {/* ===================================================================== */}
      {/* MAIN DASHBOARD CONTENT */}
      {/* ===================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Chào Mừng & Thống Kê - High Contrast */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-950/90 p-6 sm:p-8 mb-8 border border-zinc-800 shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-200 border border-zinc-700 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-white" /> Bảng Điều Khiển Quản Lý Dự Án Tập Trung
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Xin chào, <span className="underline decoration-zinc-500 underline-offset-4">{fullName}</span>!
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
                Tất cả các dự án bên dưới đã được liên kết với tài khoản SSO của bạn. 
                <strong className="text-white font-bold"> Nhấp vào bất kỳ dự án nào để chuyển hướng trực tiếp vào Trang Admin</strong> với quyền quản trị viên mà không cần nhập lại mật khẩu.
              </p>
            </div>

            {/* Thống kê 3 chỉ số */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center min-w-[90px]">
                <div className="text-[10px] text-zinc-400 font-medium">Tổng dự án</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5">3 Dự án</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center min-w-[90px]">
                <div className="text-[10px] text-zinc-400 font-medium">Phiên SSO</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5 flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Sẵn sàng
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center min-w-[90px]">
                <div className="text-[10px] text-zinc-400 font-medium">Quyền hạn</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5">Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* TOOLBAR: TÌM KIẾM, BỘ LỌC VÀ CHỌN CHẾ ĐỘ (CLOUD / LOCAL) */}
        {/* ===================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-7">
          
          {/* Ô Tìm Kiếm Dự Án */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm dự án theo tên, công nghệ, tag..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bộ lọc danh mục & Chế độ môi trường (Trắng Đen) */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Category filter buttons */}
            <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  filterCategory === 'all'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tất cả (3)
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('culture')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  filterCategory === 'culture'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sáng Tạo
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('retail')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  filterCategory === 'retail'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Là Việt
              </button>
            </div>

            {/* Launch Mode: Cloud (Production) vs Local (Dev) */}
            <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
              <span className="px-2.5 text-zinc-500 text-[11px] font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" /> Đích đến:
              </span>
              <button
                type="button"
                onClick={() => setLaunchMode('cloud')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  launchMode === 'cloud'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Mở các link deploy trên Vercel"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Cloud Vercel</span>
              </button>
              <button
                type="button"
                onClick={() => setLaunchMode('local')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  launchMode === 'local'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Mở các cổng dev local trên máy (:5173, :3000)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Local Dev</span>
              </button>
            </div>

          </div>

        </div>

        {/* ===================================================================== */}
        {/* LƯỚI DANH SÁCH DỰ ÁN HIỆN CÓ (PROJECTS GRID) - TRẮNG ĐEN */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            const targetAdminUrl =
              launchMode === 'cloud'
                ? project.adminUrlCloud
                : project.adminUrlLocal;

            return (
              <div
                key={project.id}
                onClick={() => handleRedirectToAdmin(project)}
                className="group relative bg-zinc-950 rounded-2xl p-6 sm:p-7 border border-zinc-800 hover:border-zinc-400 transition-all duration-300 hover:shadow-2xl hover:shadow-white/5 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
              >
                <div>
                  
                  {/* Top Bar of Card: Icon & Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center p-3 font-bold text-xl shadow-md group-hover:bg-white group-hover:text-black transition">
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-900 text-zinc-300 border border-zinc-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Đang chạy
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {project.badgeText}
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-black text-white group-hover:text-zinc-200 transition flex items-center gap-1.5 leading-snug">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-white flex-shrink-0" />
                  </h3>

                  {/* Project Description */}
                  <p className="text-xs text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Destination Admin URL Preview */}
                  <div className="p-2.5 rounded-xl bg-black border border-zinc-800/90 text-[11px] font-mono text-zinc-400 truncate flex items-center gap-2 mb-4">
                    <Globe className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                    <span className="truncate">{targetAdminUrl}</span>
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2.5 pt-4 border-t border-zinc-800/80">
                  
                  {/* NÚT CHÍNH: TRẮNG CHỮ ĐEN - REDIRECT SANG TRANG ADMIN CỦA DỰ ÁN */}
                  <button
                    type="button"
                    onClick={() => handleRedirectToAdmin(project)}
                    className="w-full py-3 px-4 rounded-xl font-black text-xs bg-white hover:bg-zinc-200 text-black shadow-lg shadow-white/5 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Vào Trang Quản Trị (Admin Panel)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-black" />
                  </button>

                  {/* Nút phụ: Mở Web Người Dùng (nếu có) */}
                  <button
                    type="button"
                    onClick={(e) => handleOpenPublicWeb(e, project)}
                    className="w-full py-2 px-3 rounded-xl font-semibold text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Mở trang chủ người dùng của dự án"
                  >
                    <span>Xem Trang Chủ Web</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-zinc-950 rounded-2xl border border-zinc-800">
            <FolderKanban className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">Không tìm thấy dự án phù hợp</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Thử tìm kiếm với từ khóa khác như "Sáng Tạo", "Là Việt", "Keycloak" hoặc chọn lại danh mục.
            </p>
          </div>
        )}

      </main>

      {/* ===================================================================== */}
      {/* MODAL CẬP NHẬT THÔNG TIN CÁ NHÂN & ĐỔI MẬT KHẨU - TRẮNG ĐEN */}
      {/* ===================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black">
                  {initial}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Cài Đặt Tài Khoản SSO</h3>
                  <p className="text-xs text-zinc-400">{profile.email || profile.preferred_username}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-zinc-800 mb-6 pb-1">
              <button
                type="button"
                onClick={() => setModalTab('profile')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  modalTab === 'profile'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <UserCog className="w-4 h-4" />
                <span>Hồ Sơ Cá Nhân</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('security')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  modalTab === 'security'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Đổi Mật Khẩu</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('session')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  modalTab === 'session'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Thông Số Token</span>
              </button>
            </div>

            {/* Modal Body */}
            <div>
              {modalTab === 'profile' && <ProfileSettings />}
              {modalTab === 'security' && <SecuritySettings />}
              {modalTab === 'session' && <SessionInspector />}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
