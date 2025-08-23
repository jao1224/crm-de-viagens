
import { Toaster } from "@/components/ui/toaster";

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-4">
          <main className="w-full">
            {children}
          </main>
          <Toaster />
      </div>
  );
}
