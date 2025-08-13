import { AlarmClock, CalendarCheck, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function UpcomingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-2 mb-4">
          <CalendarCheck
            size={45}
            className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>Meeting Client</CardTitle>
            <div className="flex flex-row items-center gap-1">
              <AlarmClock size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">09.30</p>
              <MapPin size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Zoom Meeting</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 mb-4">
          <CalendarCheck
            size={45}
            className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>Meeting Bulanan</CardTitle>
            <div className="flex flex-row items-center gap-1">
              <AlarmClock size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">09.30</p>
              <MapPin size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Ruang Rapat A</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 mb-4">
          <CalendarCheck
            size={45}
            className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>Meeting Bulanan</CardTitle>
            <div className="flex flex-row items-center gap-1">
              <AlarmClock size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">09.30</p>
              <MapPin size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Ruang Rapat A</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 mb-4">
          <CalendarCheck
            size={45}
            className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>Meeting Bulanan</CardTitle>
            <div className="flex flex-row items-center gap-1">
              <AlarmClock size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">09.30</p>
              <MapPin size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Ruang Rapat A</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 mb-4">
          <CalendarCheck
            size={45}
            className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>Meeting Bulanan</CardTitle>
            <div className="flex flex-row items-center gap-1">
              <AlarmClock size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">09.30</p>
              <MapPin size={15} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Ruang Rapat A</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
