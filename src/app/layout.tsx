import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Alegreya, Belleza } from 'next/font/google';

const alegreya = Alegreya({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

const belleza = Belleza({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EstateFlow',
  description: 'Um sistema inteligente de gestão de viagens.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", alegreya.variable, belleza.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
