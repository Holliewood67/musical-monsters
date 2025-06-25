import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lacquer } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });
const lacquer = Lacquer({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Musical Monsters - Tulsa",
  description: "Welcome to the home of Ethan Cantrell's Musical Monsters. Our Mission is to provide independent musicians with the tools to take the next step in their musical journey at a reasonable cost.",
  siteName: 'Musical Monsters',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: "Ethan Cantrell's Musical Monsters",
    description: "Welcome to the home of Ethan Cantrell's Musical Monsters. Our Mission is to provide independent musicians with the tools to take the next step in their musical journey at a reasonable cost.",
  
    images: [
      {
        url: 'https://www.musicalmonsterstulsa.com/mmog.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ]
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lacquer.className}>
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
