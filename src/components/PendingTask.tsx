import { Folder, TriangleAlert } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function PendingTask() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <TriangleAlert
          size={45}
          className="rounded-lg bg-red-500/30 border-1 border-red-500/50 p-2 text-red-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Pending Task</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <p className="text-2xl font-bold">2</p>
            <CardDescription>Task di bulan ini</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
