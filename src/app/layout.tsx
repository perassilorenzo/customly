import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Configuratore",
  description: "Custom clothing configurator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <header className="border-b border-border bg-surface">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-primary">
              Configuratore
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="text-secondary hover:text-text">
                Store
              </Link>
              <Link href="/admin" className="text-secondary hover:text-text">
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
