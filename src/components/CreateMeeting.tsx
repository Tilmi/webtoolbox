import { CalendarPlus } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function CreateMeeting() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <CalendarPlus
          size={45}
          className="rounded-lg bg-green-500/30 border-1 border-green-500/50 p-2 text-green-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Create Meeting</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <CardDescription>Create new meeting</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
