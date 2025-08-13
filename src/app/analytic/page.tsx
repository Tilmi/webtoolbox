import TotalMeeting from "@/components/TotalMeeting";
import TotalTask from "@/components/TotalTask";

import Attendance from "@/components/Attendance";
import { TaskChart } from "@/components/analytic/TaskChart";

import { MeetingAttendanceChart } from "@/components/analytic/MeetingAttendanceChart";
import Productivity from "@/components/analytic/Productivity";

import TeamRadarChart from "@/components/analytic/TeamRadar";
import MeetingEfficiencyChart from "@/components/analytic/MeetingEfficient";

export default function AnalyticPage() {
  return (
    <div className="grid p-2">
      <h1 className="text-xl font-bold mb-2">Analytics</h1>
      <main className="grid space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <TotalTask />
          </div>
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <TotalMeeting />
          </div>
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <Attendance />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
            <TaskChart />
          </div>

          <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
            <MeetingAttendanceChart />
          </div>
          <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
            <Productivity />
          </div>
          <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
            <TeamRadarChart />
          </div>
          <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
            <MeetingEfficiencyChart />
          </div>
        </div>
      </main>
    </div>
  );
}
