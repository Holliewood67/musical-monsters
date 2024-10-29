import Image from "next/image"
import Link from "next/link"

export default function MonsterCard(
    props: {
        monsterName: string,
        imgPath: string,
        urlPath: string,
    }) {
    return(
        <Link href={`/epk/${props.urlPath}`}>
            <div className="monster-card  rounded my-5 hover:scale-110">
                <div className="monster-card-img">
                    <Image className="rounded-3xl" src={`/epkpics/${props.imgPath}`} alt="Ethan Cantrell" width={800} height={1000} />
                </div>
                <div className=" text-white flex items-center justify-center"><h1 className="flex justify-center w-[80%] text-base bg-yellow-400 my-2  border-2 border-black border-rounded rounded-full text-black">{props.monsterName}</h1></div>
            </div>
        </Link>
    )
}