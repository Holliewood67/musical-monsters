import { PortableText } from "next-sanity";
import { Irish_Grover } from "next/font/google";


const altFont = Irish_Grover({
    subsets: ['latin'],
    weight: ['400'], 
})


export default function EPKBio(
    props: {
        monster: any,
    }
){

    return(
        <div className="text-center justify-center text-xl border-b-2 border-yellow-400 leading-relaxed p-3">
            <h1 className="text-4xl">{props.monster.name}</h1>
            <div className={`${altFont.className} text-2xl justify-center m-auto max-w-screen-lg`}>
                <PortableText value={props.monster.bioText}/>
            </div>
        </div>
    )
}