import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useAuth();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        const borderBg = isSuccess
          ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200'
          : isError
          ? 'bg-red-950/95 border-red-500/50 text-red-200'
          : 'bg-slate-900/95 border-slate-700 text-slate-200';

        const Icon = isSuccess ? CheckCircle2 : isError ? AlertTriangle : Info;

        return (
          <div
            key={toast.id}
            className={`p-4 rounded-xl border shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-medium transition-all pointer-events-auto backdrop-blur-md ${borderBg}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

