import { Logo, O, Restart, X } from "./icons";

interface Props {
  turn: string;
  resetBoard: () => void;
}

const GameTopBar = ({ turn, resetBoard }: Props) => (
  <div className="flex justify-between items-center mb-9 sm:mb-0">
    <Logo />

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
);

export default GameTopBar;
