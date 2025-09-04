import EPKBio from "@/app/components/epk-bio"
import monsterList from "@/app/components/monster-list"
import Releases from "@/app/components/spotify-releases"
import { Metadata, ResolvingMetadata } from "next"
import SocialMedia from "@/app/components/social-media"
import YoutubeEmbed from "@/app/components/youtube-embed"
import EPKEvents from "@/app/components/epk-events"
import EPKCarousel from "@/app/components/epk-carousel"

type Props = {
    params: { monsterName: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
   
  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {

    // read route params
    const monster = monsterList.monsters.find(i => i.urlName === params.monsterName)
         
    return {
      title: `${monster?.name} - Musical Monsters`,
      description: `${monster?.name} ${monster?.bioText[0]}`,
      openGraph: {
        title: `${monster?.name} - Musical Monsters`,
        description: `${monster?.name} ${monster?.bioText[0]}`,
        url: `https://musicalmonsterstulsa.com/epk/${monster?.urlName}`,
        siteName: 'Musical Monsters',
        images: [
            {
              url: `https://www.musicalmonsterstulsa.com/epkpics/${monster?.ogPic}.jpg`, // Must be an absolute URL
              width: 800,
              height: 600,
            },
        ]
      },
    }
  }

export default function EPK({
    params
}: {
    params: {
        monsterName: string
    }
}) {
    const monster = monsterList.monsters.find(i => i.urlName === params.monsterName)
    return( 
        <div className="text-center">
            <EPKCarousel monster={monster}/>
            <EPKBio monster={monster} />
            <EPKEvents monster={monster} />
            {monster?.ytVid ? <YoutubeEmbed monster={monster} /> : <></> }
            {monster?.spotifyUrl ? <Releases monster={monster} /> : <></>}
            <SocialMedia monster={monster} />
            
        </div>
    )
}