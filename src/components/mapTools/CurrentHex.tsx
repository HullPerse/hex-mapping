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
import { Slider } from "../ui/slider";

export default function CurrentHex() {
  const { currentHex, customHex, customBrushes, setCustomHex } =
    useContext(MapContext);

  const [allBrushes, setAllBrushes] = useState<
    {
      id: string;
      title: string;
      color: string;
      clickable: boolean;
      image: string | null;
      height: number;
      width: number;
      scale: number;
    }[]
  >([]);

  useEffect(() => {
    setAllBrushes([...preset, ...customBrushes]);
  }, [customBrushes]);

  const [title, setTitle] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [clickable, setClickable] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

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
      setImage(findHex.type.image);
      setHeight(findHex.type.height);
      setWidth(findHex.type.width);
      setScale(findHex.type.scale);

      if (currentPreset !== "defaultPreset") {
        const findBrush = allBrushes.find(item => item.id == currentPreset);
        if (!findBrush) return;

        setTitle(findBrush.title);
        setColor(findBrush.color);
        setClickable(findBrush.clickable);
        setImage(findBrush.image);
        setHeight(findBrush.height);
        setWidth(findBrush.width);
        setScale(findBrush.scale);
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
        findHex[0].type.clickable == clickable &&
        findHex[0].type.image == image &&
        findHex[0].type.height == height &&
        findHex[0].type.width == width &&
        findHex[0].type.scale == scale
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
        image: image || findHex.type.image,
        height: height || findHex.type.height,
        width: width || findHex.type.width,
        scale: scale || findHex.type.scale,
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
                <Switch
                  checked={clickable || false}
                  onCheckedChange={setClickable}
                />
                <p className="text-white font-bold">Clickable</p>
              </section>

              <div className="flex flex-col w-full px-2 mb-1 gap-1">
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
