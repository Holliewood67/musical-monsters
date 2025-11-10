import Hero from "./components/hero";
import Monsters from "./components/monsters";
import Services from "./components/services";
import News from "./components/news";
import Events from "./components/events";

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "monster"
  && defined(slug.current)
]|order(name)[0...12]{_id, name, slug}`;

const options = { next: { revalidate: 30 } };


export default async function Home() {
  const monsters = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <>
      <Hero />
      <Services />
      <Events />
      <Monsters monsters={monsters} />
    </>
  );
}
