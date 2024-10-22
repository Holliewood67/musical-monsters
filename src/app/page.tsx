import WelcomeHeader from "./components/welcome-header";
import Monsters from "./components/monsters";
import Mission from "./components/mission";
import Services from "./components/services";
import News from "./components/news";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethan Cantrell's Musical Monsters",
  description: "Welcome to the home of Ethan Cantrell's Musical Monsters. Our Mission is to provide independent musicians with the tools to take the next step in their musical journey at a reasonable cost.",
  openGraph: {
    title: `Ethan Cantrell's Musical Monsters`,
    description: "Welcome to the home of Ethan Cantrell's Musical Monsters. Our Mission is to provide independent musicians with the tools to take the next step in their musical journey at a reasonable cost.",
    url: `https://ethancantrell.com/`,
    siteName: 'Musical Monsters',
    images: 
        {
          url: 'https://ibb.co/JcPQpzz', // Must be an absolute URL
          width: 800,
          height: 600,
        },
  },

}

export default function Home() {
  return (
    <>
      <WelcomeHeader />
      {/* <News /> */}
      <div className="md:hidden">
        <Mission />
      </div>
      <Services />
      <Monsters />
    </>
  );
}
