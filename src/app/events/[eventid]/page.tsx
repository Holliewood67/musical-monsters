import Image from "next/image";

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

const googleDriveFix = (url: string) => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

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
  });

  const imageUrlFull =
    event.attachments && event.attachments.length > 0
      ? googleDriveFix(event.attachments[0].fileUrl)
      : null;

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 py-12 text-gray-100">
      <h1 className="text-3xl font-bold mb-2">{event.summary}</h1>
      <p className="text-gray-400 mb-2">{startDate}</p>
      {event.location && <p className="mb-4">{event.location}</p>}
      {imageUrlFull && (
        <Image
          src={imageUrlFull}
          alt={event.attachments?.[0]?.title || "Event flyer"}
          width={400}
          height={200}
          className="rounded mb-6 justify-center items-center mx-auto"
        />
      )}
      <p>{event.description}</p>
    </div>
  );
}
