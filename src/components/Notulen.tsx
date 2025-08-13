import { NotebookPen } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Notulen() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <NotebookPen
          size={45}
          className="rounded-lg bg-pink-500/30 border-1 border-pink-500/50 p-2 text-pink-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Notulen</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <CardDescription>Create new notulen</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
