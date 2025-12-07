import EPKBio from "@/app/components/epk-bio"
import Releases from "@/app/components/spotify-releases"
import { Metadata, ResolvingMetadata } from "next"
import SocialMedia from "@/app/components/social-media"
import YoutubeEmbed from "@/app/components/youtube-embed"
import EPKEvents from "@/app/components/epk-events"
import EPKCarousel from "@/app/components/epk-carousel"
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { toPlainText } from "next-sanity"
import { SanityMonster, SanityEvent } from "@/types/sanity"

const MONSTER_QUERY = `*[_type == "monster" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  images[]{
    asset->{
      _id,
      url
    }
  },
  ogPicture{
    asset->{
      _id,
      url
    }
  },
  bioText,
  spotifyUrl,
  ytVid,
  fbLink,
  igLink,
  ttLink,
  ytLink,
  bcLink
}`;

const EVENTS_QUERY = `*[
  _type == "event" 
  && references($monsterId)
] | order(start asc) {
  _id,
  title,
  slug,
  start,
  presenter,
  image {
    asset-> {
      _id,
      url
    }
  },
  description
}`;

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
  const monster = await client.fetch<SanityMonster>(MONSTER_QUERY, params, options);
  
  const ogImageUrl = monster?.ogPicture 
    ? urlFor(monster.ogPicture)?.width(1200).height(630).url()
    : `https://www.musicalmonsterstulsa.com/epkpics/${monster?.slug.current}/${monster?.slug.current}-og.jpg`;

  const bioDescription = monster?.bioText ? toPlainText(monster.bioText) : '';

  return {
    title: `${monster?.name} - Musical Monsters`,
    description: `${monster?.name} ${bioDescription}`,
    openGraph: {
      title: `${monster?.name} - Musical Monsters`,
      description: `${monster?.name} ${bioDescription}`,
      url: `https://musicalmonsterstulsa.com/epk/${monster?.slug.current}`,
      siteName: 'Musical Monsters',
      images: [
        {
          url: ogImageUrl || '',
          width: 1200,
          height: 630,
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
  const resolvedParams = await params;
  const monster = await client.fetch<SanityMonster>(MONSTER_QUERY, resolvedParams, options);
  
  if (!monster) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl">Monster not found</h1>
      </div>
    );
  }

  // Fetch events for this monster on the server
  const events = await client.fetch<SanityEvent[]>(EVENTS_QUERY, {
    monsterId: monster._id
  }, options);

  return( 
    <div className="text-center">
      <EPKCarousel monster={monster}/>
      <EPKBio monster={monster} />
      <EPKEvents monster={monster} events={events} />
      {monster?.ytVid ? <YoutubeEmbed monster={monster} /> : null}
      {monster?.spotifyUrl ? <Releases monster={monster} /> : null}
      <SocialMedia monster={monster} />
    </div>
  )
}