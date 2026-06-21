import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meridian — Banking that moves at the speed of your business",
  description:
    "Meridian brings your accounts, payments, and analytics into one real-time dashboard. Move money, automate payouts, and close the books in minutes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
