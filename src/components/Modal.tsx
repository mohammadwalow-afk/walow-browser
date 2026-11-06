import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, children }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full sm:max-w-md max-h-[88%] flex flex-col bg-[#11162a] border border-indigo-900/60 rounded-t-3xl sm:rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-indigo-950">
          <div className="flex items-center gap-2 font-bold text-white">
            {icon}
            <span>{title}</span>
          </div>
          <button onClick={onClose} aria-label="إغلاق" className="p-1.5 rounded-full hover:bg-white/10 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 text-sm text-slate-300">{children}</div>
      </div>
    </div>
  );
};

export const inputCls =
  'w-full rounded-xl bg-slate-900 border border-indigo-900/60 px-3 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-purple-500';
export const btnCls =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-blue-600 to-purple-600 px-4 py-2.5 font-bold text-white disabled:opacity-50';
export const ghostBtnCls =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-900/70 px-4 py-2.5 text-slate-200 hover:bg-white/5';

export async function askAI(messages: { role: 'user' | 'model'; text: string }[], task?: string): Promise<string> {
  const res = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, task }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'حدث خطأ');
  return data.text as string;
}
