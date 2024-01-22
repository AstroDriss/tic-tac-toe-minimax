import { useState, useContext } from "react";
import { GameContext } from "../context/context";

interface EndGame {
  winner: string | null;
  winningSpots?: number[];
}

const useGame = () => {
  const [board, setBoard] = useState(Array.from({ length: 9 }).fill(""));
  const { player } = useContext(GameContext);
  const [endGame, setEndGame] = useState<EndGame | null>(null);

  const [turn, setTurn] = useState("x");

  const [scores, setScores] = useState({
    x: 0,
    tie: 0,
    o: 0,
  });

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

  const gameOver = () => {
    for (const combo of combos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] == board[b] && board[a] == board[c])
        return { winner: board[a] as string, winningSpots: combo };
    }

    if (board.every((spot) => spot)) return { winner: "tie" };

    return null;
  };

  const resetBoard = () => {
    const newBoard = Array.from({ length: 9 }).fill("");
    setBoard(newBoard);
    setEndGame(null);
    setTurn("x");
  };

  return {
    board,
    setBoard,
    player,
    endGame,
    setEndGame,
    turn,
    setTurn,
    scores,
    setScores,
    gameOver,
    resetBoard,
  };
};

export default useGame;
