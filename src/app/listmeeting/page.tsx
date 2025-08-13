// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { MeetingList } from "@/components/meetings/meeting-list";
// import { MeetingForm } from "@/components/meetings/meeting-form";
// import { getAllMeetings, mockMeetings } from "@/lib/listmeeting/mock-data";
// import { Meeting, MeetingFormData } from "@/lib/listmeeting/types";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// type ViewMode = "list" | "edit";

// export default function MeetingsPage() {
//   const router = useRouter();
//   const [meetings, setMeetings] = useState<Meeting[]>(getAllMeetings());
//   const [currentView, setCurrentView] = useState<ViewMode>("list");
//   const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [meetingToDelete, setMeetingToDelete] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Generate unique ID
//   const generateId = () => {
//     return Math.max(...meetings.map((m) => parseInt(m.id)), 0) + 1;
//   };

//   // Handle meeting click (navigate to detail)
//   const handleMeetingClick = (meetingId: string) => {
//     router.push(`/listmeeting/${meetingId}`);
//   };

//   // Handle create new meeting - navigate to add meeting page
//   const handleCreateMeeting = () => {
//     router.push("/addmeeting");
//   };

//   // Handle edit meeting
//   const handleEditMeeting = (meetingId: string) => {
//     const meeting = meetings.find((m) => m.id === meetingId);
//     if (meeting) {
//       setEditingMeeting(meeting);
//       setCurrentView("edit");
//     }
//   };

//   // Handle save meeting (update only, create is handled in /addmeeting)
//   const handleSaveMeeting = async (formData: MeetingFormData) => {
//     if (!editingMeeting) return;

//     setIsLoading(true);

//     try {
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Update existing meeting
//       const updatedMeeting: Meeting = {
//         ...editingMeeting,
//         ...formData,
//         agenda: formData.agenda.filter((item) => item.trim() !== ""),
//         decisions: formData.decisions.filter((item) => item.trim() !== ""),
//         actionItems: formData.actionItems.map((item, index) => ({
//           ...item,
//           id:
//             editingMeeting.actionItems[index]?.id ||
//             `${editingMeeting.id}-action-${index + 1}`,
//         })),
//         attendees: formData.attendees.map((attendee, index) => ({
//           ...attendee,
//           id:
//             editingMeeting.attendees[index]?.id ||
//             `${editingMeeting.id}-attendee-${index + 1}`,
//         })),
//         updatedAt: new Date().toISOString(),
//       };

//       setMeetings((prev) =>
//         prev.map((m) => (m.id === editingMeeting.id ? updatedMeeting : m))
//       );
//       toast.success("Meeting berhasil diperbarui!");

//       setCurrentView("list");
//       setEditingMeeting(null);
//     } catch (error) {
//       toast.error("Terjadi kesalahan saat menyimpan meeting");
//       console.error("Error saving meeting:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle delete meeting
//   const handleDeleteMeeting = (meetingId: string) => {
//     setMeetingToDelete(meetingId);
//     setDeleteDialogOpen(true);
//   };

//   // Confirm delete meeting
//   const confirmDeleteMeeting = async () => {
//     if (!meetingToDelete) return;

//     setIsLoading(true);

//     try {
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       setMeetings((prev) => prev.filter((m) => m.id !== meetingToDelete));
//       toast.success("Meeting berhasil dihapus!");
//     } catch (error) {
//       toast.error("Terjadi kesalahan saat menghapus meeting");
//       console.error("Error deleting meeting:", error);
//     } finally {
//       setIsLoading(false);
//       setDeleteDialogOpen(false);
//       setMeetingToDelete(null);
//     }
//   };

//   // Handle cancel form
//   const handleCancelForm = () => {
//     setCurrentView("list");
//     setEditingMeeting(null);
//   };

//   // Render based on current view
//   const renderContent = () => {
//     switch (currentView) {
//       case "edit":
//         return (
//           <MeetingForm
//             meeting={editingMeeting}
//             onSave={handleSaveMeeting}
//             onCancel={handleCancelForm}
//             isLoading={isLoading}
//           />
//         );
//       default:
//         return (
//           <MeetingList
//             meetings={meetings}
//             onMeetingClick={handleMeetingClick}
//             onEditMeeting={handleEditMeeting}
//             onDeleteMeeting={handleDeleteMeeting}
//             onCreateMeeting={handleCreateMeeting}
//           />
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="container mx-auto px-4 py-8">{renderContent()}</div>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Hapus Meeting</DialogTitle>
//             <DialogDescription>
//               Apakah Anda yakin ingin menghapus meeting ini? Tindakan ini tidak
//               dapat dibatalkan.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setDeleteDialogOpen(false)}
//               disabled={isLoading}
//             >
//               Batal
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={confirmDeleteMeeting}
//               disabled={isLoading}
//             >
//               {isLoading ? "Menghapus..." : "Hapus"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MeetingList } from "@/components/meetings/meeting-list";
import { MeetingForm } from "@/components/meetings/meeting-form";
import { getAllMeetings, mockMeetings } from "@/lib/listmeeting/mock-data";
import { Meeting, MeetingFormData } from "@/lib/listmeeting/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ViewMode = "list" | "edit";

export default function MeetingsPage() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>(getAllMeetings());
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate unique ID
  const generateId = () => {
    return Math.max(...meetings.map((m) => parseInt(m.id)), 0) + 1;
  };

  // Handle meeting click (navigate to detail)
  const handleMeetingClick = (meetingId: string) => {
    router.push(`/listmeeting/${meetingId}`);
  };

  // Handle create new meeting - navigate to add meeting page
  const handleCreateMeeting = () => {
    router.push("/addmeeting");
  };

  // Handle edit meeting
  const handleEditMeeting = (meetingId: string) => {
    const meeting = meetings.find((m) => m.id === meetingId);
    if (meeting) {
      setEditingMeeting(meeting);
      setCurrentView("edit");
    }
  };

  // Handle save meeting (update only, create is handled in /addmeeting)
  const handleSaveMeeting = async (formData: MeetingFormData) => {
    if (!editingMeeting) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update existing meeting
      const updatedMeeting: Meeting = {
        ...editingMeeting,
        ...formData,
        agenda: formData.agenda.filter((item) => item.trim() !== ""),
        decisions: formData.decisions.filter((item) => item.trim() !== ""),
        actionItems: formData.actionItems.map((item, index) => ({
          ...item,
          id:
            editingMeeting.actionItems[index]?.id ||
            `${editingMeeting.id}-action-${index + 1}`,
        })),
        attendees: formData.attendees.map((attendee, index) => ({
          ...attendee,
          id:
            editingMeeting.attendees[index]?.id ||
            `${editingMeeting.id}-attendee-${index + 1}`,
        })),
        updatedAt: new Date().toISOString(),
      };

      setMeetings((prev) =>
        prev.map((m) => (m.id === editingMeeting.id ? updatedMeeting : m))
      );
      toast.success("Meeting berhasil diperbarui!");

      setCurrentView("list");
      setEditingMeeting(null);
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan meeting");
      console.error("Error saving meeting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete meeting
  const handleDeleteMeeting = (meetingId: string) => {
    setMeetingToDelete(meetingId);
    setDeleteDialogOpen(true);
  };

  // Confirm delete meeting
  const confirmDeleteMeeting = async () => {
    if (!meetingToDelete) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setMeetings((prev) => prev.filter((m) => m.id !== meetingToDelete));
      toast.success("Meeting berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus meeting");
      console.error("Error deleting meeting:", error);
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
      setMeetingToDelete(null);
    }
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setCurrentView("list");
    setEditingMeeting(null);
  };

  // Render based on current view
  const renderContent = () => {
    switch (currentView) {
      case "edit":
        return (
          <MeetingForm
            meeting={editingMeeting}
            onSave={handleSaveMeeting}
            onCancel={handleCancelForm}
            isLoading={isLoading}
          />
        );
      default:
        return (
          <MeetingList
            meetings={meetings}
            onMeetingClick={handleMeetingClick}
            onEditMeeting={handleEditMeeting}
            onDeleteMeeting={handleDeleteMeeting}
            onCreateMeeting={handleCreateMeeting}
          />
        );
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto ">{renderContent()}</div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">
              Hapus Meeting
            </DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Apakah Anda yakin ingin menghapus meeting ini? Tindakan ini tidak
              dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteMeeting}
              disabled={isLoading}
            >
              {isLoading ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
