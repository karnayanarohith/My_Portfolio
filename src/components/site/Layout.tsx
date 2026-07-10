import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-foreground relative overflow-hidden">
      <div className="fixed inset-0 spotlight pointer-events-none opacity-100 z-0" />
      <div className="relative z-10">
        <CustomCursor />
        <Nav />
        <main className="pt-16 animate-fade-up">{children}</main>
        <Footer />
      </div>
    </div>
  );
}