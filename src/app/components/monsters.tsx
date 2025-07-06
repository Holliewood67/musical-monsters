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
    }, 5000) // change slide every 3s
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
    <section className="border-t-2 border-yellow-400 py-6" id="monster-section">
      <div className="text-3xl text-center pb-6">
        <h1>Meet The Monsters</h1>
      </div>
      <div className="mx-auto overflow-hidden">
      <div className="relative w-full overflow-hidden">
        {/* Left Gradient */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />

        {/* Right Gradient */}
        <div className="pointer-events-none absolute right-0 top-0 h-full wd-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {monsters.map((monster, i) => (
            <div key={i} className="keen-slider__slide">
              <MonsterCard
                urlPath={monster.urlName}
                monsterName={monster.name}
                imgPath={`${
                  monster.pics[Math.floor(Math.random() * monster.pics.length)]
                }.jpg`}
              />
            </div>
          ))}
        </div>
      </div>
     </div>
    </section>
  )
}
