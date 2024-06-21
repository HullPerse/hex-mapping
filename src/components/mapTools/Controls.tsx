import { useControls } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export default function Controls() {
  const { resetTransform } = useControls();

  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <section className="flex flex-col w-full h-full items-center justify-end gap-2 ">
      <div className="inline-flex w-full gap-2 px-2">
        <Input id="loadjson" type="file" className="hidden" accept=".json" />
        <Button
          className="w-full"
          onClick={() => {
            alert("Not implemented yet");
          }}
          disabled={isDownloading}
        >
          Save JSON
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            const button = document.getElementById("loadjson");
            if (button) return button.click();
          }}
        >
          Load JSON
        </Button>
      </div>
      <div className="w-full px-2 mb-2">
        <Button
          className="w-full"
          onClick={() => {
            resetTransform();
          }}
        >
          Reset Camera
        </Button>
      </div>
    </section>
  );
}
