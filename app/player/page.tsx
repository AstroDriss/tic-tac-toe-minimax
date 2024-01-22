"use client";

import GameGrid from "../components/GameGrid";
import GameOverDialog from "../components/GameOverDialog";
import useGame from "../hooks/useGame";
import GameScores from "../components/GameScores";
import GameTopBar from "../components/GameTopBar";

export default function Home() {
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

  const updateSpot = (i: number) => {
    return function () {
      if (board[i] || endGame?.winner != null) return;

      board[i] = turn;
      const endgame = gameOver();

      if (endgame) {
        setBoard(board.map((spot, index) => (index == i ? turn : spot)));
        setEndGame(endgame);
        if (endgame.winner == "x") setScores({ ...scores, x: ++scores.x });
        if (endgame.winner == "o") setScores({ ...scores, o: ++scores.o });
        if (endgame.winner == "tie")
          setScores({ ...scores, tie: ++scores.tie });
      } else {
        setTurn(turn == "x" ? "o" : "x");
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
          {<GameScores player={player} scores={scores} />}
        </div>
      </main>
    </div>
  );
}
