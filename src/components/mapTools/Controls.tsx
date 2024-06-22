import { useControls } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useContext, useState } from "react";
import { MapContext } from "@/provider/hexMapProvider";

interface HexBrush {
  id: string;
  title: string;
  color: string;
  clickable: boolean;
  image: string | null;
  height: number;
  width: number;
  scale: number;
}

interface CustomHex {
  id: string;
  type: HexBrush;
}

export default function Controls() {
  const { resetTransform } = useControls();

  const { customHex, setCustomHex } = useContext(MapContext);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({ ...customHex })
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "map.json";
    link.click();

    setIsDownloading(false);
    return;
  };

  const handleUpload = () => {
    const input = document.getElementById("loadjson");
    if (!input) return;

    input.onchange = () => {
      //@ts-expect-error next-line
      if (input.files.length <= 0) return;

      const reader = new FileReader(); // File reader to read the file

      // This event listener will happen when the reader has read the file
      reader.onload = () => {
        const result = reader.result; // Parse the result into an object
        if (!result) return;
        const parsedResult = JSON.parse(result as string);

        const hexArray: CustomHex[] = [];

        Object.entries(parsedResult).forEach(([, hex]) => {
          hexArray.push({ ...(hex as CustomHex) });
        });

        setCustomHex(hexArray);
        localStorage.setItem("customHex", JSON.stringify(hexArray));
        reader.abort();
      };

      //@ts-expect-error next-line
      reader.readAsText(input.files[0]);
    };
  };

  return (
    <section className="flex flex-col w-full h-full items-center justify-end gap-2 ">
      <div className="inline-flex w-full gap-2 px-2">
        <Input
          id="loadjson"
          type="file"
          className="hidden"
          accept=".json"
          onInput={handleUpload}
        />
        <Button
          className="w-full"
          onClick={handleDownload}
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
