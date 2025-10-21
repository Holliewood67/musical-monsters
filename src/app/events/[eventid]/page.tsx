import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { Irish_Grover } from "next/font/google"
import { sanitizeDescription, sanitizeOGDescription } from "@/app/lib/sanitize-html";

const altFont = Irish_Grover({
    subsets: ['latin'],
    weight: ['400'], 
})

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

// Metadata for Facebook OG tags
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

  const imageUrlCropped =
    event.attachments && event.attachments.length > 0
    ? (() => {
        const index = event.attachments.findIndex(
          (att) => att.title && att.title.toLowerCase().includes("cropped")
        );
        return index !== -1
          ? googleDriveFix(event.attachments[index].fileUrl)
          : googleDriveFix(event.attachments[0].fileUrl)
      })()
    : "/mm2.png";

  const descriptionFix = event.description
    ? sanitizeOGDescription(event.description)
    : null;

  return {
    title: `${event.summary} | Musical Monsters`,
    description: descriptionFix || "Catch the latest local music events with Musical Monsters.",
    openGraph: {
      title: `${event.summary} | Musical Monsters`,
      description: descriptionFix || "Live local music and community events hosted by Musical Monsters.",
      url: `https://www.musicalmonsterstulsa.com/events/${event.id}`,
      siteName: "Musical Monsters",
      images: imageUrlCropped
        ? [
            {
              url: imageUrlCropped,
              width: 800,
              height: 600,
            },
          ]
        : [],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const calendarID = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_CALENDAR_API_KEY;

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${params.eventid}?key=${apiKey}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <h1 className="text-red-400 text-2xl font-bold">Event not found</h1>
      </div>
    );
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
            : googleDriveFix(event.attachments[0].fileUrl)
        })()
      : "/mm2.png";

  const imgAlt =
    event.attachments && event.attachments.length > 0
      ? event.attachments[0].title
      : "Musical Monsters";

  const descriptionFix = event.description
    ? sanitizeDescription(event.description)
    : null;
  
  return (
    <section className="flex flex-col items-center justify-center text-center max-w-6xl mx-auto text-gray-100 px-4 py-8 md:py-12">
      {/* Event Header */}
      <div className="text-center mb-8 w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
          {event.summary}
        </h1>
        <p className="text-yellow-400 text-lg md:text-xl font-semibold mb-2">
          {startDate}
        </p>
        {event.location && (
          <p className="text-gray-300 text-base md:text-lg">
            📍 {event.location}
          </p>
        )}
      </div>

      {/* Image and Description Container */}
      <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
        {/* Event Image */}
        {imageUrlFull && (
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src={imageUrlFull}
              alt={imgAlt || "Event flyer"}
              width={800}
              height={800}
              className="rounded-lg shadow-2xl w-full max-w-md h-auto"
              priority
            />
          </div>
        )}

        {/* Event Description */}
        {descriptionFix && (
          <div className="w-full lg:w-1/2">
            <div
              className={`${altFont.className} text-lg md:text-xl leading-relaxed whitespace-pre-line`}
              dangerouslySetInnerHTML={{ __html: descriptionFix }}
            />
          </div>
        )}
      </div>
    </section>
  );
}