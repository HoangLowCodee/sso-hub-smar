# 🔑 Danh Mục Tài Khoản & Thông Số Test SSO Hub

Tài liệu này lưu trữ toàn bộ **tài khoản, mật khẩu, đường dẫn (URL) và khóa bí mật (Secrets)** để chuẩn bị kiểm thử hệ thống Single Sign-On cho **Trung Tâm Công Nghiệp Sáng Tạo** và **Là Việt**.

---

## 1. Tài Khoản Quản Trị Hệ Thống (Keycloak Admin)

Dùng để vào trang quản trị cấu hình Realm, tạo thêm User, cấp quyền (Role), xem Session:

| Thông tin | Giá trị |
| :--- | :--- |
| **Đường dẫn Admin** | [http://localhost:8888/admin](http://localhost:8888/admin) |
| **Tên đăng nhập** | `admin` |
| **Mật khẩu** | `admin` |
| **Realm làm việc** | `sso-platform` *(chọn ở góc trên bên trái)* |

---

## 2. Tài Khoản Người Dùng Thử Nghiệm (Test Users)

Dùng để đăng nhập thử trên giao diện SSO Hub:

| Tài khoản | Username / Email | Mật khẩu | Quyền hạn (Realm Roles) | Đại diện cho |
| :---: | :--- | :--- | :--- | :--- |
| **User 1** | `alice`<br/>`alice@creative.com` | `Password123@` | `admin`, `creator`, `user` | Quản trị viên Trung Tâm Sáng Tạo |
| **User 2** | `bob`<br/>`bob@laviet.com` | `Password123@` | `user` | Khách hàng / Thành viên Là Việt |

---

## 3. Thông Số Kết Nối Client Của 2 Ứng Dụng

### 🎨 Ứng dụng 1: Trung Tâm Công Nghiệp Sáng Tạo (React SPA)
- **Client ID**: `app-a` *(hoặc `cic-web`)*
- **Loại Client**: `Public Client` (bảo vệ bằng mã hóa **PKCE - S256**)
- **Client Secret**: *Không có (vì là SPA chạy trên trình duyệt)*
- **Redirect URIs hợp lệ**:
  - `http://localhost:5173/*` *(khi dev local)*
  - `https://creative-industry-center.vercel.app/*` *(trên Vercel)*

---

### ☕ Ứng dụng 2: Là Việt (Next.js App)
- **Client ID**: `app-b` *(hoặc `laviet-web`)*
- **Loại Client**: `Confidential Client` (xác thực máy chủ với máy chủ)
- **Client Secret**: `app-b-confidential-secret-key-123456`
- **Redirect URIs hợp lệ**:
  - `http://localhost:3000/api/auth/callback/keycloak`
  - `https://la-vi-et.vercel.app/api/auth/callback/keycloak`

---

## 4. Đường Dẫn (Endpoints) Cốt Lõi Để Test Nhanh

| Mục đích | Đường dẫn (URL) |
| :--- | :--- |
| **Trang Đăng Nhập SSO Hub** | [Mở trang đăng nhập SSO](http://localhost:8888/realms/sso-platform/protocol/openid-connect/auth?client_id=app-a&response_type=code&redirect_uri=http://localhost:5173&scope=openid&code_challenge=E9Melhoa2OwvFrGMTJguCH5rtx64-fc79UC5NNGhiBE&code_challenge_method=S256) |
| **OIDC Discovery (.well-known)** | `http://localhost:8888/realms/sso-platform/.well-known/openid-configuration` |
| **Lấy Public Key JWKS** *(để Flask verify token)* | `http://localhost:8888/realms/sso-platform/protocol/openid-connect/certs` |
| **Endpoint Trao Đổi Token** *(POST)* | `http://localhost:8888/realms/sso-platform/protocol/openid-connect/token` |
| **Endpoint Đăng Xuất (SLO)** | `http://localhost:8888/realms/sso-platform/protocol/openid-connect/logout` |

---

## 5. Cơ Sở Dữ Liệu & Hạ Tầng Nội Bộ (Docker)

| Dịch vụ | Host / Cổng | User | Mật khẩu | Database |
| :--- | :--- | :--- | :--- | :--- |
| **PostgreSQL** | `localhost:5432` | `keycloak` | `keycloak_secret_pass` | `keycloak` |
| **Redis Cache** | `localhost:6379` | - | `redis_secret_pass` | - |
| **Keycloak Service** | `localhost:8888` | `admin` | `admin` | - |

---

## 6. Các Lệnh Điều Khiển Hệ Thống Cần Nhớ

```powershell
# Chuyển vào thư mục dự án
cd d:\Projects\sso\projects

# Khởi động lại toàn bộ hệ thống
docker compose up -d

# Xem log trực tiếp của Keycloak
docker logs -f sso-keycloak

# Dừng hệ thống khi không dùng
docker compose down
```

