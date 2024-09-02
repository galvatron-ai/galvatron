import { NavMenu } from "@galvatron/ui/components/nav-menu";
import "@galvatron/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Galvatron Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex">
            <NavMenu />
            <main className="flex-grow p-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
