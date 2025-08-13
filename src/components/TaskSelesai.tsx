import { Folder, FolderCheck } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function TaskSelesai() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <FolderCheck
          size={45}
          className="rounded-lg bg-green-500/30 border-1 border-green-500/50 p-2 text-green-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Task Selesai</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <p className="text-2xl font-bold">8</p>
            <CardDescription>Task di bulan ini</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
