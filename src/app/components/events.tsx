'use client'
import EventCard from "./event-card"
import { AnimatePresence, motion } from "framer-motion"
import { SanityEvent } from "@/types/sanity"
import Link from "next/link"

interface EventProps {
  events: SanityEvent[];
}

export default function Events({ events }: EventProps) {
  return (
    <section className="flex flex-col justify-center text-center items-center py-4">
      <h1 className="text-4xl pb-4">EVENTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <AnimatePresence initial={false}>
          {events.slice(0, 3).map((event) => (
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
      {events.length > 3 && (
        <Link
          href="/events"
          className="mt-6 px-6 py-2 border border-yellow-400 rounded-full text-yellow-400 hover:bg-yellow-400 hover:text-black transition duration-300"
        >
          Show More
        </Link>
      )}
    </section>
  )
}