"use client"
import Image from "next/image"
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { SanityMonster } from "@/types/sanity"
import { client } from "@/sanity/client"
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface EPKCarouselProps {
  monster: SanityMonster
}

export default function EPKCarousel({ monster }: EPKCarouselProps) {
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
  }, [AutoScroll])

  // Check if images exist
  if (!monster.images || monster.images.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No images available</p>
      </div>
    )
  }
  
  return (
    <div className="relative">
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
        className="relative z-10 keen-slider mx-auto border-b-2 border-yellow-400"
      >
        {monster.images.map((image, i) => {
          const imageUrl = image?.asset ? urlFor(image).url() : null
          
          return (
            <div
              key={i}
              className="keen-slider__slide flex items-center justify-center"
            >
              <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[32rem]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${monster.name} - Image ${i + 1}`}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Image unavailable</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}