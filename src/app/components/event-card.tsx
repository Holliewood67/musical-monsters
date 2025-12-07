import Image from "next/image";
import Link from "next/link";
import { Irish_Grover } from "next/font/google";
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityEvent } from "@/types/sanity";
import { PortableTextBlock } from '@portabletext/types';

const altFont = Irish_Grover({
    subsets: ['latin'],
    weight: ['400'], 
})

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface EventProps {
  event: SanityEvent;
}

function getTruncatedDescription(portableText: PortableTextBlock[] | undefined, maxLength: number = 100): string {
  if (!portableText || !Array.isArray(portableText)) return '';
  
  let text = '';
  for (const block of portableText) {
    if (block._type === 'block' && 'children' in block) {
      for (const child of block.children) {
        if ('text' in child && child.text) {
          text += child.text + ' ';
        }
      }
    }
  }
  
  text = text.trim();
  
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  
  return text;
}

export default function EventCard({ event }: EventProps) {
  // Generate image URL if image exists
  let imageUrl = null;
  if (event.image) {
    try {
      imageUrl = urlFor(event.image).width(600).height(600).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
    }
  }

  const startDate = new Date(event.start).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const shortDescription = getTruncatedDescription(event.description, 100);

  return (
    <Link 
      href={`/events/${event.slug.current}`}
      className="bg-gray-900/25 h-full border border-yellow-500 rounded-xl shadow-md overflow-hidden flex flex-col hover:scale-105 transition ease-out duration-300"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={event.title || "Event image"}
          width={600}
          height={600}
          className="w-full max-h-64 object-cover bg-black"
        />
      ) : (
        <Image
          src="/mm2.png"
          alt={event.title || "Musical Monsters"}
          width={600}
          height={600}
          className="w-full max-h-64 object-cover bg-black"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-yellow-400 mb-1">
          {event.title}
        </h2>
        {event.presenter && (
          <p className={`${altFont.className} text-gray-300 mb-2`}>
            Presented by {event.presenter}
          </p>
        )}
        <p className="text-sm text-gray-400 mb-1">{startDate}</p>
        {shortDescription && (
          <p className={`${altFont.className} text-gray-200 text-sm mb-2 flex-grow`}>
            {shortDescription}
          </p>
        )}
        <p
          className="mt-auto text-yellow-400 text-sm font-semibold hover:underline rounded-xl bg-black mx-auto py-1 px-4"
        >
          Read more →
        </p>
      </div>
    </Link>
  )
}