'use client'

import { useEffect, useState } from "react"
import EventCard from "./event-card";

type Event = {
    id: string,
    summary: string,
    description?: string,
    location?: string,
    start: { dateTime: string},
    end: { dateTime: string},
    attachment?: { fileUrl: string; title: string}[];
}

export default function Events(){
    const [events, setevents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await fetch('api/events');
            const data = await res.json();
            console.log('Fetched events:', data); 
            setevents(data);
        };

        fetchEvents();
    }, []);


    return(
        <section className=" flex-col w-full text-center items-center justify-center py-12 border-t-2 border-yellow-400">
            <h1>EVENTS</h1>
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </section>
    )
}