"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { Logo, O, Restart, X } from "../components/icons";
import { GameContext } from "../context/context";
import GameGrid from "../components/gameGrid";
import GameOverDialog from "../components/GameOverDialog";

const combos = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // cross
  [0, 4, 8],
  [2, 4, 6],
];

interface EndGame {
  winner: string | null;
  winningSpots?: number[];
}

export default function Home() {
  const [board, setBoard] = useState(Array.from({ length: 9 }).fill(""));
  const { player: player1, setPlayer } = useContext(GameContext);
  const [endGame, setEndGame] = useState<EndGame | null>(null);

  const [turn, setTurn] = useState("x");

  const [scores, setScors] = useState({
    x: 0,
    tie: 0,
    o: 0,
  });

  const updateSpot = (i: number) => {
    return function () {
      if (board[i] || endGame?.winner != null) return;

      board[i] = turn;
      const endgame = gameOver();

      if (endgame) {
        setBoard(board.map((spot, index) => (index == i ? turn : spot)));
        setEndGame(endgame);
        if (endgame.winner == "x") setScors({ ...scores, x: ++scores.x });
        if (endgame.winner == "o") setScors({ ...scores, o: ++scores.o });
        if (endgame.winner == "tie") setScors({ ...scores, tie: ++scores.tie });
      } else {
        setTurn(turn == "x" ? "o" : "x");
      }
    };
  };

  const resetBoard = () => {
    const newBoard = Array.from({ length: 9 }).fill("");
    setBoard(newBoard);
    setEndGame(null);
    setTurn("x");
  };

  const gameOver = () => {
    for (const combo of combos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] == board[b] && board[a] == board[c])
        return { winner: board[a] as string, winningSpots: combo };
    }

    if (board.every((spot) => spot)) return { winner: "tie" };

    return null;
  };

  return (
    <div className="h-full flex items-center">
      <main className="flex flex-col gap-5 mx-auto w-[400px] text-cyan-100">
        {endGame?.winner && (
          <GameOverDialog
            player={player1}
            winner={endGame.winner}
            reset={resetBoard}
          />
        )}

        <div className="flex justify-between items-center mb-9 sm:mb-0">
          <Logo className="" />

          <p className="border-b-2 flex items-center border-gray-900 bg-navy-700 text-silver-100 px-4 py-2 rounded-md gap-2">
            {turn == "x" ? (
              <X color="currentColor" size="16" />
            ) : (
              <O color="currentColor" size="16" />
            )}{" "}
            turn
          </p>

          <button
            onClick={resetBoard}
            className="border-b-2 border-gray-700 transition-colors bg-silver-100 hover:bg-silver-hover p-2 rounded-md"
          >
            <Restart />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 items-cente sm:gap-3">
          {
            <GameGrid
              board={board}
              handleCLick={updateSpot}
              turn={turn}
              endGame={endGame}
            />
          }
          <div className="bg-primary rounded-md text-center py-2 text-navy-900">
            <p className="text-xs uppercase">
              X ({player1 == "x" ? "YOU" : "PLAYER 2"})
            </p>
            <strong className="text-lg">{scores.x}</strong>
          </div>

          <div className="bg-silver-100 rounded-md text-center py-2 text-navy-900">
            <p className="text-xs ">TIES</p>
            <strong className="text-lg">{scores.tie}</strong>
          </div>

          <div className="bg-secondary rounded-md text-center py-2 text-navy-900">
            <p className="text-xs uppercase">
              O ({player1 == "o" ? "YOU" : "PLAYER 2"})
            </p>
            <strong className="text-lg">{scores.o}</strong>
          </div>
        </div>
      </main>
    </div>
  );
}
