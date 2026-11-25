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
  const [modalTab, setModalTab] = useState('profile');

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

  // Danh sách các dự án hiện có trong hệ sinh thái SSO Hub
  const projects = [
    {
      id: 'creative-industry-center',
      title: 'Trung Tâm Công Nghiệp Sáng Tạo (Kỷ Lục / Di Sản)',
      category: 'culture',
      tags: ['React 18 SPA', 'Flask REST API', 'Vercel + Render'],
      description:
        'Hệ thống số hóa quản lý hồ sơ di sản, đề án kỷ lục gia, bảo tàng nghệ thuật, sự kiện văn hóa và không gian sáng tạo quốc gia.',
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
    <div className="min-h-screen flex flex-col z-10 bg-[#061e17] text-[#f5efe5] font-[Inter,sans-serif]">
      
      {/* ===================================================================== */}
      {/* TOP HEADER NAVIGATION - HERITAGE ECONOMY JADE & GOLD */}
      {/* ===================================================================== */}
      <header className="bg-[#0a2920] border-b border-[#184538] sticky top-0 z-40 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d4838] to-[#16654f] border border-[#c29b57]/50 flex items-center justify-center text-[#c29b57] font-black text-sm shadow-md tracking-wider">
              SSO
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-2 tracking-wide font-[Plus_Jakarta_Sans,sans-serif]">
                SSO HUB
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#061e17] text-[#c29b57] border border-[#184538] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c29b57] animate-pulse"></span>
                  Active
                </span>
              </div>
              <div className="text-[11px] text-[#d8b06c]/90">
                Hệ thống Quản lý Dự án Tập trung
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
              className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-[#061e17] hover:bg-[#0d4838]/40 border border-[#184538] text-xs transition cursor-pointer text-left group"
              title="Xem và chỉnh sửa thông tin tài khoản"
            >
              <div className="w-7 h-7 rounded-lg bg-[#0a2920] border border-[#184538] text-[#c29b57] font-bold flex items-center justify-center group-hover:scale-105 transition shadow-sm">
                {initial}
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-white leading-tight group-hover:text-[#c29b57] transition">
                  {fullName}
                </div>
                <div className="text-[10px] text-[#c29b57] uppercase font-semibold tracking-wider">
                  {primaryRole}
                </div>
              </div>
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              className="py-2 px-3 sm:px-3.5 rounded-xl font-semibold text-xs bg-[#061e17] hover:bg-[#76232d] text-[#d8b06c] hover:text-white border border-[#184538] transition flex items-center gap-1.5 cursor-pointer shadow-sm"
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
        
        {/* Banner Chào Mừng & Thống Kê - Heritage Jade & Gold Accent */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0a2920] border border-[#184538] p-6 sm:p-8 mb-8 shadow-2xl backdrop-blur-xl">
          {/* Subtle Ambient lights */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#0d4838]/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#c29b57]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#061e17] text-[#c29b57] border border-[#184538] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#c29b57]" /> Bảng Điều Khiển Quản Lý Dự Án Tập Trung
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-[Plus_Jakarta_Sans,sans-serif]">
                Xin chào, <span className="text-[#c29b57]">{fullName}</span>!
              </h2>
              <p className="mt-2 text-sm text-[#d8b06c]/90 max-w-2xl leading-relaxed">
                Tất cả các dự án bên dưới đã được liên kết với tài khoản SSO Hub của bạn. 
                <strong className="text-white font-semibold"> Nhấp vào bất kỳ dự án nào để chuyển hướng trực tiếp vào Trang Admin</strong> với quyền quản trị viên mà không cần nhập lại mật khẩu.
              </p>
            </div>

            {/* Thống kê 3 chỉ số */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3.5 rounded-xl bg-[#061e17] border border-[#184538] text-center min-w-[90px]">
                <div className="text-[10px] text-[#d8b06c]/80 font-medium">Tổng dự án</div>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5">3 Dự án</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#061e17] border border-[#184538] text-center min-w-[90px]">
                <div className="text-[10px] text-[#d8b06c]/80 font-medium">Phiên SSO</div>
                <div className="text-base sm:text-lg font-bold text-[#c29b57] mt-0.5 flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#c29b57] animate-pulse"></span> Sẵn sàng
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#061e17] border border-[#184538] text-center min-w-[90px]">
                <div className="text-[10px] text-[#d8b06c]/80 font-medium">Quyền hạn</div>
                <div className="text-base sm:text-lg font-bold text-[#c29b57] mt-0.5">Admin</div>
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
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600/70">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm dự án theo tên, công nghệ, tag..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a2920] border border-[#184538] text-sm text-[#f5efe5] placeholder-emerald-700/60 focus:outline-none focus:border-[#c29b57] focus:ring-1 focus:ring-[#c29b57] transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bộ lọc danh mục & Chế độ đích đến */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Category filter buttons */}
            <div className="flex items-center p-1 rounded-xl bg-[#0a2920] border border-[#184538] text-xs">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  filterCategory === 'all'
                    ? 'bg-gradient-to-r from-[#0d4838] to-[#16654f] text-[#f5efe5] border border-[#c29b57]/40 shadow-sm'
                    : 'text-[#d8b06c]/80 hover:text-white'
                }`}
              >
                Tất cả (3)
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('culture')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  filterCategory === 'culture'
                    ? 'bg-gradient-to-r from-[#0d4838] to-[#16654f] text-[#f5efe5] border border-[#c29b57]/40 shadow-sm'
                    : 'text-[#d8b06c]/80 hover:text-white'
                }`}
              >
                Kỷ Lục / Sáng Tạo
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('retail')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  filterCategory === 'retail'
                    ? 'bg-gradient-to-r from-[#0d4838] to-[#16654f] text-[#f5efe5] border border-[#c29b57]/40 shadow-sm'
                    : 'text-[#d8b06c]/80 hover:text-white'
                }`}
              >
                Là Việt
              </button>
            </div>

            {/* Launch Mode: Cloud (Production) vs Local (Dev) */}
            <div className="flex items-center p-1 rounded-xl bg-[#0a2920] border border-[#184538] text-xs">
              <span className="px-2.5 text-[#d8b06c]/80 text-[11px] font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-[#c29b57]" /> Đích đến:
              </span>
              <button
                type="button"
                onClick={() => setLaunchMode('cloud')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                  launchMode === 'cloud'
                    ? 'bg-[#061e17] text-[#c29b57] border border-[#c29b57]/50 shadow-sm'
                    : 'text-[#d8b06c]/80 hover:text-white'
                }`}
                title="Mở các link deploy trên Vercel"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Cloud Vercel</span>
              </button>
              <button
                type="button"
                onClick={() => setLaunchMode('local')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                  launchMode === 'local'
                    ? 'bg-[#061e17] text-[#c29b57] border border-[#c29b57]/50 shadow-sm'
                    : 'text-[#d8b06c]/80 hover:text-white'
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
        {/* LƯỚI DANH SÁCH DỰ ÁN HIỆN CÓ (PROJECTS GRID) - HERITAGE THEME */}
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
                className="group relative bg-[#0a2920] rounded-2xl p-6 sm:p-7 border border-[#184538] hover:border-[#c29b57] transition-all duration-300 hover:shadow-2xl hover:shadow-[#0d4838]/30 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
              >
                <div>
                  
                  {/* Top Bar of Card: Icon & Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#061e17] border border-[#184538] text-[#c29b57] flex items-center justify-center p-3 font-bold text-xl shadow-md group-hover:bg-[#0d4838] group-hover:text-[#f5efe5] group-hover:border-[#c29b57] transition">
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#061e17] text-[#c29b57] border border-[#184538] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#c29b57]" /> Sẵn sàng SSO
                      </span>
                      <span className="text-[10px] text-[#d8b06c]/80 font-mono">
                        {project.badgeText}
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#c29b57] transition flex items-center gap-1.5 leading-snug font-[Plus_Jakarta_Sans,sans-serif]">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c29b57] flex-shrink-0" />
                  </h3>

                  {/* Project Description */}
                  <p className="text-xs text-[#d8b06c]/90 mt-2.5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[10px] bg-[#061e17] border border-[#184538] text-[#f5efe5] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Destination Admin URL Preview */}
                  <div className="p-2.5 rounded-xl bg-[#061e17] border border-[#184538] text-[11px] font-mono text-[#d8b06c]/90 truncate flex items-center gap-2 mb-4">
                    <Globe className="w-3.5 h-3.5 text-[#c29b57] flex-shrink-0" />
                    <span className="truncate">{targetAdminUrl}</span>
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2.5 pt-4 border-t border-[#184538]">
                  
                  {/* NÚT CHÍNH: JADE & GOLD HERITAGE ECONOMY - REDIRECT SANG ADMIN */}
                  <button
                    type="button"
                    onClick={() => handleRedirectToAdmin(project)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#0d4838] to-[#16654f] hover:from-[#073327] hover:to-[#0d4838] text-[#f5efe5] border border-[#c29b57]/50 shadow-lg shadow-[#0d4838]/40 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>VÀO TRANG QUẢN TRỊ (ADMIN PANEL)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {/* Nút phụ: Mở Web Người Dùng (nếu có) */}
                  <button
                    type="button"
                    onClick={(e) => handleOpenPublicWeb(e, project)}
                    className="w-full py-2 px-3 rounded-xl font-medium text-xs bg-[#061e17] hover:bg-[#0d4838]/40 text-[#c29b57] hover:text-[#d8b06c] border border-[#184538] transition flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Mở trang chủ người dùng của dự án"
                  >
                    <span>Xem Trang Chủ Web</span>
                    <ArrowUpRight className="w-3 h-3 text-[#d8b06c]/80" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[#0a2920] rounded-2xl border border-[#184538]">
            <FolderKanban className="w-12 h-12 text-[#d8b06c]/80 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">Không tìm thấy dự án phù hợp</h4>
            <p className="text-xs text-[#d8b06c]/80 mt-1">
              Thử tìm kiếm với từ khóa khác như "Sáng Tạo", "Kỷ Lục", "Là Việt", "Keycloak" hoặc chọn lại danh mục.
            </p>
          </div>
        )}

      </main>

      {/* ===================================================================== */}
      {/* MODAL CẬP NHẬT THÔNG TIN CÁ NHÂN & ĐỔI MẬT KHẨU - HERITAGE THEME */}
      {/* ===================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0a2920] rounded-2xl border border-[#184538] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#184538] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#061e17] border border-[#184538] text-[#c29b57] flex items-center justify-center font-bold">
                  {initial}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Cài Đặt Tài Khoản SSO Hub</h3>
                  <p className="text-xs text-[#d8b06c]/80">{profile.email || profile.preferred_username}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-[#061e17] hover:bg-[#0d4838]/40 text-[#d8b06c] hover:text-white border border-[#184538] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-[#184538] mb-6 pb-1">
              <button
                type="button"
                onClick={() => setModalTab('profile')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  modalTab === 'profile'
                    ? 'bg-gradient-to-r from-[#0d4838] to-[#16654f] text-[#f5efe5] border border-[#c29b57]/40 shadow-sm'
                    : 'text-[#d8b06c]/80 hover:text-white'
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
                    ? 'bg-gradient-to-r from-[#0d4838] to-[#16654f] text-[#f5efe5] border border-[#c29b57]/40 shadow-sm'
                    : 'text-[#d8b06c]/80 hover:text-white'
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
                    ? 'bg-gradient-to-r from-[#0d4838] to-[#16654f] text-[#f5efe5] border border-[#c29b57]/40 shadow-sm'
                    : 'text-[#d8b06c]/80 hover:text-white'
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
