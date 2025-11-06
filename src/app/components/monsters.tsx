"use client"

import { useEffect, useState } from "react"
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import MonsterCard from "./monster-card"
import monsterList from "./monster-list"

export default function Monsters() {
  const [monsters, setMonsters] = useState<any[]>([])

  useEffect(() => {
    const shuffled = [...monsterList.monsters]
    const first = shuffled.shift()
    const rest = shuffled.sort(() => 0.5 - Math.random())
    setMonsters(first ? [first, ...rest] : rest)
  }, [])

  
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
    }, 100) // slide change timer
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
      origin: "center", // ensures center card is fully shown
    },
    defaultAnimation: {
    duration: 3000, // works only for navigation buttons and when clicking on gallery thumbnails, but not when swiping
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

  if (!monsters.length) {
    return (
      <div className="text-center py-10">
        <h1>Loading Monsters...</h1>
      </div>
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
      <div className="mx-auto overflow-hidden">
      <div className="w-full overflow-hidden">
        {/* Slider */}
        <div ref={sliderRef} className="keen-slider pb-12">
          {monsters.map((monster, i) => (
            <div key={i} className="keen-slider__slide">
              <MonsterCard
                urlPath={monster.urlName}
                monsterName={monster.name}
                imgPath={`${monster.urlName}/${monster.urlName}-${[Math.floor(Math.random() * monster.picsNumber) + 1]
                }.jpg`}
              />
            </div>
          ))}
        </div>
      </div>
     </div>
     </div>
    </section>
  )
}
