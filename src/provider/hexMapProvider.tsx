import React, { createContext, useState } from "react";

interface HexProps {
  hexHeight: number;
  hexWidth: number;
}

interface HexBrush {
  id: string;
  title: string;
  color: string;
  clickable: boolean;
}

interface CustomHex {
  id: string;
  type: HexBrush;
}

type MapContextType = {
  hexParams: HexProps;
  setHexParams: (value: HexProps) => void;

  currentHex: null | string;
  setCurrentHex: (value: null | string) => void;

  currentCursor: string;
  setCurrentCursor: (value: string) => void;

  addBrush: boolean;
  setAddBrush: (value: boolean) => void;

  customBrushes: Array<HexBrush>;
  setCustomBrushes: (value: Array<HexBrush>) => void;

  currentBrush: null | HexBrush;
  setCurrentBrush: (value: null | HexBrush) => void;

  customHex: CustomHex[] | null;
  setCustomHex: (value: CustomHex[] | null) => void;
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

  currentCursor: localStorage.getItem("userCursor") || "select",
  setCurrentCursor: () => {},

  addBrush: false,
  setAddBrush: () => {},

  customBrushes: localStorage.getItem("brushes")
    ? JSON.parse(localStorage.getItem("brushes")!)
    : [],
  setCustomBrushes: () => {},

  currentBrush: null,
  setCurrentBrush: () => {},

  customHex: localStorage.getItem("customHex")
    ? JSON.parse(localStorage.getItem("customHex")!)
    : null,
  setCustomHex: () => {},
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

  const [addBrush, setAddBrush] = useState<boolean>(initialMapState.addBrush);

  const [customBrushes, setCustomBrushes] = useState<HexBrush[]>(
    initialMapState.customBrushes
  );

  const [currentBrush, setCurrentBrush] = useState<null | HexBrush>(
    initialMapState.currentBrush
  );

  const [customHex, setCustomHex] = useState<CustomHex[] | null>(
    initialMapState.customHex
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

        addBrush,
        setAddBrush,

        customBrushes,
        setCustomBrushes,

        currentBrush,
        setCurrentBrush,

        customHex,
        setCustomHex,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
