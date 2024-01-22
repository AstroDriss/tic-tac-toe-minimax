"use client";

import { createContext, useState } from "react";

const GameContext = createContext<any>(null);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [player, setPlayer] = useState("o");

  return (
    <GameContext.Provider value={{ player, setPlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
