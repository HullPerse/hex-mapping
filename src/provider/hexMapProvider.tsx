import React, { createContext, useState } from "react";

interface HexProps {
  hexHeight: number;
  hexWidth: number;
}

type MapContextType = {
  hexParams: HexProps;
  setHexParams: (value: HexProps) => void;

  currentHex: null | string;
  setCurrentHex: (value: null | string) => void;

  currentCursor: string;
  setCurrentCursor: (value: string) => void;
};

const initialMapState = {
  hexParams: {
    hexHeight: localStorage.getItem("hexParams")
      ? JSON.parse(localStorage.getItem("hexParams")!).hexHeight
      : 10,
    hexWidth: localStorage.getItem("hexParams")
      ? JSON.parse(localStorage.getItem("hexParams")!).hexWidth
      : 10,
  },
  setHexParams: () => {},

  currentHex: null,
  setCurrentHex: () => {},

  currentCursor: "select",
  setCurrentCursor: () => {},
};

const MapContext = createContext<MapContextType>(initialMapState);

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [hexParams, setHexParams] = useState<HexProps>(
    initialMapState.hexParams
  );
  const [currentHex, setCurrentHex] = useState<string | null>(
    initialMapState.currentHex
  );

  const [currentCursor, setCurrentCursor] = useState<string>(
    initialMapState.currentCursor
  );

  return (
    <MapContext.Provider
      value={{
        hexParams,
        setHexParams,

        currentHex,
        setCurrentHex,

        currentCursor,
        setCurrentCursor,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
