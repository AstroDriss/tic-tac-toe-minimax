"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { O, X } from "./icons";

interface Props {
  winner: string;
  player: string;
  reset: () => void;
}

const GameOverDialog = ({ reset, winner, player }: Props) => {
  const GameOverRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    GameOverRef?.current?.showModal();
  }, []);

  return (
    <>
      <dialog
        className="bg-navy-700 w-full flex flex-col gap-3 items-center py-6"
        ref={GameOverRef}
      >
        <p className="text-silver-100 text-xs">
          {winner !== "tie" && (player === winner ? "YOU WON!" : "YOU LOSE!")}
        </p>
        <h1 className="text-primary font-extrabold text-2xl flex items-center gap-5">
          {winner == "x" ? (
            <span className="contents">
              <X size="40" />
              TAKES THE RAOUND
            </span>
          ) : winner == "o" ? (
            <span className="text-secondary contents">
              <O size="40" />
              TAKES THE ROUND
            </span>
          ) : (
            <span className="text-silver-hover">ROUND TIED</span>
          )}{" "}
        </h1>

        <div className="flex gap-4 p-0">
          <Link
            className="bg-silver-100 hover:bg-silver-hover border-b-4 border-gray-600 rounded-md p-2 py-1"
            href={"/"}
          >
            QUIT
          </Link>
          <button
            onClick={reset}
            className="bg-secondary hover:bg-secondaryHover border-b-4 border-yellow-600 rounded-md px-2 py-1"
          >
            NEXT ROUND
          </button>
        </div>
      </dialog>
    </>
  );
};

export default GameOverDialog;
