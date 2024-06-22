import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Switch } from "@/components/ui/switch";
import { MapContext } from "@/provider/hexMapProvider";
import { uid } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export default function CustomBrush() {
  const { setAddBrush, customBrushes, setCustomBrushes } =
    useContext(MapContext);

  const [title, setTitle] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>("#ffffff");
  const [image, setImage] = useState<string | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  const titleRef = useRef<HTMLInputElement>(null);
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleSave = () => {
    const title = titleRef.current?.value;
    const clickable = switchRef.current?.getAttribute("data-state");

    const id = uid();

    const clickableBoolean = clickable === "checked";

    const brushesArray: {
      id: string;
      title: string;
      color: string;
      clickable: boolean;
      image: string | null;
      height: number;
      width: number;
      scale: number;
    }[] = [];

    if (!title || !color) return;
    if (customBrushes.length <= 0) {
      brushesArray.push({
        id: id,
        title: title,
        color: color,
        clickable: clickableBoolean,
        image: image,
        height: height,
        width: width,
        scale: scale,
      });
    } else {
      brushesArray.push(...customBrushes);
      brushesArray.push({
        id: id,
        title: title,
        color: color,
        clickable: clickableBoolean,
        image: image,
        height: height,
        width: width,
        scale: scale,
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
          /* @ts-expect-error next-line */
          onInput={e => setTitle(e.target.value)}
          value={title || ""}
          type="text"
          placeholder="Title"
          className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white mx-2"
          autoFocus
        />
      </div>
      <div className="inline-flex justify-between px-2">
        <section className="flex flex-grow justify-center">
          <div className="flex flex-col max-h-[151px] border border-white rounded items-center justify-center">
            <div
              className={`flex hexagon items-center justify-center delay-0 transition-none border ${
                !color && "after:bg-black"
              }`}
              style={{
                backgroundColor: color || "",
              }}
            >
              {image && (
                <img
                  src={image}
                  alt="brush"
                  style={{
                    transform: `translate(${width}%, ${height}%) scale(${scale})`,
                  }}
                />
              )}
            </div>
            <p className="min-w-[106px] max-w-[106px] text-ellipsis overflow-hidden text-center font-bold border-t border-white">
              {title}
            </p>
          </div>
        </section>
        <div className="flex flex-col">
          <HexColorPicker color={color || ""} onChange={setColor} />
        </div>
      </div>
      <div className="flex flex-col mx-2">
        <div className="flex inline-flex gap-2">
          <Input
            value={image || ""}
            /* @ts-expect-error next-line */
            onInput={e => setImage(e.target.value)}
            type="text"
            placeholder="Image Url"
            className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white mt-2"
          />
          <Input
            value={color || ""}
            /* @ts-expect-error next-line */
            onInput={e => setColor(e.target.value)}
            type="text"
            placeholder="Color"
            className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white mt-2"
          />
        </div>

        <div className="inline-flex w-full mt-4 gap-2">
          <div className="w-full">
            <div className="inline-flex gap-1">
              <span>Height:</span>
              <span className="text-accent">{height}</span>
            </div>
            <Slider
              defaultValue={[height]}
              min={-50}
              max={50}
              step={1}
              onValueChange={e => {
                setHeight(e[0]);
              }}
              disabled={!image}
            />
          </div>
          <div className="w-full">
            <div className="inline-flex gap-1">
              <span>Width:</span>
              <span className="text-accent">{width}</span>
            </div>
            <Slider
              defaultValue={[width]}
              min={-50}
              max={50}
              step={1}
              onValueChange={e => {
                setWidth(e[0]);
              }}
              disabled={!image}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="inline-flex gap-1">
            <span>Scale:</span>
            <span className="text-accent">{scale}</span>
          </div>
          <Slider
            defaultValue={[scale]}
            min={0.1}
            max={10}
            step={0.1}
            onValueChange={e => {
              setScale(e[0]);
            }}
            disabled={!image}
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
