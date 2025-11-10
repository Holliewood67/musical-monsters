import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "monster"
  && defined(slug.current)
]|order(name)[0...12]{_id, name, slug}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const monsters = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Monsters</h1>
      <ul className="flex flex-col gap-y-4">
        {monsters.map((monster) => (
          <li className="hover:underline" key={monster._id}>
            <Link href={`/${monster.slug.current}`}>
              <h2 className="text-xl font-semibold">{monster.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}