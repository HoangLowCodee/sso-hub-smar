# 📘 Hướng Dẫn Cấu Hình Biến Môi Trường SSO Hub (Render & Vercel)

Tài liệu này tổng hợp nguyên nhân gây lỗi, cách khắc phục triệt để và danh sách biến môi trường chuẩn xác cho cả 2 ứng dụng:
1. **Trung Tâm Công Nghiệp Sáng Tạo** (React SPA trên Vercel + Flask API trên Render)
2. **Là Việt Coffee** (Next.js trên Vercel)

---

## 🔍 1. Phân Tích Nguyên Nhân Lỗi Trên Màn Hình (Từ Ảnh Bạn Gửi)

Màn hình báo lỗi:
> *"Không thể kết nối máy chủ SSO Hub: Không thể kết nối máy chủ SSO Hub qua các địa chỉ: [http://localhost:8888/realms/sso-platform/... (ConnectionError); http://host.docker.internal:8888/...]"*

### Nguyên nhân cụ thể:
1. **Trên Render (Backend Flask):**
   - Trong bảng cấu hình **Environment** của Backend trên Render (như trong ảnh bạn chụp), các biến `KEYCLOAK_TOKEN_URL`, `KEYCLOAK_USERINFO_URL`, `KEYCLOAK_ISSUER`, `KEYCLOAK_JWKS_URI` vẫn đang chứa link Cloudflare tunnel cũ (`needed-gif-intensity-string.trycloudflare.com` và `recommendation-south-towards-twin.trycloudflare.com`).
   - Vì Cloudflare tunnel cũ đã đóng/chết, Backend gửi request đổi token sang đó bị Timeout/ConnectionError.
   - Cơ chế fallback tự động kích hoạt thử các địa chỉ local (`localhost:8888`, `host.docker.internal:8888`), nhưng Backend chạy trên máy chủ Render (cloud) nên dĩ nhiên không thể chạm tới máy của bạn -> Báo lỗi danh sách các URL đó.
2. **Trên Vercel (Frontend React):**
   - Biến `VITE_KEYCLOAK_AUTH_URL` đang để `https://sso-hub-173a.onrender.com` (thiếu phần đuôi `/realms/sso-platform/protocol/openid-connect/auth`).
   - Biến `VITE_KEYCLOAK_REALM` đang để `web-platform` thay vì `sso-platform`.
   - Vercel chưa được bấm **Redeploy** sau khi sửa biến.

---

## 🌐 2. Thông Số SSO Hub Trên Render Đang Live

| Thông số | Giá trị |
| :--- | :--- |
| **Domain Keycloak (Render)** | `https://sso-hub-173a.onrender.com` |
| **Tên Realm chuẩn** | `sso-platform` |
| **Client ID Trung Tâm Sáng Tạo** | `react-flask-app` (Public Client + PKCE) |
| **Client ID Là Việt Coffee** | `app-b` (Confidential Client) |
| **Client Secret Là Việt** | `app-b-confidential-secret-key-123456` |
| **Tài khoản Test SSO** | `alice` / `123456` |

---

## 🛠️ 3. SỬA CẤU HÌNH CHO: TRUNG TÂM CÔNG NGHIỆP SÁNG TẠO

### Bước 3.1: Cập nhật biến trên Render (Backend Flask `creative-industry-center`)
Truy cập: **Render Dashboard** ➜ Dịch vụ `creative-industry-center` (Web Service Backend) ➜ Tab **Environment**.
Xóa bỏ các link Cloudflare cũ và cập nhật chính xác như sau:

| Tên biến (Key) | Giá trị chính xác (Value) |
| :--- | :--- |
| `KEYCLOAK_URL` | `https://sso-hub-173a.onrender.com` |
| `KEYCLOAK_TOKEN_URL` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/token` |
| `KEYCLOAK_USERINFO_URL` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/userinfo` |
| `KEYCLOAK_ISSUER` | `https://sso-hub-173a.onrender.com/realms/sso-platform` |
| `KEYCLOAK_JWKS_URI` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/certs` |
| `KEYCLOAK_CLIENT_ID` | `react-flask-app` |

👉 **Bấm `Save Changes`** để Render tự động khởi động lại Backend.

---

### Bước 3.2: Cập nhật biến trên Vercel (Frontend React `creative-industry-center`)
Truy cập: **Vercel Dashboard** ➜ Dự án Frontend ➜ **Settings** ➜ **Environment Variables**.
Cập nhật đúng 5 biến:

| Tên biến (Key) | Giá trị chính xác (Value) |
| :--- | :--- |
| `VITE_KEYCLOAK_AUTH_URL` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/auth` |
| `VITE_KEYCLOAK_URL` | `https://sso-hub-173a.onrender.com` |
| `VITE_KEYCLOAK_REALM` | `sso-platform` |
| `VITE_KEYCLOAK_CLIENT_ID` | `react-flask-app` |
| `VITE_API_URL` | `https://creative-industry-center.onrender.com` |

⚠️ **BẮT BUỘC SAU KHI LƯU TRÊN VERCEL:**
1. Chuyển sang tab **Deployments** trên Vercel.
2. Bấm vào nút dấu **3 chấm `(...)`** ở bản build mới nhất trên cùng.
3. Chọn **Redeploy** (Build lại) để nạp các biến môi trường mới vào file bundle.

---

## ☕ 4. SỬA CẤU HÌNH CHO: LÀ VIỆT COFFEE (`LA_VIET`)

### Bước 4.1: Cấu hình trên Vercel (Dự án Là Việt Coffee)
Truy cập: **Vercel Dashboard** ➜ Chọn dự án `LA_VIET` / `la-vi-et` ➜ **Settings** ➜ **Environment Variables**.
Nhập các biến sau:

| Tên biến (Key) | Giá trị chính xác (Value) | Ghi chú |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_KEYCLOAK_URL` | `https://sso-hub-173a.onrender.com` | Domain gốc SSO Hub |
| `KEYCLOAK_URL` | `https://sso-hub-173a.onrender.com/realms/sso-platform` | Realm URL |
| `KEYCLOAK_TOKEN_URL` | `https://sso-hub-173a.onrender.com/realms/sso-platform/protocol/openid-connect/token` | Token endpoint |
| `KEYCLOAK_CLIENT_ID` | `app-b` | Client ID bí mật của Là Việt |
| `KEYCLOAK_CLIENT_SECRET` | `app-b-confidential-secret-key-123456` | Client Secret |

👉 Sau khi lưu biến trên Vercel, bấm **Redeploy** bản build mới nhất.

---

## 🚀 5. KIỂM TRA ĐĂNG NHẬP SSO

1. Mở cửa sổ trình duyệt ẩn danh mới (`Ctrl + Shift + N`).
2. Vào trang login: `https://creative-industry-center.vercel.app/admin/login` (hoặc Là Việt).
3. Bấm nút **Đăng nhập bằng SSO Hub (Keycloak)**.
4. Đăng nhập với tài khoản:
   - **Tài khoản**: `alice`
   - **Mật khẩu**: `123456`
5. Hệ thống sẽ xác thực và tự động đưa bạn vào thẳng trang quản trị (Admin Dashboard)!
