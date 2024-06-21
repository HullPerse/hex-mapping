import { MapContext } from "@/provider/hexMapProvider";
import { useContext } from "react";
import Settings from "./MenuComponents/Settings";
import Brush from "./MenuComponents/Brush";

export default function ControlsMeny() {
  const { currentCursor } = useContext(MapContext);
  switch (currentCursor) {
    case "select":
      return;
    case "brush":
      return <Brush />;
    case "settings":
      return <Settings />;
    case "eraser":
      return;
    default:
      return;
  }
}
