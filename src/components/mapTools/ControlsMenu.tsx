import { MapContext } from "@/provider/hexMapProvider";
import { useContext } from "react";
import Select from "./MenuComponents/Select";
import Settings from "./MenuComponents/Settings";
import Brush from "./MenuComponents/Brush";

export default function ControlsMeny() {
  const { currentCursor } = useContext(MapContext);
  switch (currentCursor) {
    case "select":
      return <Select />;
    case "brush":
      return <Brush />;
    case "settings":
      return <Settings />;
    default:
      return <Select />;
  }
}
