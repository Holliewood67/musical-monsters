"use client"
import { useEffect, useState } from "react";
import MonsterCard from "./monster-card";
import monsterList from "./monster-list";

export default function Monsters() {

    const [monsters, setMonsers] = useState<any[]>([]);

    useEffect(() => {

        let newMonsters = new Array;

        let monstersList = monsterList.monsters.slice()

        newMonsters.push(monstersList[0]);
        monstersList.splice(0, 1);

        while (monstersList.length > 0) {
            let index = Math.floor(Math.random() * monstersList.length);
            newMonsters.push(monstersList[index]);
            monstersList.splice(index, 1);
            }

        setMonsers(newMonsters);
        console.log(newMonsters)
    }, [])

    if (!monsterList) {
        return <div className="items-center justify-center">
                    <h1>Loading...</h1>
                </div>;
      }


    return(
        <div className="border-t-2 border-yellow-400 p-4" id="monster-section">
            <div className="flex justify-center text-center pb-0 text-3xl">
                <h1>Meet The Monsters</h1>
            </div>
            <div className="text-center justify-center items-center md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-8">
                {monsters.map((monster, i) => {
                    return <MonsterCard key={i} urlPath={monster.urlName} monsterName={monster.name} imgPath={`${monster.pics[Math.floor(Math.random() * monster.pics.length)]}.png`} />
                })}
            </div>
        </div>
    )
}