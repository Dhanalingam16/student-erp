import type { Metadata } from 'next';
import './globals.css';
import { GlobalAppShell } from '../components/layout/GlobalAppShell';

export const metadata: Metadata = {
  title: 'SchoolOS — Enterprise School Operating System',
  description: 'Production-quality School ERP Ecosystem across Web and Mobile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalAppShell>{children}</GlobalAppShell>
      </body>
    </html>
  );
}
