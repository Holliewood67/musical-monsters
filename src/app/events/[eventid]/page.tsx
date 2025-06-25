import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

const googleDriveFix = (url: string) => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

type Props = {
  params: { eventid: string };
};

type Event = {
  id: string;
  htmlLink: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime: string };
  end: { dateTime: string };
  attachments?: { fileUrl: string; title: string }[];
};

// 🧠 Metadata for Facebook OG tags
export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const calendarID = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_CALENDAR_API_KEY;

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${params.eventid}?key=${apiKey}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return {
      title: "Event Not Found",
      description: "This event could not be found on the calendar."
    };
  }

  const event: Event = await res.json();

  const imageUrlFull =
    event.attachments && event.attachments.length > 0
      ? (() => {
          const index = event.attachments.findIndex(
            (att) => att.title && att.title.toLowerCase().includes("full")
          );
          return index !== -1
            ? googleDriveFix(event.attachments[index].fileUrl)
            : null;
        })()
      : null;

  return {
    title: `${event.summary} | Musical Monsters`,
    description: event.description || "Catch the latest local music events with Musical Monsters.",
    openGraph: {
      title: `${event.summary} | Musical Monsters`,
      description: event.description || "Live local music and community events hosted by Musical Monsters.",
      url: `https://www.musicalmonsterstulsa.com/events/${event.id}`,
      siteName: "Musical Monsters",
      images: imageUrlFull
        ? [
            {
              url: imageUrlFull,
              width: 800,
              height: 600,
            },
          ]
        : [],
    },
  };
}

// ✅ This is how we fetch in App Router
export default async function EventPage({ params }: Props) {
  const calendarID = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_CALENDAR_API_KEY;

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${params.eventid}?key=${apiKey}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return <h1 className="text-red-500 text-2xl">Event not found</h1>;
  }

  const event: Event = await res.json();

  const startDate = new Date(event.start.dateTime).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Chicago",
  });

  const imageUrlFull =
    event.attachments && event.attachments.length > 0
      ? (() => {
          const index = event.attachments.findIndex(
            (att) => att.title && att.title.toLowerCase().includes("full")
          );
          return index !== -1
            ? googleDriveFix(event.attachments[index].fileUrl)
            : "/mm2.png";
        })()
      : "/mm2.png";

  const imgAlt =
    event.attachments && event.attachments.length > 0
      ? event.attachments![0].title
      : "Musical Monsters";

  return (
    <section className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto text-gray-100">
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">{event.summary}</h1>
        <p className="text-yellow-400 mb-2">{startDate}</p>
        {event.location && <p className="mb-4">{event.location}</p>}
        {imageUrlFull && (
          <Image
            src={imageUrlFull}
            alt={imgAlt || "Event flyer"}
            width={400}
            height={200}
            className="rounded justify-center items-center mx-auto"
          />
        )}
      </div>
      <div>
        <p className="text-xl border-t-2 border-yellow-400 px-4 py-6 whitespace-pre-line">
          {event.description}
        </p>
      </div>
    </section>
  );
}
