import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finovo — Fintech Dashboard",
  description: "Real-time financial analytics dashboard built with the UI/UX Pro Max design system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
