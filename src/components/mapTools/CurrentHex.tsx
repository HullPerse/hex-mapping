import { MapContext } from "@/provider/hexMapProvider";
import { useContext } from "react";

export default function CurrentHex() {
  const { currentHex } = useContext(MapContext);

  return (
    <section className="flex w-full">
      <div className="flex h-16 w-full items-center justify-center border-b-2 border-white">
        <span className="font-bold text-2xl">{currentHex}</span>
      </div>
    </section>
  );
}
