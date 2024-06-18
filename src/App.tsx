import { useContext } from "react";
import { MapContext } from "./provider/hexMapProvider";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Controls from "@/components/mapTools/Controls";
import CurrentHex from "@/components/mapTools/CurrentHex";

function App() {
  const { currentHex, setCurrentHex } = useContext(MapContext);

  return (
    <main
      className="inline-flex flex-row-reverse h-full w-full my-2 overflow-hidden"
      style={{ height: `calc(100vh - 1rem)` }}
      onContextMenu={e => e.preventDefault()}
    >
      <TransformWrapper
        initialScale={0.5}
        minScale={0.5}
        doubleClick={{ disabled: true }}
        panning={{ allowLeftClickPan: false }}
        disablePadding
        centerOnInit
      >
        {/* Controls */}
        <section className="flex flex-col w-[680px] h-full items-center border-2 border-white rounded mr-2">
          <CurrentHex />
          <Controls />
        </section>

        {/* Map Editor */}
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          wrapperClass="flex w-full h-full border-2 border-white rounded mx-2"
        >
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div
              key={rowIndex + 1}
              className="row flex justify-center items-center w-full "
            >
              {Array.from({ length: 10 }).map((_, colIndex) => (
                <div
                  key={colIndex + 1}
                  id={`${rowIndex + 1}-${colIndex + 1}`}
                  className={`hexagon hover:transition-none hover:delay-0 cursor-pointer ${
                    currentHex == `${rowIndex}-${colIndex}`
                      ? "after:bg-white/20"
                      : "after:bg-black hover:bg-white"
                  }`}
                  onClick={() => {
                    setCurrentHex(`${rowIndex}-${colIndex}`);
                  }}
                >
                  <div className="flex w-full h-full items-center justify-center">
                    {"text here"}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </TransformComponent>
      </TransformWrapper>
    </main>
  );
}

export default App;
