import { useContext } from "react";
import { MapContext } from "./provider/hexMapProvider";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Controls from "@/components/mapTools/Controls";
import CurrentHex from "@/components/mapTools/CurrentHex";
import UserControls from "@/components/mapTools/UserControls";
import ControlsMenu from "@/components/mapTools/ControlsMenu";

function App() {
  const { hexParams, currentHex, setCurrentHex, currentCursor } =
    useContext(MapContext);

  return (
    <main
      className="flex md:flex-row flex-col md:flex-row-reverse h-full w-full my-2 overflow-hidden gap-2 px-2"
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
        <section className="flex flex-col md:w-[680px] h-full border-2 border-white rounded gap-2">
          <UserControls />

          {currentCursor && <ControlsMenu />}

          {/* <CurrentHex /> */}
          <div className="flex w-full h-fit px-2 my-2 items-end border-y-2 border-white">
            <div>asd</div>
          </div>
          <Controls />
        </section>

        {/* Map Editor */}
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          wrapperClass="flex w-full h-full border-2 border-white rounded"
        >
          {Array.from({ length: hexParams.hexHeight }).map((_, rowIndex) => (
            <div
              key={rowIndex + 1}
              className="row flex justify-center items-center w-full "
            >
              {Array.from({ length: hexParams.hexWidth }).map((_, colIndex) => (
                <div
                  key={colIndex + 1}
                  id={`${rowIndex + 1}-${colIndex + 1}`}
                  className={`hexagon hover:transition-none hover:delay-0 cursor-pointer ${
                    currentHex == `${rowIndex}-${colIndex}`
                      ? "after:bg-white/20"
                      : "after:bg-black hover:bg-white"
                  }`}
                  onClick={() => {
                    if (!currentCursor) return;

                    if (currentCursor == "select") {
                      if (currentHex == `${rowIndex}-${colIndex}`) {
                        return setCurrentHex(null);
                      }

                      setCurrentHex(`${rowIndex}-${colIndex}`);
                    }
                  }}
                >
                  <div className="flex w-full h-full items-center justify-center">
                    {"Current Hex"}
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
