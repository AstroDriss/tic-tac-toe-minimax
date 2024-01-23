interface Props {
  player: string;
  scores: {
    x: number;
    o: number;
    tie: number;
  };
  player2label?: string;
}

const GameScores = ({ player, scores, player2label = "PLAYER 2" }: Props) => {
  return (
    <>
      <div className="bg-primary rounded-md text-center py-2 text-navy-900">
        <p className="text-xs uppercase font-semibold">
          X ({player == "x" ? "YOU" : player2label})
        </p>
        <strong className="text-xl">{scores.x}</strong>
      </div>

      <div className="bg-silver-100 rounded-md text-center py-2 text-navy-900">
        <p className="text-xs font-semibold">TIES</p>
        <strong className="text-xl">{scores.tie}</strong>
      </div>

      <div className="bg-secondary rounded-md text-center py-2 text-navy-900">
        <p className="text-xs uppercase font-semibold">
          O ({player == "o" ? "YOU" : player2label})
        </p>
        <strong className="text-xl">{scores.o}</strong>
      </div>
    </>
  );
};

export default GameScores;
