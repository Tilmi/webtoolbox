import { FilePlus } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function AddTask() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <FilePlus
          size={45}
          className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Create Task</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <CardDescription>Create new task</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
