import Image from "next/image";
import Mission from "./mission";

export default function WelcomeHeader() {
    return (
            <div className="flex flex-wrap items-center justify-center border-b-2 border-yellow-400 md:flex-nowrap">
                <div className="flex flex-wrap text-center justify-center items-center p-4 border-b-2 md:border-0 border-yellow-400 lg:text-2xl md:">
                    <h1 className="md:text-yellow-400">Welcome to the home of Ethan Cantrell&apos;s Musical Monsters</h1>
                    <div className="hidden md:flex">
                        <Mission />
                    </div>
                </div>
                <div className="p-2 flex">
                    <Image className="flex"  src="/mm2.png" alt="Musical Monsters: Support Local Music" width={2000} height={2000}/>
                </div>
            </div>
    )
}