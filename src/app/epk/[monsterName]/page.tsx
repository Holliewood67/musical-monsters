import EPKBio from "@/app/components/epk-bio"
import monsterList from "@/app/components/monster-list"
import Releases from "@/app/components/spotify-releases"
import { Metadata, ResolvingMetadata } from "next"
import SocialMedia from "@/app/components/social-media"

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
      description: `${monster?.bioText[0]}`,
      openGraph: {
        title: `${monster?.name} - Musical Monsters`,
        description: ``,
        url: `https://ethancantrell.com/epk/${monster?.urlName}`,
        siteName: 'Musical Monsters',
        images: [
            {
              url: `https://www.ethancantrell.com/epkpics/${monster?.pics[0]}.png`, // Must be an absolute URL
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
        <div>
            <EPKBio monster={monster} />
            {monster?.spotifyUrl ? <Releases monster={monster} /> : <></>}
            <SocialMedia monster={monster} />
            
        </div>
    )
}