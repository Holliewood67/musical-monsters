'use client'

import { useEffect, useState } from "react"
import EventCard from "./event-card"
import { AnimatePresence, motion } from "framer-motion"

type Event = {
  id: string,
  htmlLink: string,
  summary: string,
  description?: string,
  location?: string,
  start: { dateTime: string },
  end: { dateTime: string },
  attachment?: { fileUrl: string; title: string }[]
}

const EVENTS_PER_PAGE = 3

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [visibleCount, setVisibleCount] = useState(EVENTS_PER_PAGE)

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events')
      const data = await res.json()
      setEvents(data)
    }

    fetchEvents()
  }, [])

  const handleShowMore = () => {
    let added = 0
    const revealNext = () => {
      if (added < 3 && visibleCount + added < events.length) {
        setVisibleCount(prev => prev + 1)
        added += 1
        setTimeout(revealNext, 200)
      }
    }
    revealNext()
  }

  const visibleEvents = events.slice(0, visibleCount)
  const hasMoreEvents = visibleCount < events.length

  return (
    <section className="flex flex-col justify-center text-center items-center py-4">
      <h1 className="text-4xl pb-4">EVENTS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <AnimatePresence initial={false}>
          {visibleEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              layout
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasMoreEvents && (
        <button
          onClick={handleShowMore}
          className="mt-6 px-6 py-2 border border-yellow-400 rounded-full text-yellow-400 hover:bg-yellow-400 hover:text-black transition duration-300"
        >
          Show More
        </button>
      )}
    </section>
  )
}
