import Image from "next/image"
import Link from "next/link"

export default function MonsterCard(
    props: {
        monsterName: string,
        imgPath: string,
        urlPath: string,
    }) {

        if (!props.imgPath) {
            return <div className="items-center justify-center">
                        <h1>Loading...</h1>
                    </div>;
          }
    
    return(
        <Link href={`/epk/${props.urlPath}`}>
            <div className="rounded-3xl  border-2 border-yellow-400/50 max-2-sm">
                <div>
                    <Image 
                        className="rounded-t-3xl" 
                        src={`/epkpics/${props.imgPath}`} 
                        alt="Ethan Cantrell" 
                        width={800} 
                        height={1000} 
                    />
                    <h1 className="flex justify-center text-2xl  w-full  bg-yellow-400  rounded-b-xl text-black drop-shadow-lg">{props.monsterName}</h1>
                </div>
            </div>
        </Link>
    )
}