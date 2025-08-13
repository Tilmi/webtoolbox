import { Users } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function ManageTeam() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <Users
          size={45}
          className="rounded-lg bg-purple-500/30 border-1 border-purple-500/50 p-2 text-purple-500 shadow-lg"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Manage Team</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <CardDescription>Manage your team</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
