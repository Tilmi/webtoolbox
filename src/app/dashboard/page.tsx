import AddTask from "@/components/addtask";
import CreateMeeting from "@/components/CreateMeeting";
import ManageTeam from "@/components/ManageTeam";
import Notulen from "@/components/Notulen";
import PendingTask from "@/components/PendingTask";

import TaskCard from "@/components/TaskCard";
import TaskSelesai from "@/components/TaskSelesai";
import TotalMeeting from "@/components/TotalMeeting";
import TotalTask from "@/components/TotalTask";
import UpcomingCard from "@/components/UpcomingCard";

export default function Page() {
  return (
    <div className="grid p-2">
      <h1 className="px-1 text-2xl font-bold mb-2">Dashboard Toolbox</h1>
      <main className="grid space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <TotalTask />
          </div>
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <TaskSelesai />
          </div>
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <PendingTask />
          </div>
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <TotalMeeting />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-4 md:col-span-2 sm:grid-cols-1">
            <TaskCard />
          </div>
          <div className="lg:col-span-2 md:col-span-1 sm:grid-cols-1">
            <UpcomingCard />
          </div>
        </div>
        <h1 className="text-xl font-bold">Quick Action</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 md:col-span-1 sm:grid-cols-1">
            <AddTask />
          </div>
          <div className="lg:col-span-1 md:col-span-1 sm:grid-cols-1">
            <CreateMeeting />
          </div>
          <div className="lg:col-span-1 md:col-span-1 sm:grid-cols-1">
            <ManageTeam />
          </div>
          <div className="lg:col-span-1 md:col-span-1 sm:grid-cols-1">
            <Notulen />
          </div>
        </div>
      </main>
    </div>
  );
}
