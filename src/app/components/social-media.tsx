import Image from "next/image";
import Link from "next/link";

export default function SocialMedia(
    props: {
        monster: any,
    }
){
    return(
        <div className="border-t-2 border-yellow-400">
            <div className="text-center text-2xl p-4">
                <h1 >SOCIAL MEDIA</h1>
            </div>
            <div className="flex items-center justify-center p-4 gap-8 md:gap-16 text-center">
                    {props.monster.fbLink ? <a target="_blank"  href={props.monster.fbLink}><Image className="flex justify-center m-auto" src={`/logos/facebook.png`} alt="Facebook" width={100} height={100} /></a> : <></>}
                    {props.monster.igLink ? <a target="_blank" href={props.monster.igLink}><Image src={`/logos/instagram.png`} alt="Facebook" width={100} height={100} /></a> : <></>}
                    {props.monster.ttLink ? <a target="_blank" href={props.monster.ttLink}><Image src={`/logos/tik-tok.png`} alt="Facebook" width={100} height={100} /></a> : <></>}
                    {props.monster.ytLink ? <a target="_blank" href={props.monster.ytLink}><Image src={`/logos/youtube.png`} alt="Facebook" width={100} height={100} /></a> : <></>}
            </div>
        </div>
    )
}