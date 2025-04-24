"use client"
import Image from "next/image"
import { useEffect, useState } from "react";

export default function EPKBio(
    props: {
        monster: any,
    }
){
    const [bioPics, setBioPics] = useState<number[]>([]);

    useEffect(() => {
        //Create empty list
        let newBioPics = new Array;

        //Get pics list
        let picList = props.monster.pics.slice();

        while (picList.length > 0) {
            let index = Math.floor(Math.random() * picList.length);
            newBioPics.push(picList[index]);
            picList.splice(index, 1)
        } 

        setBioPics(newBioPics);
    }, []);

    if (!props.monster || !props.monster.name || !bioPics.length) {
        return <h1>Loading...</h1>
        }

    return(
        <div className="text-center text-xl border-b-2 border-yellow-400 leading-relaxed">
            <div className="md:flex items-center lg:justify-between">
                <div className="justify-center flex max-w-md">
                    <Image className="border-b-2 md:rounded-br-full md:border-4 md:border-l-0 md:border-t-0 border-yellow-400" src={`/epkpics/${bioPics[0]}.png`} alt="Ethan Cantrell" width={800} height={400} />
                </div>
                <div className="pt-4 max-w-sm md:max-w-md lg:max-w-screen-md md:text-2xl lg:text-4xl">
                    <h1 className="text-4xl flex justify-center">{props.monster.name}</h1>
                    <h3 className="text-yellow-400 md:text-end p-4">{props.monster.bioText[0]}</h3>
                </div>
            </div>
            <div className="md:flex items-center lg:justify-between ">
                <div className="p-4  hidden max-w-sm md:max-w-md md:flex md:text-start lg:max-w-screen-md md:text-2xl lg:text-4xl">
                    <h3>{props.monster.bioText[1]}</h3>
                </div>
                <div className="justify-center flex max-w-md pl-4 ">
                    <Image className="rounded-s-full border-4 border-r-0 border-yellow-400" src={`/epkpics/${bioPics[1]}.png`} alt="Ethan Cantrell" width={800} height={800} />
                </div>
                <div className="md:hidden p-4">
                    <h3>{props.monster.bioText[1]}</h3>
                </div>
            </div>
            <div className="md:flex items-center lg:justify-between">
                <div className="justify-center flex max-w-md pr-4">
                    <Image className="rounded-e-full border-4 border-l-0 border-yellow-400" src={`/epkpics/${bioPics[2]}.png`} alt="Ethan Cantrell" width={800} height={800} />
                </div>
                <div className="p-4 max-w-sm md:max-w-md md:flex md:text-start lg:max-w-screen-md md:text-2xl lg:text-4xl">
                    <h3 className="text-yellow-400 md:text-end">{props.monster.bioText[2]}</h3>
                </div>
            </div>
            <div className="md:flex items-center lg:justify-between">
                <div className="p-4 hidden max-w-sm md:max-w-md md:flex md:text-start lg:max-w-screen-md md:text-2xl lg:text-4xl">
                    <h3>{props.monster.bioText[3]}</h3>
                </div>
                <div className="justify-center flex max-w-md pl-4">
                    <Image className="rounded-s-full border-4 border-r-0 border-yellow-400 md:rounded-s-none md:rounded-tl-full md:border-b-0" src={`/epkpics/${bioPics[3]}.png`} alt="Ethan Cantrell" width={800} height={800} />
                </div>
                <div className="md:hidden p-4">
                    <h3>{props.monster.bioText[3]}</h3>
                </div>
            </div>
        </div>
    )
}