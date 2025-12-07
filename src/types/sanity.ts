import { PortableTextBlock } from '@portabletext/types';

export interface SanityEvent {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  start: string;
  presenter?: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    }
  };
  description?: PortableTextBlock[];
  featuredMonsters?: SanityMonster[];
}

export interface SanityMonster {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  images: Array<{
    asset?: {
      _id: string;
      url: string;
    }
  }>;
  ogPicture: {
    asset?: {
      _id: string;
      url: string;
    }
  };
  bioText?: PortableTextBlock[];
  spotifyUrl?: string;
  ytVid?: string;
  fbLink?: string;
  igLink?: string;
  ttLink?: string;
  ytLink?: string;
  bcLink?: string;
}