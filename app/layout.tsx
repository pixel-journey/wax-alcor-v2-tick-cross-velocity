import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Whole ticks between two prices',
  description: '100 to 250 at a tick of 50 is 3 up. 100 to 140 is 0 ticks and still up. Not a velocity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
