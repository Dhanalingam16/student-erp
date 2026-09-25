import type { Metadata } from 'next';
import './globals.css';
import { ERPStoreProvider } from '@/lib/store';
import { RoleSwitcherBar } from '@/components/common/RoleSwitcherBar';

export const metadata: Metadata = {
  title: 'Vidya Mandir School ERP — Enterprise Education Management',
  description: 'Production-grade enterprise school management platform for Admin, Teachers, Parents, and Students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <ERPStoreProvider>
          <RoleSwitcherBar />
          <div className="flex-1 flex flex-col">{children}</div>
        </ERPStoreProvider>
      </body>
    </html>
  );
}
