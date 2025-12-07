import Hero from "./components/hero";
import Monsters from "./components/monsters";
import Services from "./components/services";
import News from "./components/news";
import Events from "./components/events";
import { SanityEvent, SanityMonster } from "@/types/sanity";
import { client } from "@/sanity/client";

const MONSTERS_QUERY = `*[
  _type == "monster"
  && defined(slug.current)
]|order(name){
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
const EVENTS_QUERY = `*[_type == "event" && dateTime(start) >= dateTime(now())]{
  _id,
  title,
  slug,
  start,
  presenter,
  image,
  description
}|order(start asc)[0...3]`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const monsters = await client.fetch<SanityMonster[]>(MONSTERS_QUERY, {}, options);
  const events = await client.fetch<SanityEvent[]>(EVENTS_QUERY, {}, options);
  
  return (
    <>
      <Hero />
      <Services />
      <Events events={events} />
      <Monsters monsters={monsters} />
    </>
  );
}