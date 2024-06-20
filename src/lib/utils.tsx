import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { MousePointer, Brush, Settings, Eraser } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBrushIcon(type: string) {
  switch (type) {
    case "select":
      return <MousePointer className="h-7 w-7" />;
    case "brush":
      return <Brush className="h-7 w-7" />;
    case "settings":
      return <Settings className="h-7 w-7" />;
    case "eraser":
      return <Eraser className="h-7 w-7" />;
    default:
      return <MousePointer className="h-7 w-7" />;
  }
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
