import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Switch } from "@/components/ui/switch";
import { MapContext } from "@/provider/hexMapProvider";
import { uid } from "@/lib/utils";

export default function CustomBrush() {
  const { setAddBrush, customBrushes, setCustomBrushes } =
    useContext(MapContext);

  const [title, setTitle] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>("#ffffff");

  const titleRef = useRef<HTMLInputElement>(null);
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleSave = () => {
    const title = titleRef.current?.value;
    const clickable = switchRef.current?.getAttribute("data-state");

    const id = uid();

    const clickableBoolean = clickable === "checked" ? true : false;

    const brushesArray: {
      id: string;
      title: string;
      color: string;
      clickable: boolean;
    }[] = [];

    if (!title || !color) return;
    if (!customBrushes) {
      brushesArray.push({
        id: id,
        title: title,
        color: color,
        clickable: clickableBoolean,
      });
    } else {
      brushesArray.push(...customBrushes);
      brushesArray.push({
        id: id,
        title: title,
        color: color,
        clickable: clickableBoolean,
      });
    }

    localStorage.setItem("brushes", JSON.stringify(brushesArray));
    setCustomBrushes(brushesArray);
    return setAddBrush(false);
  };

  return (
    <section className="flex flex-col w-full justify-center border-y-2 border-white py-1 gap-4">
      <div className="flex w-full">
        <Input
          ref={titleRef}
          /* @ts-expect-error ts-migrate(2322) */
          onInput={e => setTitle(e.target.value)}
          value={title ? title : ""}
          type="text"
          placeholder="Title"
          className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white mx-2"
          autoFocus
        />
      </div>
      <div className="inline-flex justify-between px-2">
        <section className="flex flex-grow justify-center">
          <div className="max-h-[151px] border border-white rounded items-center justify-center">
            <div
              className={`flex hexagon items-center justify-center delay-0 transition-none border ${
                !color && "after:bg-black"
              }`}
              style={{
                backgroundColor: color ? color : "",
              }}
            ></div>
            <p className="max-w-[106px] text-ellipsis overflow-hidden text-center font-bold border-t border-white">
              {title}
            </p>
          </div>
        </section>
        <div className="flex flex-col">
          <HexColorPicker color={color ? color : ""} onChange={setColor} />
          <Input
            value={color ? color : ""}
            /* @ts-expect-error ts-migrate(2322) */
            onInput={e => setColor(e.target.value)}
            type="text"
            placeholder="Title"
            className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white mt-2"
            autoFocus
          />
        </div>
      </div>
      <section className="inline-flex w-full mx-2 gap-2">
        <Switch ref={switchRef} />
        <p className="text-white font-bold">Clickable</p>
      </section>

      <div className="flex w-full px-2 mb-1">
        <Button className="w-full" onClick={handleSave}>
          Add Brush
        </Button>
      </div>
    </section>
  );
}
