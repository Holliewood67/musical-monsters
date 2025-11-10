import EPKBio from "@/app/components/epk-bio"
import Releases from "@/app/components/spotify-releases"
import { Metadata, ResolvingMetadata } from "next"
import SocialMedia from "@/app/components/social-media"
import YoutubeEmbed from "@/app/components/youtube-embed"
import EPKEvents from "@/app/components/epk-events"
import EPKCarousel from "@/app/components/epk-carousel"
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { toPlainText } from "next-sanity"

const MONSTER_QUERY = `*[_type == "monster" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };



type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
   
  export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const monster = await client.fetch<SanityDocument>(MONSTER_QUERY, params, options);
    return {
      title: `${monster?.name} - Musical Monsters`,
      description: `${monster?.name} ${toPlainText(monster.bioText)}`,
      openGraph: {
        title: `${monster?.name} - Musical Monsters`,
        description: `${monster?.name} ${toPlainText(monster.bioText)}`,
        url: `https://musicalmonsterstulsa.com/epk/${monster?.slug.current}`,
        siteName: 'Musical Monsters',
        images: [
          {
            url: `https://www.musicalmonsterstulsa.com/epkpics/${monster?.slug.current}/${monster?.slug.current}-og.jpg`, // Must be an absolute URL
            width: 800,
            height: 600,
          },
        ]
      },
    }
  }

export default async function EPK({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

    const monster = await client.fetch<SanityDocument>(MONSTER_QUERY, await params, options);

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