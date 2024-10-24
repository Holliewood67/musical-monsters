"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavigationBar(){
    const [open, setOpen] = useState(false);
    return (
        <header className="flex w-full items-center border-b-2 border-yellow-400">
            <div className="container ">
                <div className="flex items-center justify-between mx-auto p-2 lg:text-3xl">
                    <Link href={"/"} className="flex items-center lg:border-r-2 lg:border-yellow-400" >
                        <Image  src="/mm.png" alt="Musical Monsters" width={100} height={50}/>
                        <h1 className="text-yellow-400">MUSICAL MONSTERS</h1>
                    </Link>
                    <button
                        onClick={() => setOpen(!open)} 
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg hover:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:text-yellow-400 md:hidden">
                        <span className="sr-only">Open Menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                            <nav className="hidden md:flex p-4 w-full ">
                                <ul className="flex w-full justify-around lg:justify-normal gap-6 lg:gap-10">
                                    <li className="my-2 py-2 "><Link href={"/"} className="text-yellow-400 hover:text-gray-700">Home</Link></li>
                                    <li className="my-2 py-2 "><Link href={"/#monster-section"} className="text-yellow-400 hover:text-gray-700">Monsters</Link></li>
                                    <li className="my-2 py-2 "><a href={"https://www.musicalmonstersshop.com"} target="_blank" className="text-yellow-400 hover:text-gray-700">Shop</a></li>
                                    <li className="my-2 py-2"><a href={"https://mail.google.com/mail/?view=cm&fs=1&to=musicalmonsterstulsa@gmail.com&su=SUBJECT&body=BODY"}  target="_blank"className="text-yellow-400 hover:text-gray-700">Contact</a></li>
                                </ul>
                            </nav>

                </div>
                <div className={` ${!open && "hidden"} p-4 w-full border-b-2 border-yellow-400`} id="navbar-default">
                    <nav>
                        <ul>
                            <li className="my-2 py-2 border-b-2 border-yellow-600"><Link href={"#"} className="text-yellow-400 hover:text-gray-700">Home {">"}</Link></li>
                            <li className="my-2 py-2 border-b-2 border-yellow-600"><Link href={"#monster-section"} className="text-yellow-400 hover:text-gray-700">Monsters {">"}</Link></li>
                            <li className="my-2 py-2 border-b-2 border-yellow-600"><Link href={"#"} className="text-yellow-400 hover:text-gray-700">Shop {">"}</Link></li>
                            <li className="my-2 py-2"><Link href={"#"} className="text-yellow-400 hover:text-gray-700">Contact {">"}</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}