import { Metal_Mania } from "next/font/google";
import EventCard from "../components/event-card";
import { client } from "@/sanity/client";
import { SanityEvent } from "@/types/sanity";

const metal = Metal_Mania({
  subsets: ['latin'],
  weight: ['400'], 
})

const EVENTS_LIST_QUERY = `*[
  _type == "event"
  && !(_id in path("drafts.**"))
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

export default async function EventsPage() {
  const events = await client.fetch<SanityEvent[]>(EVENTS_LIST_QUERY, {}, options);
  
  return (
    <section id="events" className="flex flex-col justify-center text-center items-center py-4 border-b-2 max-w-7xl mx-auto">
      <h1 className={`${metal.className} text-4xl pb-4`}>UPCOMING EVENTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {events.length === 0 ? (
          <p className="text-gray-400 col-span-full">No upcoming events.</p>
        ) : (
          events.map((event) => (
            <div key={event._id}>
              <EventCard event={event} />
            </div>
          ))
        )}
      </div>      
    </section>
  )
}