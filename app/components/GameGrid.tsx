"use client";

import { O, OutlineO, X, OutlineX } from "@/app/components/icons";

interface Props {
  board: any[];
  endGame: any;
  turn: string;
  ai?: string | undefined;
  handleCLick: (i: number) => () => void;
}

const GameGrid = ({ board, endGame, handleCLick, turn, ai }: Props) => {
  return (
    <>
      {board.map((spot, index) => {
        const isWiningSpot = endGame?.winningSpots?.includes(index);
        return (
          <button
            key={index}
            onClick={handleCLick(index)}
            className={`group aspect-square flex items-center justify-center rounded-xl border-b-[6px] ${
              isWiningSpot
                ? `${
                    endGame?.winner == "x"
                      ? "bg-primary border-cyan-600"
                      : "bg-secondary border-yellow-600"
                  } `
                : " bg-navy-700 border-gray-950"
            }`}
          >
            {spot == "x" && <X color={isWiningSpot ? "#1A2A33" : undefined} />}
            {spot == "o" && <O color={isWiningSpot ? "#1A2A33" : undefined} />}
            {!spot &&
              turn != ai &&
              (turn == "x" ? (
                <OutlineX
                  className={`hidden ${
                    !spot &&
                    endGame?.winner == null &&
                    "group-hover:block group-focus:block"
                  } `}
                />
              ) : (
                <OutlineO
                  className={`hidden ${
                    !spot &&
                    endGame?.winner == null &&
                    "group-hover:block group-focus:block"
                  } `}
                />
              ))}
          </button>
        );
      })}
    </>
  );
};

export default GameGrid;
