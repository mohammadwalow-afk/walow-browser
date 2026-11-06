import React, { useEffect, useState } from 'react';
import { Wifi, BatteryFull, Signal, EyeOff } from 'lucide-react';

export const AndroidStatusBar: React.FC<{ isIncognito?: boolean }> = ({ isIncognito }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`w-full h-7 shrink-0 flex items-center justify-between px-4 text-[11px] text-white ${isIncognito ? 'bg-slate-800' : 'bg-black/60'}`}>
      <span dir="ltr" className="font-semibold">{now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
      <div className="flex items-center gap-1.5">
        {isIncognito && <EyeOff className="w-3.5 h-3.5 text-purple-300" />}
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <BatteryFull className="w-4 h-4" />
      </div>
    </div>
  );
};
