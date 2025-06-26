"use client";
import { useEffect, useState } from "react";
import { Metal_Mania } from "next/font/google";

const metal = Metal_Mania({
  subsets: ['latin'],
  weight: ['400'], 
})


export default function FullCalendarPage() {
  const calendarId = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calendarSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    calendarId!
  )}&ctz=America%2FChicago${isMobile ? "&mode=AGENDA" : ""}`;

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 bg-black text-white border-b-2">
      <h1 className="text-4xl font-bold mb-6 text-center">Full Calendar</h1>
      <p className={`${metal.className} mb-8 text-2xl text-center text-gray-300 max-w-xl`}>
        Check out whats coming next from the Musical Monsters family!
      </p>

      <div className="w-full max-w-6xl h-[700px] sm:h-[800px] rounded-lg overflow-hidden border border-white shadow-lg">
        <iframe
          src={calendarSrc}
          style={{ border: 0 }}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          title="Lot No. 6 Events Calendar"
        ></iframe>
      </div>
    </section>
  );
}
