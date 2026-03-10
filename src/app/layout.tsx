import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'James Bell - Concierge Security Engineer & AI Innovator',
  description: 'James Bell is a Concierge Security Engineer 3 & Team Lead at Arctic Wolf, specializing in cloud security, customer success, and AI-driven solutions.',
  openGraph: {
    type: 'website',
    title: 'James Bell - Security Engineer & AI Innovator',
    description: 'Leading security teams at Arctic Wolf while pioneering AI solutions. Chat with my AI assistant to learn more.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={[inter.variable, "font-sans antialiased"].join(" ")}>
        {children}
      </body>
    </html>
  );
}
