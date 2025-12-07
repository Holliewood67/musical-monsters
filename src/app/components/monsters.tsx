"use client"
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import MonsterCard from "./monster-card"
import { SanityMonster } from "@/types/sanity"

interface MonstersProps {
  monsters: SanityMonster[];
}

export default function Monsters({ monsters }: MonstersProps) {
    
  const AutoScroll: KeenSliderPlugin = (slider) => {
    let timeout: ReturnType<typeof setTimeout>
    let mouseOver = false
    
    function clearNextTimeout() {
      clearTimeout(timeout)
    }
    
    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, 3000) // Changed from 100ms to 3000ms for more reasonable auto-scroll
    }
    
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on("dragStarted", clearNextTimeout)
    slider.on("animationEnded", nextTimeout)
    slider.on("updated", nextTimeout)
  }
  
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1.5,
      spacing: 20,
      origin: "center",
    },
    defaultAnimation: {
      duration: 1000, // Changed from 3000ms to 1000ms for smoother transitions
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2.5,
          spacing: 30,
          origin: "center",
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 40,
          origin: "center",
        },
      },
    },
  },
  [AutoScroll]
  )
  
  if (!monsters || monsters.length === 0) {
    return (
      <section className="relative border-t-2 border-yellow-400" id="monster-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 inset-0 w-full h-full object-cover opacity-100"
        >
          <source src="/videos/monster-bg.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center py-10">
          <h1 className="text-2xl">Loading Monsters...</h1>
        </div>
      </section>
    )
  }
  
  return (
    <section className="relative border-t-2 border-yellow-400" id="monster-section">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 inset-0 w-full h-full object-cover opacity-100"
      >
        <source src="/videos/monster-bg.mp4" type="video/mp4" />
      </video>
      {/* Content Layer */}
      <div className="relative z-10">
        <div className="text-3xl text-center py-6">
          <h1>Meet The Monsters</h1>
        </div>
        <div className="mx-auto">
          <div className="w-full overflow-hidden">
            {/* Slider */}
            <div ref={sliderRef} className="keen-slider pb-12">
              {monsters.map((monster) => {
              console.log(monster.name)
              return (
                <div key={monster._id} className="keen-slider__slide ">
                  <MonsterCard monster={monster} />
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}