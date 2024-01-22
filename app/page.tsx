"use client";

import Link from "next/link";
import { useContext } from "react";
import { Logo } from "./components/icons";
import { GameContext } from "./context/context";

export default function Home() {
  const { player, setPlayer } = useContext(GameContext);

  const updatePlayer = (mark: string) => () => setPlayer(mark);

  return (
    <div className="h-full flex items-center">
      <main className="flex flex-col gap-7 mx-auto w-[400px] text-silver-100">
        <Logo className="mx-auto" />

        <div className="flex flex-col gap-3 items-center p-5 rounded-xl border-b-4 border-cyan-950 bg-navy-700 text-silver-100">
          <h1>Pick Player 1'S mark</h1>
          <ul className="flex bg-navy-900 w-full p-2 font-black rounded-md">
            <li className="grow">
              <button
                onClick={updatePlayer("x")}
                className={`p-2 rounded-md text-center w-full ${
                  player == "x" ? "bg-silver-100 text-navy-900" : ""
                }`}
              >
                X
              </button>
            </li>
            <li className="grow">
              <button
                onClick={updatePlayer("o")}
                className={`p-2 rounded text-center w-full ${
                  player == "o" ? "bg-silver-100 text-navy-900" : ""
                }`}
              >
                O
              </button>
            </li>
          </ul>

          <p className="text-gray-200/70 text-xs">Remember X Goes first</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            className="bg-secondary text-navy-900 rounded-lg font-bold text-center py-3 border-b-4 border-yellow-600 transition-colors hover:bg-secondaryHover"
            href="/cpu"
          >
            New Game (VS CPU)
          </Link>
          <Link
            className="bg-primary text-navy-900 rounded-lg font-bold text-center py-3 border-b-4 border-cyan-600 hover:bg-primaryHover transition-colors"
            href="/player"
          >
            New Game (VS PLAYER)
          </Link>
        </div>
      </main>
    </div>
  );
}
