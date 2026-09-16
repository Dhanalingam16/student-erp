'use client';

import React, { useState } from 'react';
import { GlobalHeader } from './GlobalHeader';
import { GlobalSidebar } from './GlobalSidebar';
import { GlobalSearchModal } from './GlobalSearchModal';
import { usePathname } from 'next/navigation';

export interface GlobalAppShellProps {
  children: React.ReactNode;
}

export const GlobalAppShell: React.FC<GlobalAppShellProps> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Exclude shell on landing page, login page, onboarding, and dedicated mobile viewports
  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/onboarding' || pathname.startsWith('/parent-mobile') || pathname.startsWith('/student-mobile');

  if (isPublicPage) {
    return <main className="min-h-screen bg-slate-900">{children}</main>;
  }

  // Format breadcrumb path
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <GlobalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <GlobalHeader onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Breadcrumbs Bar */}
        <div className="bg-white border-b border-slate-200 px-8 py-2.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-slate-400">SchoolOS</span>
            {pathSegments.map((seg, i) => (
              <React.Fragment key={i}>
                <span className="text-slate-300">/</span>
                <span className={`capitalize ${i === pathSegments.length - 1 ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                  {seg.replace('-', ' ')}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Academic Term 2026-27 • New Delhi Campus
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
