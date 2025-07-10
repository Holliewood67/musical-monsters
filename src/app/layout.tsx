import Script from "next/script";
import { Inter } from "next/font/google";
import { Metal_Mania } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });
const metal = Metal_Mania({
  subsets: ['latin'],
  weight: ['400'], 
})


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
    <html lang="en" className="scroll-smooth">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-P1GGFV7Y6Q"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-P1GGFV7Y6Q');
  `}
</Script>
      <body className={metal.className}>
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
