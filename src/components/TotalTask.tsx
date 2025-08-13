import { Folder } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function TotalTask() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <Folder
          size={45}
          className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Total Task</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <p className="text-2xl font-bold">10</p>
            <CardDescription>Task di bulan ini</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
