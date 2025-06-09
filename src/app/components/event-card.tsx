type Event = {
    id: string,
    summary: string,
    description?: string,
    location?: string,
    start: { dateTime: string},
    end: { dateTime: string},
    attachment?: { fileUrl: string; title: string}[];
}

export default function EventCard ( { event }: { event: Event} ){
    const startDate = new Date(event.start.dateTime).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
    });  

    return(
        <div>
            <h1>{event.summary}</h1>
        </div>
    )
}