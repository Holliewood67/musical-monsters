"use client"
import Image from "next/image"
import { useEffect, useState } from "react";
import { Irish_Grover } from "next/font/google";


const altFont = Irish_Grover({
    subsets: ['latin'],
    weight: ['400'], 
})


export default function EPKBio(
    props: {
        monster: any,
    }
){

    return(
        <div className="text-center justify-center text-xl border-b-2 border-yellow-400 leading-relaxed p-3">
            <h1 className="text-4xl">{props.monster.name}</h1>
            <p className={`${altFont.className} text-2xl justify-center m-auto max-w-screen-lg`}>{props.monster.bioText}</p>
        </div>
    )
}