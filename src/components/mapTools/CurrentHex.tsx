import { MapContext } from "@/provider/hexMapProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { HexColorPicker } from "react-colorful";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { preset } from "./MenuComponents/BrushPresets/Brushes";

export default function CurrentHex() {
  const { currentHex, customHex, customBrushes, setCustomHex } =
    useContext(MapContext);

  const [allBrushes, setAllBrushes] = useState<
    { id: string; title: string; color: string; clickable: boolean }[]
  >([]);

  useEffect(() => {
    setAllBrushes([...preset, ...customBrushes]);
  }, [customBrushes]);

  const [title, setTitle] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [clickable, setClickable] = useState<boolean | null>(null);

  const [currentPreset, setCurrentPreset] = useState<string>("defaultPreset");

  const [disabled, setDisabled] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentHex) {
      const findHex = customHex?.find(hex => hex.id === currentHex);
      if (!findHex) return;

      setTitle(findHex.type.title);
      setColor(findHex.type.color);
      setClickable(findHex.type.clickable);

      if (currentPreset !== "defaultPreset") {
        const findBrush = allBrushes.find(item => item.id == currentPreset);
        if (!findBrush) return;

        setTitle(findBrush.title);
        setColor(findBrush.color);
        setClickable(findBrush.clickable);
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHex, customHex, currentPreset]);

  useEffect(() => {
    handleDisable();
  });

  const handleDisable = () => {
    if (!title || !color) return setDisabled(true);

    const findHex = customHex?.filter(hex => hex.id === currentHex);

    if (!findHex) return setDisabled(true);

    if (findHex.length > 0) {
      if (
        findHex[0].type.title == title &&
        findHex[0].type.color == color &&
        findHex[0].type.clickable == clickable
      ) {
        return setDisabled(true);
      } else {
        return setDisabled(false);
      }
    } else {
      return setDisabled(true);
    }
  };

  const handleSave = () => {
    const findHex = customHex?.find(hex => hex.id === currentHex);
    if (!findHex) return;
    if (customHex) {
      customHex.splice(customHex.indexOf(findHex), 1);
    }

    const hexArray = customHex ? [...customHex] : [];

    hexArray.push({
      id: findHex.id,
      type: {
        id: currentPreset,
        title: title || findHex.type.title,
        color: color || findHex.type.color,
        clickable: clickable || findHex.type.clickable,
      },
    });

    localStorage.setItem("customHex", JSON.stringify(hexArray));
    setAllBrushes([...preset, ...customBrushes]);
    setDisabled(true);
    setCustomHex(hexArray);
    return;
  };

  return (
    <section className="flex w-full">
      <div className="flex flex-col w-full items-center justify-center border-b-2 border-white gap-2">
        <span className="font-bold text-2xl mb-2">
          Current Hex: {currentHex}
        </span>
        {title && color && (
          <div className="flex flex-col w-full justify-center py-1 gap-4">
            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full px-2">
                <Select
                  defaultValue="defaultPreset"
                  onValueChange={setCurrentPreset}
                >
                  <SelectTrigger className="hover:cursor-pointer rounded border-white">
                    <SelectValue placeholder="Hex Preset" />
                  </SelectTrigger>
                  <SelectContent className="hover:cursor-pointer w-full rounded">
                    <SelectItem
                      value="defaultPreset"
                      className="inline-flex focus:bg-white/10"
                    >
                      <span className="text-base font-bold">
                        Current Preset
                      </span>
                    </SelectItem>
                    {allBrushes.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.id}
                        className="inline-flex focus:bg-white/10"
                      >
                        <span className="text-base font-bold">
                          {item.title}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full px-2">
                <Input
                  ref={titleRef}
                  /* @ts-expect-error next-line */
                  onInput={e => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Title"
                  className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white"
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
                <Switch
                  checked={clickable || false}
                  onCheckedChange={setClickable}
                />
                <p className="text-white font-bold">Clickable</p>
              </section>
              <div className="flex w-full px-2 mb-1">
                <Button
                  className="w-full"
                  onClick={handleSave}
                  disabled={disabled}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
