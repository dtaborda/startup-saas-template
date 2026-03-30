import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Startup SaaS Template",
  description: "A modern SaaS template with authentication, dashboard, and AI-powered features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen font-sans antialiased`}
      >
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: "bg-card/80 backdrop-blur-md border-white/10 text-card-foreground",
              title: "text-foreground",
              description: "text-muted-foreground",
              actionButton: "bg-primary text-primary-foreground",
              cancelButton: "bg-muted text-muted-foreground",
            },
          }}
        />
      </body>
    </html>
  );
}
