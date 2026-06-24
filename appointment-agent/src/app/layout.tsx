import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Appointment Agent | Stanford DDL",
  description: "An AI-powered appointment scheduling agent that simulates different personality profiles for the Stanford Deliberative Democracy Lab research project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
