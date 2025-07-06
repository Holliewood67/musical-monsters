import Image from "next/image"
import { Irish_Grover } from "next/font/google"

const altFont = Irish_Grover({
    subsets: ['latin'],
    weight: ['400'], 
})


export default function ServiceCard(
    props: {
        icon: string,
        title: string,
        content: string
    }
) {
    return(
        <div className="bg-yellow-400 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out service-card">
            <div  className="flex justify-center">
                <Image 
                    width={100} 
                    height={100} 
                    src={`./logos/${props.icon}.svg`} 
                    alt={props.title} 
                    className="drop-shadow-lg spinner"
                />
            </div>
            <div className="text-black mt-4">
                <h2 className="text-2xl font-bold border-b border-black pb-2 mb-2">{props.title}</h2>
                <p className={`${altFont.className} text-left leading-relaxed text-lg`}>{props.content}</p>
            </div>
        </div>

    )
}