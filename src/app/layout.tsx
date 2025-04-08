// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

import ReduxProvider from "../components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mon Portfolio",
  description: "Portfolio développé avec Next.js, Redux et Bootstrap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="d-flex flex-column min-vh-100">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
      <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-HoA1mPnEVN9grlm6pW96jGl38uqcPZCtZQEb+Pb94gD9aB9yBN/jX+RtE8AjCh2Z"
      crossOrigin="anonymous"
    ></script>
    </html>
  );
}
