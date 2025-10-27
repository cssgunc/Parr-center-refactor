import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import Navbar from '../components/Navbar';
=======
import Navbar from "@/components/Navbar";
>>>>>>> acb25e6 (separated modules page into app folder)

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parr Center Learning Platform",
  description: "A learning management system for the Parr Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
<<<<<<< HEAD
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
=======
        <Navbar />
        {children}
>>>>>>> acb25e6 (separated modules page into app folder)
      </body>
    </html>
  );
}
