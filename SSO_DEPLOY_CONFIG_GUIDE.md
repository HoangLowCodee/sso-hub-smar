# 📘 Hướng Dẫn Cấu Hình Biến Môi Trường SSO Hub (Render & Vercel)

Tài liệu này tổng hợp chi tiết các biến môi trường chuẩn xác để kết nối hệ thống **SSO Hub (Keycloak 24 trên Render)** với ứng dụng **Trung Tâm Công Nghiệp Sáng Tạo (React SPA trên Vercel + Flask API trên Render)**.

---

## 🌐 1. Thông Số Máy Chủ SSO Hub Đang Hoạt Động

| Thông số | Giá trị |
| :--- | :--- |
| **Domain Keycloak (Render)** | `https://sso-hub-173a.onrender.com` |
| **Tên Realm làm việc** | `sso-platform` |
| **Client ID (React & Flask)** | `react-flask-app` |
| **Trang Quản Trị Keycloak Admin** | `https://sso-hub-173a.onrender.com/admin` |
| **Tài khoản Test Admin** | `alice` / `123456` |

---

## 🎨 2. Cấu Hình Trên Vercel (Frontend React SPA)

Truy cập: **Vercel Dashboard** ➜ Chọn dự án `creative-industry-center` ➜ **Settings** ➜ **Environment Variables**.

### Bảng biến môi trường cần nhập / cập nhật:

| Tên biến (Key) | Giá trị chính xác (Value) | Ghi chú quan trọng |
| :--- | :--- | :--- |
| `VITE_KEYCLOAK_AUTH_URL` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/auth` | ⚠️ **BẮT BUỘC có đầy đủ đuôi `/realms/.../auth`**, nếu để link gốc sẽ bị nhảy vào trang Admin Keycloak |
| `VITE_KEYCLOAK_URL` | `https://sso-hub-173a.onrender.com` | Domain gốc của SSO Hub |
| `VITE_KEYCLOAK_REALM` | `sso-platform` | ⚠️ Phải là `sso-platform` (không dùng `web-platform`) |
| `VITE_KEYCLOAK_CLIENT_ID` | `react-flask-app` | Client ID đã tạo trong Realm |
| `VITE_API_URL` | `https://creative-industry-center.onrender.com` | Domain API backend của bạn |

> ⚠️ **BƯỚC BẮT BUỘC SAU KHI LƯU BIẾN TRÊN VERCEL:**
> 1. Chuyển sang tab **Deployments** trên Vercel.
> 2. Bấm vào nút dấu **3 chấm `(...)`** ở bản build mới nhất trên cùng.
> 3. Chọn **Redeploy** để Vercel build lại và nạp các biến môi trường mới vào file JavaScript.

---

## ⚙️ 3. Cấu Hình Trên Render (Backend Flask API)

Truy cập: **Render Dashboard** ➜ Chọn dịch vụ Backend Flask (`creative-industry-center`) ➜ Tab **Environment**.

### Bảng biến môi trường cần nhập / cập nhật:

| Tên biến (Key) | Giá trị chính xác (Value) | Ghi chú |
| :--- | :--- | :--- |
| `KEYCLOAK_URL` | `https://sso-hub-173a.onrender.com` | Domain gốc của SSO Hub |
| `KEYCLOAK_TOKEN_URL` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/token` | Thay thế hoàn toàn link Cloudflare cũ |
| `KEYCLOAK_USERINFO_URL` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/userinfo` | Thay thế hoàn toàn link Cloudflare cũ |
| `KEYCLOAK_ISSUER` | `https://sso-hub-173a.onrender.com/realms/sso-platform` | Issuer OIDC |
| `KEYCLOAK_JWKS_URI` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/certs` | Public Key để xác thực chữ ký Token |
| `KEYCLOAK_CLIENT_ID` | `react-flask-app` | Khớp với Client ID của Frontend |

> ⚠️ **BƯỚC BẮT BUỘC SAU KHI LƯU BIẾN TRÊN RENDER:**
> - Bấm nút **Save Changes**. Render sẽ tự động kích hoạt tiến trình Restart/Redeploy Backend.

---

## 🧪 4. Hướng Dẫn Kiểm Thử Đăng Nhập SSO

1. **Mở trình duyệt ở chế độ Ẩn danh (Incognito)** bằng phím tắt `Ctrl + Shift + N` (để không bị dính cache file JS cũ).
2. Truy cập vào trang: 
   ```text
   https://creative-industry-center.vercel.app/admin/login
   ```
3. Bấm nút **Đăng nhập bằng SSO Hub (Keycloak)**.
4. **Quan sát:** Trình duyệt sẽ mở đúng giao diện đăng nhập SSO của Keycloak:
   - Giao diện tối giản Clean UX/UI kèm dropdown chọn nền tảng.
5. **Nhập tài khoản đăng nhập:**
   - **Tài khoản**: `alice` *(hoặc `alice@creative.com`)*
   - **Mật khẩu**: `123456`
6. Bấm **Đăng nhập**:
   - Keycloak sẽ xác thực và chuyển hướng trở lại trang web.
   - Backend Flask sẽ trao đổi Token thành công qua Render.
   - Bạn sẽ được đăng nhập tự động vào hệ thống quản trị (`Admin Dashboard`).

