'use client'
import { useState } from "react"
import EventCard from "./event-card"
import { AnimatePresence, motion } from "framer-motion"
import { SanityMonster, SanityEvent } from "@/types/sanity"

const EVENTS_PER_PAGE = 3

interface EPKEventsProps {
  monster: SanityMonster
  events: SanityEvent[]
}

export default function EPKEvents({ monster, events }: EPKEventsProps) {
  const [visibleCount, setVisibleCount] = useState(EVENTS_PER_PAGE)

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

  if (events.length === 0) return null;

  const visibleEvents = events.slice(0, visibleCount)
  const hasMoreEvents = visibleCount < events.length

  return (
    <section className="flex flex-col justify-center text-center items-center py-4 border-b-2 border-yellow-400">
      <h1 className="text-4xl pb-4">EVENTS</h1>
      <div className={`
        p-4 gap-6 ${
          events.length < 3
          ? "flex flex-col sm:flex-row sm:justify-center items-center"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }
      `}>
        <AnimatePresence initial={false}>
          {visibleEvents.map((event) => (
            <motion.div
              key={event._id}
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
          className="mt-6 px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
        >
          Show More
        </button>
      )}
    </section>
  )
}