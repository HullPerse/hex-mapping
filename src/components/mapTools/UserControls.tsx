import { getBrushIcon } from "@/lib/utils";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useContext } from "react";
import { MapContext } from "@/provider/hexMapProvider";

export default function UserControls() {
  const { currentCursor, setCurrentCursor } = useContext(MapContext);

  const userControls = {
    select: {
      title: "select",
      image: "select",
    },
    brush: {
      title: "brush",
      image: "brush",
    },
    eraser: {
      title: "eraser",
      image: "eraser",
    },
    settings: {
      title: "settings",
      image: "settings",
    },
  };

  const handleCursorChange = (e: string) => {
    localStorage.setItem("userCursor", e);

    return setCurrentCursor(e);
  };

  return (
    <ToggleGroup
      defaultValue={currentCursor}
      onValueChange={handleCursorChange}
      type="single"
      className="inline-flex w-full justify-start items-center border-b-2 border-white -gap-1"
    >
      {Object.entries(userControls).map(([key, value]) => (
        <ToggleGroupItem
          key={key}
          value={key}
          className="h-16 w-16 hover:bg-white/20 hover:text-white border-r-2 border-white"
        >
          {getBrushIcon(value.image)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
