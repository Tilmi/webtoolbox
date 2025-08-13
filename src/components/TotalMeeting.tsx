import { CalendarDays, Folder } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function TotalMeeting() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <CalendarDays
          size={45}
          className="rounded-lg bg-purple-500/30 border-1 border-purple-500/50 p-2 text-purple-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Total Meeting</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <p className="text-2xl font-bold">5</p>
            <CardDescription>Meeting di bulan ini</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
