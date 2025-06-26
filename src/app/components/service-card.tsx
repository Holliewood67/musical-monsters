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
        <div className="service-card my-2 bg-yellow-500 rounded p-5 md:w-[50%] lg:text-xl">
            <div  className="flex justify-center">
                <Image width={100} height={100} src={`./logos/${props.icon}.svg`} alt={props.title} />
            </div>
            <div className="text-black ">
                <h1 className="text-xl border-t-2 border-black p-2">{props.title}</h1>
                <h3 className={`${altFont.className} border-t-2 border-black py-2 text-start leading-relaxed`}>{props.content}</h3>
            </div>
        </div>

    )
}