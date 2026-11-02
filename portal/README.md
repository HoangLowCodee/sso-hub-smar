# 🌐 Cổng Xác Thực Tập Trung & Bảng Điều Khiển SSO Hub (React + Tailwind CSS)

Ứng dụng web Single-Page Application (SPA) xây dựng bằng **React 18 + Tailwind CSS + Lucide Icons + Vite**, bao gồm đầy đủ 2 màn hình theo yêu cầu:
1. **Trang ID Login (Identity Login)**: Cho phép người dùng truy cập và đăng nhập bằng tài khoản SSO của mình (hỗ trợ cả REST Direct Grants và OIDC PKCE).
2. **Trang SSO Dashboard (User Hub & SIS App Switcher)**:
   - **Kho ứng dụng (App Launcher / Switcher)**: Danh sách các website trong hệ sinh thái (Trung Tâm Công Nghiệp Sáng Tạo, Là Việt Coffee, Keycloak Admin). Bấm nút để chuyển hướng sang ứng dụng đích với phiên SSO.
   - **Cập nhật thông tin cá nhân (Profile Update)**: Xem và chỉnh sửa Họ tên, Email, Username, ID Keycloak.
   - **Đổi mật khẩu (Security & Change Password)**: Đổi mật khẩu tài khoản trực tiếp.
   - **Chi tiết phiên làm việc (Session Claims)**: Xem và kiểm tra dữ liệu Token JWT giải mã.

---

## 🚀 Cách Khởi Chạy Ứng Dụng

Mở Terminal tại thư mục `d:\Projects\sso\projects\portal`:

### 1. Chạy môi trường Phát triển (Vite Dev Server - HMR):
```bash
cd d:\Projects\sso\projects\portal
npm run dev
```
Truy cập trình duyệt tại: **`http://localhost:4000`**

### 2. Build và chạy môi trường Production:
```bash
npm run build
npm start
```
Server chạy phục vụ trực tiếp thư mục `dist/` trên cổng **`4000`**.

---

## 🔑 Tài Khoản Thử Nghiệm Nhanh

| Tài khoản | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- |
| **`alice`** | `123456` | Quản trị viên (Admin), Người dùng (User), Sáng tạo (Creator) |
| **`bob`** | `123456` | Người dùng (User) |

*(Giao diện tích hợp sẵn 2 nút bấm **Alice (Admin)** và **Bob (User)** để tự động điền trong 1 click).*

---

## ⚙️ Chuyển Đổi Môi Trường SSO Linh Hoạt

Ngay phía trên form đăng nhập có thanh chuyển đổi:
- **Cloud Render (Live)**: Trỏ về máy chủ SSO Hub trên Render: `https://sso-hub-173a.onrender.com`
- **Localhost (:8888)**: Trỏ về Keycloak chạy local qua Docker: `http://localhost:8888`

---

## Ứng Dụng Được Kết Nối Điều Hướng (Ecosystem)

1. **Trung Tâm Công Nghiệp Sáng Tạo**
   - Cloud: `https://creative-industry-center.vercel.app/admin/login`
   - Local: `http://localhost:5173/admin/login`
2. **Là Việt Coffee**
   - Cloud: `https://la-vi-et.vercel.app/admin/login`
   - Local: `http://localhost:3000/admin/login`
3. **Keycloak Admin Console**
   - URL: `https://sso-hub-173a.onrender.com/admin/sso-platform/console/`
