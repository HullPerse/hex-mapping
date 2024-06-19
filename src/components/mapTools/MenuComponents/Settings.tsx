import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapContext } from "@/provider/hexMapProvider";
import { useContext, useRef } from "react";

export default function Settings() {
  const { hexParams, setHexParams } = useContext(MapContext);

  const HeightRef = useRef<HTMLInputElement>(null);
  const WidthRef = useRef<HTMLInputElement>(null);

  const applyDimensions = () => {
    const Height = Number(HeightRef.current?.value);
    const Width = Number(WidthRef.current?.value);

    if (Height < 1 || Width < 1) return;

    setHexParams({ ...hexParams, hexHeight: Height, hexWidth: Width });

    if (!localStorage.getItem("hexParams")) {
      localStorage.setItem("hexParams", JSON.stringify(hexParams));
    } else {
      localStorage.setItem(
        "hexParams",
        JSON.stringify({ ...hexParams, hexHeight: Height, hexWidth: Width })
      );
    }
  };

  return (
    <section className="flex flex-col w-full gap-2">
      <section className="inline-flex w-full px-2 gap-1">
        <Input
          ref={HeightRef}
          min={1}
          max={150}
          defaultValue={hexParams.hexHeight}
          type="number"
          placeholder="Height"
          className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white"
        />
        <Input
          ref={WidthRef}
          min={1}
          max={150}
          defaultValue={hexParams.hexWidth}
          type="number"
          placeholder="Width"
          className="w-full rounded active:outline-none active:border-white focus:outline-none focus:border-white border-white"
        />
      </section>
      <Button className="mx-2" onClick={applyDimensions}>
        Apply
      </Button>
    </section>
  );
}
