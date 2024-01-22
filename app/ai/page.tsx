"use client";

import { use, useEffect } from "react";
import GameGrid from "../components/GameGrid";
import GameOverDialog from "../components/GameOverDialog";
import useGame from "../hooks/useGame";
import GameScores from "../components/GameScores";
import GameTopBar from "../components/GameTopBar";

let ai: string;
let scoreMap: {
  [x: string]: number;
  [x: number]: number;
  tie: number;
};

const AI = () => {
  const {
    board,
    endGame,
    player,
    scores,
    setBoard,
    setEndGame,
    setScores,
    setTurn,
    turn,
    gameOver,
    resetBoard,
  } = useGame();

  const minimax = (board: unknown[], isMax: boolean) => {
    let result = gameOver();
    if (result) return scoreMap[result.winner];

    if (isMax) {
      let bestScore = -Infinity;

      for (let i = 0; i < board.length; i++) {
        if (board[i] == "") {
          board[i] = ai;
          let score = minimax(board, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < board.length; i++) {
        if (board[i] == "") {
          board[i] = player;
          let score = minimax(board, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const perfectSpot = () => {
    let bestScore = -Infinity;
    let bestMove: number;

    for (let i = 0; i < board.length; i++) {
      if (board[i] == "") {
        board[i] = ai;
        let score = minimax(board, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const aiMove = () => {
    setTimeout(() => {
      const moveIndex = perfectSpot();
      board[moveIndex] = ai;

      const endgame = gameOver();

      if (endgame) {
        setBoard(board.map((spot, index) => (index === moveIndex ? ai : spot)));
        setEndGame(endgame);
        calculateScor(endgame);
      }
      setTurn(player);
    }, 250);
  };

  useEffect(() => {
    ai = player == "x" ? "o" : "x";

    scoreMap = {
      [ai]: 1,
      [player]: -1,
      tie: 0,
    };
  }, []);

  useEffect(() => {
    if (turn == ai && endGame === null && scoreMap) aiMove();
  }, [turn]);

  const calculateScor = (endgame: {
    winner: string;
    winningSpots?: number[];
  }) => {
    setScores({ ...scores, [endgame.winner]: ++scores[endgame.winner] });
  };

  const updateSpot = (i: number) => {
    return () => {
      if (turn == player && board[i] === "") {
        board[i] = turn;
        const endgame = gameOver();

        if (endgame) {
          setBoard(board.map((spot, index) => (index == i ? turn : spot)));
          setEndGame(endgame);
          calculateScor(endgame);
        } else {
          setTurn(ai);
        }
      }
    };
  };

  return (
    <div className="h-full flex items-center">
      <main className="flex flex-col gap-5 mx-auto w-[400px] text-cyan-100">
        {endGame?.winner && (
          <GameOverDialog
            player={player}
            winner={endGame.winner}
            reset={resetBoard}
          />
        )}

        <GameTopBar turn={turn} resetBoard={resetBoard} />

        <div className="grid grid-cols-3 gap-6 items-cente sm:gap-3">
          {
            <GameGrid
              board={board}
              handleCLick={updateSpot}
              turn={turn}
              endGame={endGame}
            />
          }
          {<GameScores player={player} scores={scores} player2label="CPU" />}
        </div>
      </main>
    </div>
  );
};

export default AI;
