// components/teams/view-toggle.tsx
"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: "card" | "table";
  onViewChange: (view: "card" | "table") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center border rounded-lg p-1 ">
      <Button
        variant={view === "card" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("card")}
        className={`flex items-center gap-2 h-9 px-3 ${
          view === "card"
            ? "bg-black dark:bg-white shadow-sm border dark:text-black"
            : "hover:bg-gray-100 dark:text-white border-transparent"
        } transition-all duration-200`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">Cards</span>
      </Button>
      <Button
        variant={view === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("table")}
        className={`flex items-center gap-2 h-9 px-3 ${
          view === "table"
            ? "bg-black dark:bg-white shadow-sm border dark:text-black"
            : "hover:bg-gray-100 dark:text-white border-transparent"
        } transition-all duration-200`}
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">Table</span>
      </Button>
    </div>
  );
}
