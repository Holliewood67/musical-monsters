import { Component } from "react";


export default function YoutubeEmbed(
    props:{
        monster: any
    }
){
    return(
        <div className="aspect-w-16 aspect-h-9 lg:aspect-h-6   items-center justify-center text-center text-xl border-b-2 border-yellow-400 leading-relaxed">
            <iframe 
                    src={`https://www.youtube.com/embed/${props.monster.ytVid}`} 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen 
                    >
            </iframe>
      </div>    

    )
}