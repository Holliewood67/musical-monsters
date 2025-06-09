import Image from "next/image";

type Event = {
    id: string,
    summary: string,
    description?: string,
    location?: string,
    start: { dateTime: string},
    end: { dateTime: string},
    attachments?: { fileUrl: string; title: string}[];
}

const googleDriveFix = (url: string) => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

export default function EventCard ( { event }: { event: Event} ){
    const startDate = new Date(event.start.dateTime).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
    });  

    return(
      <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 my-4 shadow-lg max-w-3xl w-full mx-auto text-left">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">{event.summary}</h2>
        <p className="text-sm text-gray-400 mb-1">{startDate}</p>
        {event.location && <p className="text-gray-300 mb-2">{event.location}</p>}
        {event.description && (
          <p className="text-gray-200 mb-2">{event.description.replace(/<[^>]+>/g, '')}</p>
        )}

        {event.attachments ? (
          <Image
          src={googleDriveFix(event.attachments[0].fileUrl)}
          alt={event.attachments[0].title}
          width={600}
          height={800}
          className="rounded mt-4 object-contain max-w-full h-auto"
           />
        ) : <p>no image</p>}
      </div>
    )
}