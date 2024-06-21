import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapContext } from "@/provider/hexMapProvider";
import { Switch } from "@/components/ui/switch";
import { useContext, useRef, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

export default function CustomBrushEdit() {
  const { currentBrush, customBrushes, setCustomBrushes, setAddBrush } =
    useContext(MapContext);

  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("#ffffff");
  const [clickable, setClickable] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentBrush) {
      setTitle(currentBrush.title);
      setColor(currentBrush.color);
      setClickable(currentBrush.clickable);
    }
  }, [currentBrush]);

  const handleUpdate = () => {
    if (!title || !color) return;

    const brushesArray: {
      id: string;
      title: string;
      color: string;
      clickable: boolean;
    }[] = [];

    const findBrush = customBrushes.find(
      brush => brush.id === currentBrush?.id
    );

    if (!findBrush) return;

    findBrush.title = title;
    findBrush.color = color;
    findBrush.clickable = clickable;

    brushesArray.push(...customBrushes);
    brushesArray.push(findBrush);

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
          value={title}
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
                backgroundColor: color,
              }}
            ></div>
            <p className="max-w-[106px] text-ellipsis overflow-hidden text-center font-bold border-t border-white">
              {title}
            </p>
          </div>
        </section>
        <div className="flex flex-col">
          <HexColorPicker color={color} onChange={setColor} />
          <Input
            value={color}
            /* @ts-expect-error next-line */
            onInput={e => setColor(e.target.value)}
            type="text"
            placeholder="Color"
            className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white mt-2"
          />
        </div>
      </div>
      <section className="inline-flex w-full mx-2 gap-2">
        <Switch checked={clickable} onCheckedChange={setClickable} />
        <p className="text-white font-bold">Clickable</p>
      </section>

      <div className="flex w-full px-2 mb-1">
        <Button
          className="w-full"
          onClick={handleUpdate}
          disabled={
            !title ||
            !color ||
            !currentBrush ||
            (currentBrush.title == title &&
              currentBrush.color == color &&
              currentBrush.clickable == clickable)
          }
        >
          Save Changes
        </Button>
      </div>
    </section>
  );
}
