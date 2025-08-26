
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Alegreya, Belleza } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const fontBody = Alegreya({ 
  subsets: ['latin'], 
  variable: '--font-body',
});

const fontHeadline = Belleza({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: '400'
});

export const metadata: Metadata = {
  title: 'NoMeioDoMundo',
  description: 'Sistema de gestão para agências de viagem.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background antialiased", fontBody.variable, fontHeadline.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
