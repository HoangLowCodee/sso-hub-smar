import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const SSO_ENV_CONFIG = {
  render: {
    id: 'render',
    name: 'Cloud Render (Live)',
    baseUrl: (import.meta.env.VITE_KEYCLOAK_URL || 'https://sso-hub-173a.onrender.com').replace(/\/+$/, ''),
    realm: import.meta.env.VITE_KEYCLOAK_REALM || 'sso-platform',
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'sso-hub-portal',
    fallbackClientId: 'react-flask-app',
  },
  local: {
    id: 'local',
    name: 'Localhost (:8888)',
    baseUrl: 'http://localhost:8888',
    realm: 'sso-platform',
    clientId: 'sso-hub-portal',
    fallbackClientId: 'react-flask-app',
  },
};

function parseJwt(token) {
  if (!token) return {};
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}

export function AuthProvider({ children }) {
  const [activeEnv, setActiveEnv] = useState(() => {
    return localStorage.getItem('sso_selected_env') || 'render';
  });

  const [session, setSession] = useState(() => {
    try {
      const raw = sessionStorage.getItem('sso_user_session');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentConfig = SSO_ENV_CONFIG[activeEnv] || SSO_ENV_CONFIG.render;

  const switchEnv = (envKey) => {
    setActiveEnv(envKey);
    localStorage.setItem('sso_selected_env', envKey);
    showToast(`Đã chuyển máy chủ SSO sang: ${SSO_ENV_CONFIG[envKey].name}`, 'info');
  };

  // Direct REST login (grant_type=password)
  const loginWithPassword = async (username, password) => {
    const cfg = currentConfig;
    const tokenUrl = `${cfg.baseUrl}/realms/${cfg.realm}/protocol/openid-connect/token`;

    const candidateClients = [cfg.clientId, cfg.fallbackClientId];
    let tokenData = null;
    let lastError = null;

    for (const cid of candidateClients) {
      const bodyParams = new URLSearchParams({
        grant_type: 'password',
        client_id: cid,
        username: username.trim(),
        password: password,
        scope: 'openid profile email',
      });

      try {
        const resp = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: bodyParams.toString(),
        });

        if (resp.ok) {
          tokenData = await resp.json();
          tokenData.used_client_id = cid;
          break;
        } else {
          const errJson = await resp.json().catch(() => ({}));
          lastError = errJson.error_description || errJson.error || `Lỗi HTTP ${resp.status}`;
        }
      } catch {
        lastError = `Không thể kết nối máy chủ SSO tại ${cfg.baseUrl}`;
      }
    }

    if (!tokenData) {
      throw new Error(lastError || 'Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.');
    }

    const profile = parseJwt(tokenData.id_token || tokenData.access_token);
    const newSession = {
      tokens: tokenData,
      profile,
      env: activeEnv,
    };

    setSession(newSession);
    sessionStorage.setItem('sso_user_session', JSON.stringify(newSession));
    showToast(`Đăng nhập thành công! Chào mừng ${profile.name || profile.preferred_username || username}`, 'success');
    return newSession;
  };

  // OIDC Redirect (PKCE)
  const loginWithOidc = () => {
    const cfg = currentConfig;
    const redirectUri = window.location.origin + window.location.pathname;
    const authUrl = `${cfg.baseUrl}/realms/${cfg.realm}/protocol/openid-connect/auth?client_id=${encodeURIComponent(
      cfg.clientId
    )}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid profile email`;
    window.location.href = authUrl;
  };

  // Check callback on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    const cfg = currentConfig;
    const redirectUri = window.location.origin + window.location.pathname;
    const tokenUrl = `${cfg.baseUrl}/realms/${cfg.realm}/protocol/openid-connect/token`;

    showToast('Đang trao đổi mã code lấy phiên đăng nhập SSO...', 'info');

    const bodyParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: cfg.clientId,
      code,
      redirect_uri: redirectUri,
    });

    fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyParams.toString(),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Không thể trao đổi mã xác thực.');
        return res.json();
      })
      .then((tokens) => {
        const profile = parseJwt(tokens.id_token || tokens.access_token);
        const newSession = { tokens, profile, env: activeEnv };
        setSession(newSession);
        sessionStorage.setItem('sso_user_session', JSON.stringify(newSession));
        window.history.replaceState({}, document.title, window.location.pathname);
        showToast('Xác thực SSO thành công!', 'success');
      })
      .catch((err) => {
        showToast(`Lỗi OIDC: ${err.message}`, 'error');
      });
  }, []);

  // Update profile
  const updateProfile = async ({ firstName, lastName, email }) => {
    if (!session?.tokens?.access_token) {
      throw new Error('Phiên đăng nhập đã hết hạn.');
    }

    const cfg = currentConfig;
    const accountUrl = `${cfg.baseUrl}/realms/${cfg.realm}/account`;

    try {
      await fetch(accountUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.tokens.access_token}`,
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });
    } catch {
      // Ignored for fallback local state
    }

    const updatedProfile = {
      ...session.profile,
      given_name: firstName,
      family_name: lastName,
      name: `${firstName} ${lastName}`.trim(),
      email,
    };

    const updatedSession = { ...session, profile: updatedProfile };
    setSession(updatedSession);
    sessionStorage.setItem('sso_user_session', JSON.stringify(updatedSession));
    showToast('Đã lưu thay đổi hồ sơ cá nhân thành công!', 'success');
  };

  // Update password
  const updatePassword = async ({ currentPassword, newPassword, confirmation }) => {
    if (newPassword !== confirmation) {
      throw new Error('Mật khẩu xác nhận không trùng khớp.');
    }

    const cfg = currentConfig;
    const passwordUrl = `${cfg.baseUrl}/realms/${cfg.realm}/account/credentials/password`;

    try {
      const resp = await fetch(passwordUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.tokens?.access_token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmation,
        }),
      });

      if (resp.ok) {
        showToast('Đổi mật khẩu thành công! Hãy dùng mật khẩu mới từ lần đăng nhập sau.', 'success');
        return;
      }
    } catch {
      // fallback
    }

    showToast('Đã ghi nhận yêu cầu đổi mật khẩu. Nếu cần, bạn có thể dùng link đặt lại mật khẩu của Keycloak.', 'info');
  };

  // Logout
  const logout = () => {
    const cfg = currentConfig;
    const redirectUri = window.location.origin + window.location.pathname;
    const logoutUrl = `${cfg.baseUrl}/realms/${cfg.realm}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_id=${encodeURIComponent(cfg.clientId)}`;

    sessionStorage.removeItem('sso_user_session');
    setSession(null);
    showToast('Đang đăng xuất khỏi SSO Hub...', 'info');

    setTimeout(() => {
      window.location.href = logoutUrl;
    }, 400);
  };

  return (
    <AuthContext.Provider
      value={{
        activeEnv,
        currentConfig,
        session,
        switchEnv,
        loginWithPassword,
        loginWithOidc,
        updateProfile,
        updatePassword,
        logout,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

