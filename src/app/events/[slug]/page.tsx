import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { Irish_Grover } from "next/font/google";
import { client } from "@/sanity/client";
import { SanityEvent } from "@/types/sanity";
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableText } from "next-sanity";
import MonsterCard from "@/app/components/monster-card";

const altFont = Irish_Grover({
  subsets: ['latin'],
  weight: ['400'], 
});

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0]{
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
  description,
  featuredMonsters[]->{
    _id,
    name,
    slug,
    images[]{
      asset->{
        _id,
        url
      }
    }
  }
}`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const event = await client.fetch<SanityEvent>(EVENT_QUERY, params, options);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "This event could not be found."
    };
  }

  const imageUrl = event.image?.asset?.url 
    ? urlFor(event.image)?.url()
    : "/mm2.png";

  return {
    title: `${event.title} | Musical Monsters`,
    description: event.presenter || "Catch the latest local music events with Musical Monsters.",
    openGraph: {
      title: `${event.title} | Musical Monsters`,
      description: event.presenter || "Live local music and community events hosted by Musical Monsters.",
      url: `https://www.musicalmonsterstulsa.com/events/${event.slug.current}`,
      siteName: "Musical Monsters",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 800,
              height: 600,
            },
          ]
        : [],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const event = await client.fetch<SanityEvent>(EVENT_QUERY, params, options);

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <h1 className="text-red-400 text-2xl font-bold">Event not found</h1>
      </div>
    );
  }

  const startDate = new Date(event.start).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Chicago",
  });

  const imageUrl = event.image?.asset?.url 
    ? urlFor(event.image)?.url()
    : "/mm2.png";
  
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-6xl mx-auto text-gray-100 px-4 py-8 md:py-12">
      <div className="text-center mb-8 w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
          {event.title}
        </h1>
        <p className="text-yellow-400 text-lg md:text-xl font-semibold mb-2">
          {startDate}
        </p>
        {event.presenter && (
          <p className="text-gray-300 text-base md:text-lg">
            Presented By {event.presenter}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
        {imageUrl && (
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src={imageUrl}
              alt={event.title}
              width={800}
              height={800}
              className="rounded-lg shadow-2xl w-full max-w-md h-auto"
              priority
            />
          </div>
        )}

        {event.description && (
          <div className="w-full lg:w-1/2">
            <div className={`${altFont.className} text-lg md:text-xl leading-relaxed`}>
              <PortableText value={event.description} />
            </div>
          </div>
        )}
      </div>

      {event.featuredMonsters && event.featuredMonsters.length > 0 && (
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold mb-4">Hosts & Artists</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {event.featuredMonsters.map((monster) => (
                <div key={monster._id} className="keen-slider__slide">
                  <MonsterCard monster={monster} />
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}