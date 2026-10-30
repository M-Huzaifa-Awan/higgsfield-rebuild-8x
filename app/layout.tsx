import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Framefield — Creative AI Studio",
  description: "A polished, honest demo of an AI image and video creation workflow.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
