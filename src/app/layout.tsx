import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' });


export const metadata: Metadata = {
  title: 'TravelFlow',
  description: 'Um sistema inteligente de gestão de viagens.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", openSans.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
