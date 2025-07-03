import { Jolly_Lodger, Irish_Grover } from "next/font/google";

const jolly = Jolly_Lodger({
  subsets: ["latin"],
  weight: ["400"],
});

const altFont = Irish_Grover({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 px-6 border-b-2 border-yellow-400 overflow-hidden lg:min-h-screen">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Content Layer */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-3xl md:text-5xl text-yellow-400 font-bold mb-4">
          Welcome to the home of Ethan Cantrell&apos;s Musical Monsters
        </h1>

        <div className={`${altFont.className} text-lg md:text-2xl text-gray-100`}>
          <p className="mb-4">
            Our mission is to provide independent musicians with the tools to take the next step in their musical journey at a reasonable cost.
          </p>
          <p className="text-yellow-400">
            We aim to remove the financial barrier to creative success for indie artists in order to help make establishing a career in music accessible to everyone.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-8">
          <a
            href="/#monster-section"
            className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow hover:text-yellow-400 hover:bg-black border-2 border-yellow-400 transition ease-in-out duration-300"
          >
            Meet the Monsters →
          </a>
        </div>
      </div>
    </section>
  );
}
