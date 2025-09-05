"use client"

import Image from "next/image"
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function EPKCarousel({ monster }: { monster: any }) {

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
        }, 3000) // slide change timer
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
    slides: {
      perView: 2,
      spacing: 10,
      origin: "center",
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { 
                perView: 2.5, 
                spacing: 5, 
                origin: "center",
            }, 
      },
      "(min-width: 1024px)": {
        slides: { 
            perView: 3, 
            spacing: 20,
            origin: "center",
        }, 
      },
    },
  }, [AutoScroll]
)
  

  return (
    <div className="relative ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 inset-0 w-full h-full object-cover opacity-100"
        >
          <source src="/videos/monster-bg.mp4" type="video/mp4" />
        </video>
      <div
        ref={sliderRef}
        className="relative z-10 keen-slider mx-auto border-b-2 border-yellow-400 "
      >
        {monster.pics.map((pic: string, i: number) => (
          <div
            key={i}
            className="keen-slider__slide flex items-center justify-center"
          >
            <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[32rem]">
              <Image
                src={`/epkpics/${pic}.jpg`}
                alt={monster.name}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
