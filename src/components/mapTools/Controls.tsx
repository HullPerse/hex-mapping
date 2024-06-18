import { useControls } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";

export default function Controls() {
  const { resetTransform } = useControls();

  return (
    <section className="flex w-full h-full px-2 mb-2 items-end">
      <Button
        className="w-full"
        onClick={() => {
          resetTransform();
        }}
      >
        Сбросить
      </Button>
    </section>
  );
}
