import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Send, Image as ImageIcon } from 'lucide-react';
import { Modal, askAI, inputCls, btnCls } from './Modal';
import { Wallpaper } from '../data/wallpapers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSetAsWallpaper: (wp: Wallpaper) => void;
  onInspectImageInLens: (img: string) => void;
}

type Msg = { role: 'user' | 'model'; text: string };

export const AIChatModal: React.FC<Props> = ({ isOpen, onClose, onSetAsWallpaper }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: 'user' as const, text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const reply = await askAI(next);
      setMessages([...next, { role: 'model', text: reply }]);
    } catch (e) {
      setMessages([...next, { role: 'model', text: `⚠️ ${(e as Error).message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const makeWallpaper = async () => {
    const theme = input.trim() || 'هادئة وليلية';
    setLoading(true);
    try {
      const raw = await askAI(
        [{ role: 'user', text: theme }],
        'صمّم خلفية متدرجة الألوان حسب وصف المستخدم. أعد JSON فقط بالشكل {"name":"اسم قصير بالعربية","colors":["#hex","#hex","#hex"]} دون أي نص آخر.'
      );
      const json = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
      const colors: string[] = (json.colors || []).filter((c: string) => /^#[0-9a-f]{3,8}$/i.test(c)).slice(0, 4);
      if (colors.length < 2) throw new Error('bad colors');
      const wp: Wallpaper = { id: `ai-${Date.now()}`, name: String(json.name || 'خلفية AI').slice(0, 30), cssBackground: `linear-gradient(160deg, ${colors.join(', ')})` };
      onSetAsWallpaper(wp);
      setMessages((m) => [...m, { role: 'user', text: `🎨 صمم خلفية: ${theme}` }, { role: 'model', text: `تم تطبيق الخلفية «${wp.name}» ✨` }]);
      setInput('');
    } catch {
      setMessages((m) => [...m, { role: 'model', text: '⚠️ لم أتمكن من تصميم الخلفية، جرّب وصفاً آخر.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="مساعد والو الذكي" icon={<Sparkles className="w-5 h-5 text-purple-400" />}>
      <div className="flex flex-col gap-3 min-h-[240px]">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 py-6 space-y-2">
            <p>اسألني أي شيء، أو صف خلفية لأصممها لك.</p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {['لخّص لي أخبار التقنية', 'اكتب رسالة شكر', 'اشرح الذكاء الاصطناعي ببساطة'].map((s) => (
                <button key={s} onClick={() => send(s)} className="px-3 py-1.5 rounded-full bg-slate-800 text-xs text-slate-200">{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 whitespace-pre-wrap leading-relaxed ${m.role === 'user' ? 'self-start bg-purple-600 text-white' : 'self-end bg-slate-800 text-slate-100'}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="self-end bg-slate-800 rounded-2xl px-3.5 py-2.5 animate-pulse">…</div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="sticky bottom-0 flex gap-2 pt-3 bg-[#11162a]">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="اكتب رسالتك…" className={inputCls} />
        <button type="button" onClick={makeWallpaper} disabled={loading} className="px-3 rounded-xl bg-slate-800 text-slate-200 disabled:opacity-50" title="صمم خلفية"><ImageIcon className="w-4 h-4" /></button>
        <button type="submit" disabled={loading || !input.trim()} className={btnCls}><Send className="w-4 h-4" /></button>
      </form>
    </Modal>
  );
};
