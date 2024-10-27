"use client"
import MonsterCard from "./monster-card";
import monsterList from "./monster-list";

export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};

export default function Monsters() {
    // function  NewMonsters() {
    //     let newMonsterList = monsterList.monsters.slice();
    //     newMonsterList.splice(0, 1);
    //     return 42;
    //     }

    // }

    // const NewMonsters = () => {
    //     // monsterList.monsters.map((monster, i) => {
    //     //     return <MonsterCard key={i} urlPath={monster.urlName} monsterName={monster.name} imgPath={`${monster.pics[Math.floor(Math.random() * monster.pics.length)]}.png`} />
    //     // });
    //     return <h1>42</h1>
    // };

    return(
        <div className="border-t-2 border-yellow-400 p-4" id="monster-section">
            <div className="flex justify-center text-center pb-0 text-3xl">
                <h1>Meet The Monsters</h1>
            </div>
            {/* <NewMonsters /> */}
            <div className="text-center justify-center items-center md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-8">
                {monsterList.monsters.map((monster, i) => {
                    return <MonsterCard key={i} urlPath={monster.urlName} monsterName={monster.name} imgPath={`${monster.pics[Math.floor(Math.random() * monster.pics.length)]}.png`} />
                })}
            </div>
        </div>
    )
}