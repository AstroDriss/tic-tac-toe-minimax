import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameProvider } from "./context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description:
    "enjoy with both single and multiplayer in this challenge that was built by douiri idriss",
  authors: [{ name: "douiri idriss", url: "https://douiri.org" }],
  icons: "/favicon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <GameProvider>
        <body className={`uppercase h-full ${inter.className} bg-navy-900`}>
          {children}
        </body>
      </GameProvider>
    </html>
  );
}
