import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Root to Nahid | Master Mathematics",
  description: "A minimal and clean platform designed to help you excel in your math journey.",
};

import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased transition-colors duration-300 flex flex-col min-h-screen`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
