import { Users } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Attendance() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <Users
          size={45}
          className="rounded-lg bg-green-500/30 border-1 border-green-500/50 p-2 text-green-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Attendance</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <p className="text-2xl font-bold">80%</p>
            <CardDescription>Attendance di bulan ini</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
