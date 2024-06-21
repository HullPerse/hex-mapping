import { useContext } from "react";
import { MapContext } from "./provider/hexMapProvider";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Controls from "@/components/mapTools/Controls";
import CurrentHex from "@/components/mapTools/CurrentHex";
import UserControls from "@/components/mapTools/UserControls";
import ControlsMenu from "@/components/mapTools/ControlsMenu";
import CustomBrush from "./components/mapTools/MenuComponents/CustomBrush";
import CustomBrushEdit from "./components/mapTools/MenuComponents/CustomBrushEdit";

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

function App() {
  const {
    hexParams,
    currentHex,
    setCurrentHex,
    currentCursor,
    addBrush,
    currentBrush,
    customHex,
    setCustomHex,
  } = useContext(MapContext);

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (!currentCursor) return;

    if (currentCursor === "brush") {
      if (!currentBrush) return;
      const hexId = `${rowIndex}-${colIndex}`;

      const hexArray: CustomHex[] = customHex ? [...customHex] : [];

      const existingHex = hexArray.find(hex => hex.id === hexId);
      if (existingHex) {
        hexArray.splice(hexArray.indexOf(existingHex), 1);
      }

      hexArray.push({
        id: hexId,
        type: {
          id: currentBrush.id,
          title: currentBrush.title,
          color: currentBrush.color,
          clickable: currentBrush.clickable,
        },
      });

      localStorage.setItem("customHex", JSON.stringify(hexArray));
      setCustomHex(hexArray);
      return;
    }

    if (currentCursor == "eraser") {
      const hexId = `${rowIndex}-${colIndex}`;
      const hexArray: CustomHex[] = customHex ? [...customHex] : [];
      const existingHex = hexArray.find(hex => hex.id === hexId);
      if (existingHex) {
        hexArray.splice(hexArray.indexOf(existingHex), 1);
        localStorage.setItem("customHex", JSON.stringify(hexArray));
        setCustomHex(hexArray);
      }
      return;
    }

    if (currentCursor === "select") {
      const selectedHexId = `${rowIndex}-${colIndex}`;
      if (currentHex === selectedHexId) {
        setCurrentHex(null);
      } else {
        setCurrentHex(selectedHexId);
      }

      return;
    }
  };

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
        <section className="flex flex-col md:w-[680px] h-full border-2 border-white rounded gap-2 overflow-y-auto overflow-x-hidden">
          <UserControls />

          {currentCursor && <ControlsMenu />}
          {currentCursor == "brush" && addBrush && <CustomBrush />}
          {currentCursor == "brush" &&
            currentBrush &&
            !["1", "2"].includes(currentBrush.id) && <CustomBrushEdit />}

          {currentHex && <CurrentHex />}
          <Controls />
        </section>

        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          wrapperClass="flex w-full h-full border-2 border-white rounded"
        >
          {Array.from({ length: hexParams.hexHeight }).map((_, rowIndex) => (
            <div
              key={rowIndex + 1}
              className="row flex justify-center items-center w-full "
            >
              {Array.from({ length: hexParams.hexWidth }).map((_, colIndex) => {
                const hex = customHex?.filter(
                  hex => hex.id == `${rowIndex}-${colIndex}`
                )[0];
                return (
                  <div
                    key={colIndex + 1}
                    id={`${rowIndex + 1}-${colIndex + 1}`}
                    className={`hexagon hover:transition-none hover:delay-0 hover:cursor-pointer hover:bg-white ${
                      hex?.type.color
                        ? `after:bg-[${hex.type.color}] hover:after:bg-white/40`
                        : currentHex == `${rowIndex}-${colIndex}`
                        ? "after:bg-white/20"
                        : "after:bg-black"
                    }`}
                    style={{
                      backgroundColor: hex?.type.color || "",
                    }}
                    onClick={() => handleClick(rowIndex, colIndex)}
                  >
                    <div className="flex w-full h-full items-center justify-center">
                      {currentHex == `${rowIndex}-${colIndex}` && "Current Hex"}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </TransformComponent>
      </TransformWrapper>
    </main>
  );
}

export default App;
