import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Cpu, ShieldCheck } from 'lucide-react';

export default function SessionInspector() {
  const { session, currentConfig } = useAuth();
  const profile = session?.profile || {};
  const tokens = session?.tokens || {};

  const issuedAt = profile.iat
    ? new Date(profile.iat * 1000).toLocaleString('vi-VN')
    : 'Vừa xong';

  const expiresAt = profile.exp
    ? new Date(profile.exp * 1000).toLocaleString('vi-VN')
    : '30 phút sau khi cấp';

  return (
    <div className="max-w-4xl space-y-6">
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <Cpu className="w-4 h-4 text-brand-400" />
          Thông Số Kỹ Thuật Phiên Làm Việc (OIDC Claims)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[11px] text-slate-400">Issuer (Nhà cung cấp danh tính)</div>
            <div className="text-xs font-mono text-brand-300 mt-1 truncate" title={profile.iss || currentConfig.baseUrl}>
              {profile.iss || `${currentConfig.baseUrl}/realms/${currentConfig.realm}`}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[11px] text-slate-400">Client ID Sử Dụng</div>
            <div className="text-xs font-mono text-white mt-1">
              {tokens.used_client_id || currentConfig.clientId}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[11px] text-slate-400">Thời Điểm Cấp Token</div>
            <div className="text-xs font-mono text-white mt-1">{issuedAt}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[11px] text-slate-400">Hết Hạn (Exp)</div>
            <div className="text-xs font-mono text-emerald-400 mt-1">{expiresAt}</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Dữ Liệu Token Claims Đã Giải Mã (Decoded Payload):
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto custom-scrollbar max-h-80 leading-relaxed">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

