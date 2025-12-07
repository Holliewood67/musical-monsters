import { SanityMonster } from "@/types/sanity";
import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useMemo } from 'react';

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface MonsterCardProps {
  monster: SanityMonster;
}

export default function MonsterCard({ monster }: MonsterCardProps) {
  // Select a random image from the images array
  const randomImage = useMemo(() => {
    if (monster.images && monster.images.length > 0) {
      const randomIndex = Math.floor(Math.random() * monster.images.length);
      return monster.images[randomIndex];
    }
    return null;
  }, [monster.images]);

  let imageUrl = null;
  if (randomImage) {
    try {
      imageUrl = urlFor(randomImage).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
    }
  }

  return (
    <Link href={`/epk/${monster.slug.current}`}>
      <div className="rounded-3xl border-2 border-yellow-400/50 max-w-sm">
        <div>
          {imageUrl ? (
            <Image 
              className="rounded-t-3xl" 
              src={imageUrl}
              alt={monster.name}
              width={800} 
              height={1000} 
            />
          ) : (
            <div className="w-full h-64 bg-gray-800 rounded-t-3xl flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <h1 className="flex justify-center text-2xl w-full bg-yellow-400 rounded-b-xl text-black drop-shadow-lg">
            {monster.name}
          </h1>
        </div>
      </div>
    </Link>
  )
}