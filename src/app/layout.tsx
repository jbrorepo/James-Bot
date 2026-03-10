import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'James Bell | Security Engineer 3 & AI Enthusiast',
  description: 'Portfolio and AI Assistant for James Bell, a Concierge Security Engineer 3 and Team Lead at Arctic Wolf.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={[inter.variable, outfit.variable, "antialiased min-h-screen font-sans"].join(" ")}>
        <div className="bg-glow"></div>
        {children}
      </body>
    </html>
  );
}
