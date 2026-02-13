import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Search - Amazon Clone",
  description: "Search and browse products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
