"use client";
import "./globals.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { dmSans } from "./theme/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
