'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { Wifi, Battery, Signal } from 'lucide-react';

export function DeviceFrameWrapper({ children, title }: { children: React.ReactNode; title?: string }) {
  const { deviceFrameEnabled } = useERPStore();

  if (!deviceFrameEnabled) {
    return (
      <div className="w-full min-h-[calc(100vh-41px)] bg-slate-100 flex justify-center">
        <div className="w-full max-w-md bg-white min-h-[calc(100vh-41px)] shadow-md border-x border-slate-200 flex flex-col relative pb-16">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-41px)] bg-slate-900/90 py-8 px-4 flex flex-col items-center justify-center">
      {/* Device Bezel */}
      <div className="w-full max-w-[400px] h-[840px] bg-black rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col relative overflow-hidden">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 mr-2" />
          <div className="w-2 h-2 rounded-full bg-blue-950/60" />
        </div>

        {/* Screen Container */}
        <div className="w-full h-full bg-slate-50 rounded-[34px] overflow-hidden flex flex-col relative">
          {/* iOS Status Bar */}
          <div className="h-10 px-6 pt-3 flex items-center justify-between text-slate-800 text-[11px] font-semibold bg-white border-b border-slate-100 z-30 select-none">
            <span>09:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* App Content */}
          <div className="flex-1 overflow-y-auto pb-16">{children}</div>

          {/* Home indicator bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400 rounded-full z-30" />
        </div>
      </div>
    </div>
  );
}
