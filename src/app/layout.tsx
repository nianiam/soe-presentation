import "./globals.css";

import { CoralProvider } from "@/components/Providers/CoralProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CoralProvider>{children}</CoralProvider>
      </body>
    </html>
  );
}
