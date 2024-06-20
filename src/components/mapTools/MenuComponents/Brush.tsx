import { Minus, Plus, X, CircleOff, CircleCheckBig } from "lucide-react";
import { preset } from "./BrushPresets/Brushes";
import { useContext } from "react";
import { MapContext } from "@/provider/hexMapProvider";

export default function Brush() {
  const { setAddBrush, addBrush, customBrushes } = useContext(MapContext);

  return (
    <section className="inline-flex flex-wrap justify-start gap-2 mx-2 items-center">
      {Array.from({ length: preset.length }).map((_, index) => (
        <div
          key={index}
          className="relative border border-white rounded hexagonOverlay max-w-[106px] max-h-[131px]"
        >
          {preset[index].clickable ? (
            <div
              className="absolute z-10 m-1 bg-white rounded p-1 right-0 pointer-events-none"
              title="Clickable"
            >
              <CircleCheckBig
                className="w-4 h-4 pointer-events-none rounded"
                color="green"
              />
            </div>
          ) : (
            <div
              className="absolute z-10 m-1 bg-white rounded p-1 right-0 pointer-events-none"
              title="Not Clickable"
            >
              <CircleOff
                className="w-4 h-4 pointer-events-none rounded"
                color="red"
              />
            </div>
          )}
          <div
            className={`flex hexagon items-center justify-center delay-0 transition-none border ${
              !preset[index].color && "after:bg-black"
            }`}
            style={{
              backgroundColor: preset[index].color ? preset[index].color : "",
            }}
          ></div>
          <p className="max-w-[106px] text-ellipsis overflow-hidden text-center font-bold border-t border-white">
            {preset[index].title}
          </p>
        </div>
      ))}
      {customBrushes &&
        customBrushes.map(
          (
            brush: { title: string; color: string; clickable: boolean },
            index: number
          ) => (
            <div
              key={index}
              className="relative border border-white rounded hexagonOverlay"
            >
              {brush.clickable ? (
                <div
                  className="absolute z-10 m-1 bg-white rounded p-1 right-0 pointer-events-none"
                  title="Clickable"
                >
                  <CircleCheckBig
                    className="w-4 h-4 pointer-events-none rounded"
                    color="green"
                  />
                </div>
              ) : (
                <div
                  className="absolute z-10 m-1 bg-white rounded p-1 right-0 pointer-events-none"
                  title="Not Clickable"
                >
                  <CircleOff
                    className="w-4 h-4 pointer-events-none rounded"
                    color="red"
                  />
                </div>
              )}
              <div
                className={`flex hexagon items-center justify-center delay-0 transition-none border ${
                  !brush.color && "after:bg-black"
                }`}
                style={{
                  backgroundColor: brush.color ? brush.color : "",
                }}
              >
                {brush.clickable ? (
                  <div className="absolute top-0 right-0 z-10">
                    <X className="w-4 h-4 pointer-events-none" />
                  </div>
                ) : (
                  "false"
                )}
              </div>
              <p className="max-w-[106px] text-ellipsis overflow-hidden text-center font-bold border-t border-white">
                {brush.title}
              </p>
            </div>
          )
        )}
      <div
        className={`flex items-center justify-center border border-white rounded hexagonOverlay h-[100px] w-[100px] ${
          !addBrush ? "scale-100" : "scale-90"
        } transition-transform duration-300 ease-out`}
        onClick={() => setAddBrush(!addBrush)}
      >
        {addBrush ? (
          <Minus className="w-12 h-12 pointer-events-none" />
        ) : (
          <Plus className="w-12 h-12 pointer-events-none" />
        )}
      </div>
    </section>
  );
}
