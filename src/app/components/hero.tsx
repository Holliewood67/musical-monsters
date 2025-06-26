import Image from "next/image";
import { Jolly_Lodger, Irish_Grover } from "next/font/google";


const jolly = Jolly_Lodger({
    subsets: ['latin'],
    weight: ['400'], 
})
const altFont = Irish_Grover({
    subsets: ['latin'],
    weight: ['400'], 
})

export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between border-b-2 border-yellow-400 py-6 gap-6">
      <div className="flex-1 text-center  md:text-left border-t-2 border-yellow-400 md:border-0 p-6">
        <h1 className="text-2xl md:text-4xl text-center  text-yellow-400">
          Welcome to the home of Ethan Cantrell&apos;s Musical Monsters
        </h1>
        <div className={`${altFont.className} text-center text-lg md:text-2xl justify-center p-2`}>
            <h2 className="p-2">Our Mission is to provide independent musicians with the tools to take the next step in their musical journey at a reasonable cost.</h2>
            <h2 className="p-2 text-yellow-400"> We aim to remove the financial barrier to creative success for indie artists in order to help make establishing a career in music accessable to everyone.</h2>
        </div>

      </div>

      <div className="flex-shrink-0">
        <Image
          src="/mm2.png"
          alt="Musical Monsters: Support Local Music"
          width={300}
          height={300}
          className="px-4 "
          priority
        />
      </div>
    </section>
  );
}
