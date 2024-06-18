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
};

const initialHexParams: HexProps = {
  hexHeight: 5,
  hexWidth: 5,
};

const MapContext = createContext<MapContextType>({
  hexParams: initialHexParams,
  setHexParams: () => {},

  currentHex: null,
  setCurrentHex: () => {},
});

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [hexParams, setHexParams] = useState(initialHexParams);
  const [currentHex, setCurrentHex] = useState<string | null>(null);

  return (
    <MapContext.Provider
      value={{
        hexParams,
        setHexParams,

        currentHex,
        setCurrentHex,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, MapContext };
