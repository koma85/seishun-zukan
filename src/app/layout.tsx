import type { Metadata } from "next";
import "./globals.css";
import { ZukanProvider } from "@/context/ZukanContext";
import Link from "next/link";

export const metadata: Metadata = {
  title: "青春モンスター図鑑 FUKUOKA",
  description: "福岡の街やランドマークを「青春生物」として解釈・可視化するWebサービス。あなたは「青春研究員」として街の生態を観察し、図鑑を集めながら福岡の魅力を発見する。",
  keywords: ["福岡", "青春", "図鑑", "モンスター", "オープンデータ"],
  openGraph: {
    title: "青春モンスター図鑑 FUKUOKA",
    description: "福岡の街を青春生物として解釈する図鑑サービス",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <ZukanProvider>
          {/* Header */}
          <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-orange-100">
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl">🔬</span>
                <span className="font-bold text-navy text-sm leading-tight">
                  青春モンスター図鑑
                  <span className="text-coral text-xs block font-normal">FUKUOKA</span>
                </span>
              </Link>
              <nav className="flex items-center gap-4">
                <Link
                  href="/zukan"
                  className="text-sm text-navy hover:text-coral transition-colors font-medium"
                >
                  図鑑
                </Link>
                <Link
                  href="/discover"
                  className="text-sm text-navy hover:text-coral transition-colors font-medium"
                >
                  探索
                </Link>
                <Link
                  href="/diagnosis"
                  className="text-sm bg-coral text-white px-3 py-1.5 rounded-full hover:bg-coral/80 transition-colors font-medium"
                >
                  診断
                </Link>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-orange-100 py-6 text-center space-y-2">
            <div className="flex justify-center gap-5 text-xs text-gray-400">
              <Link href="/howto"     className="hover:text-coral transition-colors">遊び方</Link>
              <Link href="/zukan"     className="hover:text-coral transition-colors">図鑑</Link>
              <Link href="/discover"  className="hover:text-coral transition-colors">探索</Link>
              <Link href="/diagnosis" className="hover:text-coral transition-colors">診断</Link>
            </div>
            <p className="text-xs text-gray-400">
              © 2026 青春モンスター図鑑 FUKUOKA
              <br />
              <span className="text-gray-300">
                福岡市オープンデータを活用した非公式エンタメサービスです
              </span>
            </p>
          </footer>
        </ZukanProvider>
      </body>
    </html>
  );
}
