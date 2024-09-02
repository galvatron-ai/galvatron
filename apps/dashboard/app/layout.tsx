import type { Metadata } from "next";
import "@galvatron/ui/globals.css";

export const metadata: Metadata = {
  title: "Galvatron Dashboard",
  description: "More than meets the eye",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  );
}
