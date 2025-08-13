// "use client";

// import React, { useState } from "react";
// import { format } from "date-fns";
// import { id as localeId } from "date-fns/locale";
// import {
//   ArrowLeft,
//   Calendar,
//   Clock,
//   MapPin,
//   Users,
//   User,
//   FileText,
//   Download,
//   Edit,
//   Trash2,
//   CheckCircle,
//   Circle,
//   AlertCircle,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Meeting, PDFExportOptions } from "@/lib/listmeeting/types";
// import { exportMeetingToPDF } from "@/lib/listmeeting/pdf-generator";
// import Link from "next/link";

// interface MeetingDetailProps {
//   meeting: Meeting;
//   onBack: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// const statusColors = {
//   scheduled: "bg-blue-100 text-blue-800",
//   ongoing: "bg-yellow-100 text-yellow-800",
//   completed: "bg-green-100 text-green-800",
//   cancelled: "bg-red-100 text-red-800",
// };

// const statusLabels = {
//   scheduled: "Terjadwal",
//   ongoing: "Berlangsung",
//   completed: "Selesai",
//   cancelled: "Dibatalkan",
// };

// const actionItemStatusColors = {
//   pending: "text-gray-600",
//   "in-progress": "text-yellow-600",
//   completed: "text-green-600",
// };

// const actionItemStatusLabels = {
//   pending: "Pending",
//   "in-progress": "In Progress",
//   completed: "Completed",
// };

// export function MeetingDetail({
//   meeting,
//   onBack,
//   onEdit,
//   onDelete,
// }: MeetingDetailProps) {
//   const [exportOptions, setExportOptions] = useState<PDFExportOptions>({
//     includeAgenda: true,
//     includeDecisions: true,
//     includeActionItems: true,
//     includeAttendees: true,
//     includeSignatures: true,
//   });

//   const formatMeetingDateTime = (dateStr: string, timeStr: string) => {
//     try {
//       const date = new Date(`${dateStr}T${timeStr}`);
//       return format(date, "EEEE, dd MMMM yyyy", { locale: localeId });
//     } catch {
//       return `${dateStr} ${timeStr}`;
//     }
//   };

//   const handleExportPDF = () => {
//     exportMeetingToPDF(meeting, exportOptions);
//   };

//   const presentAttendees = meeting.attendees.filter((a) => a.isPresent);
//   const absentAttendees = meeting.attendees.filter((a) => !a.isPresent);

//   const completedActionItems = meeting.actionItems.filter(
//     (item) => item.status === "completed"
//   ).length;
//   const totalActionItems = meeting.actionItems.length;

//   return (
//     <div className="min-h-screen p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
//       {/* Header - Improved mobile layout */}
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
//           <Link href="/listmeeting" className="self-start">
//             <Button
//               variant="outline"
//               onClick={onBack}
//               className="flex items-center gap-2 text-sm"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Kembali
//             </Button>
//           </Link>
//           <div className="min-w-0 flex-1">
//             <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-black leading-tight break-words">
//               {meeting.title}
//             </h1>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
//               <Badge className={statusColors[meeting.status]}>
//                 {statusLabels[meeting.status]}
//               </Badge>
//               <span className="text-gray-500 text-xs sm:text-sm">
//                 {formatMeetingDateTime(meeting.date, meeting.time)}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Action buttons - Mobile responsive */}
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="flex items-center gap-2 justify-center text-sm"
//               >
//                 <Download className="h-4 w-4" />
//                 <span className="sm:inline">Export PDF</span>
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="w-[95vw] max-w-md mx-auto">
//               <DialogHeader>
//                 <DialogTitle>Export Notulensi ke PDF</DialogTitle>
//                 <DialogDescription>
//                   Pilih komponen yang ingin disertakan dalam file PDF
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="agenda"
//                     checked={exportOptions.includeAgenda}
//                     onCheckedChange={(checked) =>
//                       setExportOptions((prev) => ({
//                         ...prev,
//                         includeAgenda: !!checked,
//                       }))
//                     }
//                   />
//                   <Label htmlFor="agenda">Agenda Rapat</Label>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="decisions"
//                     checked={exportOptions.includeDecisions}
//                     onCheckedChange={(checked) =>
//                       setExportOptions((prev) => ({
//                         ...prev,
//                         includeDecisions: !!checked,
//                       }))
//                     }
//                   />
//                   <Label htmlFor="decisions">Keputusan Rapat</Label>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="actionItems"
//                     checked={exportOptions.includeActionItems}
//                     onCheckedChange={(checked) =>
//                       setExportOptions((prev) => ({
//                         ...prev,
//                         includeActionItems: !!checked,
//                       }))
//                     }
//                   />
//                   <Label htmlFor="actionItems">Action Items</Label>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="attendees"
//                     checked={exportOptions.includeAttendees}
//                     onCheckedChange={(checked) =>
//                       setExportOptions((prev) => ({
//                         ...prev,
//                         includeAttendees: !!checked,
//                       }))
//                     }
//                   />
//                   <Label htmlFor="attendees">Daftar Peserta</Label>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="signatures"
//                     checked={exportOptions.includeSignatures}
//                     onCheckedChange={(checked) =>
//                       setExportOptions((prev) => ({
//                         ...prev,
//                         includeSignatures: !!checked,
//                       }))
//                     }
//                   />
//                   <Label htmlFor="signatures">Tanda Tangan</Label>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
//                   <DialogTrigger asChild>
//                     <Button variant="outline">Batal</Button>
//                   </DialogTrigger>
//                   <Button onClick={handleExportPDF}>
//                     <Download className="h-4 w-4 mr-2" />
//                     Download PDF
//                   </Button>
//                 </div>
//               </div>
//             </DialogContent>
//           </Dialog>

//           <Button
//             onClick={onEdit}
//             className="flex items-center gap-2 justify-center text-sm"
//           >
//             <Edit className="h-4 w-4" />
//             <span className="sm:inline">Edit</span>
//           </Button>

//           <Button
//             onClick={onDelete}
//             variant="destructive"
//             className="flex items-center gap-2 justify-center text-sm"
//           >
//             <Trash2 className="h-4 w-4" />
//             <span className="sm:inline">Hapus</span>
//           </Button>
//         </div>
//       </div>

//       {/* Meeting Info - Enhanced responsive grid */}
//       <Card>
//         <CardContent className="p-4 sm:p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
//             <div className="flex items-center gap-3">
//               <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//               <div className="min-w-0">
//                 <p className="text-sm text-muted-foreground">Tanggal</p>
//                 <p className="font-medium truncate">
//                   {format(new Date(meeting.date), "dd MMM yyyy", {
//                     locale: localeId,
//                   })}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//               <div className="min-w-0">
//                 <p className="text-sm text-muted-foreground">Waktu</p>
//                 <p className="font-medium truncate">{meeting.time} WIB</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//               <div className="min-w-0">
//                 <p className="text-sm text-muted-foreground">Lokasi</p>
//                 <p className="font-medium truncate" title={meeting.location}>
//                   {meeting.location}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Users className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//               <div className="min-w-0">
//                 <p className="text-sm text-muted-foreground">Peserta</p>
//                 <p className="font-medium">{meeting.attendees.length} orang</p>
//               </div>
//             </div>
//           </div>

//           <Separator className="my-4 sm:my-6" />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//             <div className="flex items-center gap-3">
//               <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//               <div className="min-w-0">
//                 <p className="text-sm text-muted-foreground">Pimpinan Rapat</p>
//                 <p className="font-medium truncate" title={meeting.chairperson}>
//                   {meeting.chairperson}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//               <div className="min-w-0">
//                 <p className="text-sm text-muted-foreground">Notulis</p>
//                 <p className="font-medium truncate" title={meeting.secretary}>
//                   {meeting.secretary}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {meeting.description && (
//             <>
//               <Separator className="my-4 sm:my-6" />
//               <div>
//                 <p className="text-sm text-muted-foreground mb-2">Deskripsi</p>
//                 <p className="dark:text-white break-words">
//                   {meeting.description}
//                 </p>
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Tabs Content - Mobile responsive tabs */}
//       <Tabs defaultValue="agenda" className="w-full">
//         <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
//           <TabsTrigger value="agenda" className="text-xs sm:text-sm px-2 py-2">
//             Agenda
//           </TabsTrigger>
//           <TabsTrigger
//             value="attendees"
//             className="text-xs sm:text-sm px-2 py-2"
//           >
//             Peserta
//           </TabsTrigger>
//           <TabsTrigger
//             value="decisions"
//             className="text-xs sm:text-sm px-2 py-2"
//           >
//             Keputusan
//           </TabsTrigger>
//           <TabsTrigger value="actions" className="text-xs sm:text-sm px-2 py-2">
//             Actions
//           </TabsTrigger>
//         </TabsList>

//         {/* Agenda Tab */}
//         <TabsContent value="agenda" className="mt-4 sm:mt-6">
//           <Card>
//             <CardHeader className="p-4 sm:p-6">
//               <CardTitle className="text-lg sm:text-xl">Agenda Rapat</CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 pt-0">
//               {meeting.agenda.length > 0 ? (
//                 <div className="space-y-3">
//                   {meeting.agenda.map((item, index) => (
//                     <div key={index} className="flex items-start gap-3">
//                       <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
//                         {index + 1}
//                       </span>
//                       <p className="dark:text-white break-words flex-1">
//                         {item}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted-foreground italic text-center py-4">
//                   Belum ada agenda yang ditambahkan
//                 </p>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Attendees Tab */}
//         <TabsContent value="attendees" className="mt-4 sm:mt-6">
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
//             {/* Present Attendees */}
//             <Card>
//               <CardHeader className="p-4 sm:p-6">
//                 <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
//                   <CheckCircle className="h-5 w-5 text-green-600" />
//                   Hadir ({presentAttendees.length})
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 pt-0">
//                 {presentAttendees.length > 0 ? (
//                   <div className="space-y-3">
//                     {presentAttendees.map((attendee) => (
//                       <div
//                         key={attendee.id}
//                         className="flex items-center gap-3 p-3 border rounded-lg"
//                       >
//                         <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                           <User className="h-4 w-4 text-green-600" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p
//                             className="font-medium truncate"
//                             title={attendee.name}
//                           >
//                             {attendee.name}
//                           </p>
//                           <p
//                             className="text-sm text-muted-foreground truncate"
//                             title={attendee.role}
//                           >
//                             {attendee.role}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-muted-foreground italic text-center py-4">
//                     Tidak ada peserta yang hadir
//                   </p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Absent Attendees */}
//             <Card>
//               <CardHeader className="p-4 sm:p-6">
//                 <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
//                   <Circle className="h-5 w-5 text-muted-foreground" />
//                   Tidak Hadir ({absentAttendees.length})
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 pt-0">
//                 {absentAttendees.length > 0 ? (
//                   <div className="space-y-3">
//                     {absentAttendees.map((attendee) => (
//                       <div
//                         key={attendee.id}
//                         className="flex items-center gap-3 p-3 border rounded-lg opacity-60"
//                       >
//                         <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
//                           <User className="h-4 w-4 text-muted-foreground" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p
//                             className="font-medium dark:text-white truncate"
//                             title={attendee.name}
//                           >
//                             {attendee.name}
//                           </p>
//                           <p
//                             className="text-sm text-muted-foreground truncate"
//                             title={attendee.role}
//                           >
//                             {attendee.role}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-muted-foreground italic text-center py-4">
//                     Semua peserta hadir
//                   </p>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Decisions Tab */}
//         <TabsContent value="decisions" className="mt-4 sm:mt-6">
//           <Card>
//             <CardHeader className="p-4 sm:p-6">
//               <CardTitle className="text-lg sm:text-xl">
//                 Keputusan Rapat
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 pt-0">
//               {meeting.decisions.length > 0 ? (
//                 <div className="space-y-4">
//                   {meeting.decisions.map((decision, index) => (
//                     <div
//                       key={index}
//                       className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
//                     >
//                       <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
//                       <p className="text-black break-words flex-1">
//                         {decision}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted-foreground italic text-center py-4">
//                   Belum ada keputusan yang dibuat
//                 </p>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Action Items Tab */}
//         <TabsContent value="actions" className="mt-4 sm:mt-6">
//           <Card>
//             <CardHeader className="p-4 sm:p-6">
//               <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-lg sm:text-xl">
//                 <span>Action Items</span>
//                 <div className="text-sm text-muted-foreground font-normal">
//                   {completedActionItems}/{totalActionItems} selesai
//                 </div>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 pt-0">
//               {meeting.actionItems.length > 0 ? (
//                 <div className="space-y-4">
//                   {meeting.actionItems.map((item, index) => (
//                     <div key={item.id} className="border rounded-lg p-4">
//                       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
//                         <h4 className="font-medium dark:text-white break-words flex-1 min-w-0">
//                           {item.task}
//                         </h4>
//                         <Badge
//                           variant="outline"
//                           className={`${
//                             actionItemStatusColors[item.status]
//                           } flex-shrink-0 self-start`}
//                         >
//                           {actionItemStatusLabels[item.status]}
//                         </Badge>
//                       </div>
//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-2">
//                           <User className="h-4 w-4 flex-shrink-0" />
//                           <span
//                             className="truncate"
//                             title={`PIC: ${item.assignedTo}`}
//                           >
//                             PIC: {item.assignedTo}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4 flex-shrink-0" />
//                           <span>
//                             Due:{" "}
//                             {format(new Date(item.dueDate), "dd MMM yyyy", {
//                               locale: localeId,
//                             })}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <p className="text-muted-foreground italic">
//                     Belum ada action items yang dibuat
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  FileText,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  AlertCircle,
  Save,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Meeting, PDFExportOptions } from "@/lib/listmeeting/types";
import { exportMeetingToPDF } from "@/lib/listmeeting/pdf-generator";
import Link from "next/link";
import { toast } from "sonner";

interface MeetingDetailProps {
  meeting: Meeting;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateNotes?: (notes: string) => Promise<void>;
}

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  ongoing: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  scheduled: "Terjadwal",
  ongoing: "Berlangsung",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const actionItemStatusColors = {
  pending: "text-gray-600",
  "in-progress": "text-yellow-600",
  completed: "text-green-600",
};

const actionItemStatusLabels = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function MeetingDetail({
  meeting,
  onBack,
  onEdit,
  onDelete,
  onUpdateNotes,
}: MeetingDetailProps) {
  const [exportOptions, setExportOptions] = useState<PDFExportOptions>({
    includeAgenda: true,
    includeDecisions: true,
    includeActionItems: true,
    includeAttendees: true,
    includeSignatures: true,
    includeNotes: true,
  });

  // Notes editing state
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(meeting.notes || "");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const formatMeetingDateTime = (dateStr: string, timeStr: string) => {
    try {
      const date = new Date(`${dateStr}T${timeStr}`);
      return format(date, "EEEE, dd MMMM yyyy", { locale: localeId });
    } catch {
      return `${dateStr} ${timeStr}`;
    }
  };

  const handleExportPDF = () => {
    exportMeetingToPDF(meeting, exportOptions);
  };

  const handleSaveNotes = async () => {
    if (!onUpdateNotes) return;

    setIsSavingNotes(true);
    try {
      await onUpdateNotes(notesValue);
      setIsEditingNotes(false);
      toast.success("Notulensi berhasil disimpan!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan notulensi");
      console.error("Error saving notes:", error);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleCancelNotesEdit = () => {
    setNotesValue(meeting.notes || "");
    setIsEditingNotes(false);
  };

  const presentAttendees = meeting.attendees.filter((a) => a.isPresent);
  const absentAttendees = meeting.attendees.filter((a) => !a.isPresent);

  const completedActionItems = meeting.actionItems.filter(
    (item) => item.status === "completed"
  ).length;
  const totalActionItems = meeting.actionItems.length;

  // Check if notes tab should be available
  const canAccessNotes =
    meeting.status === "ongoing" || meeting.status === "completed";
  const canEditNotes = canAccessNotes && onUpdateNotes;

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      {/* Header - Improved mobile layout */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <Link href="/listmeeting" className="self-start">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-black leading-tight break-words">
              {meeting.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
              <Badge className={statusColors[meeting.status]}>
                {statusLabels[meeting.status]}
              </Badge>
              <span className="text-gray-500 text-xs sm:text-sm">
                {formatMeetingDateTime(meeting.date, meeting.time)}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons - Mobile responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-center text-sm"
              >
                <Download className="h-4 w-4" />
                <span className="sm:inline">Export PDF</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>Export Notulensi ke PDF</DialogTitle>
                <DialogDescription>
                  Pilih komponen yang ingin disertakan dalam file PDF
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agenda"
                    checked={exportOptions.includeAgenda}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        includeAgenda: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="agenda">Agenda Rapat</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="decisions"
                    checked={exportOptions.includeDecisions}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        includeDecisions: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="decisions">Keputusan Rapat</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="actionItems"
                    checked={exportOptions.includeActionItems}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        includeActionItems: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="actionItems">Action Items</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="attendees"
                    checked={exportOptions.includeAttendees}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        includeAttendees: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="attendees">Daftar Peserta</Label>
                </div>

                {canAccessNotes && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notes"
                      checked={exportOptions.includeNotes}
                      onCheckedChange={(checked) =>
                        setExportOptions((prev) => ({
                          ...prev,
                          includeNotes: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="notes">Notulensi</Label>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="signatures"
                    checked={exportOptions.includeSignatures}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        includeSignatures: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="signatures">Tanda Tangan</Label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <DialogTrigger asChild>
                    <Button variant="outline">Batal</Button>
                  </DialogTrigger>
                  <Button onClick={handleExportPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={onEdit}
            className="flex items-center gap-2 justify-center text-sm"
          >
            <Edit className="h-4 w-4" />
            <span className="sm:inline">Edit</span>
          </Button>

          <Button
            onClick={onDelete}
            variant="destructive"
            className="flex items-center gap-2 justify-center text-sm"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sm:inline">Hapus</span>
          </Button>
        </div>
      </div>

      {/* Meeting Info - Enhanced responsive grid */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Tanggal</p>
                <p className="font-medium truncate">
                  {format(new Date(meeting.date), "dd MMM yyyy", {
                    locale: localeId,
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Waktu</p>
                <p className="font-medium truncate">{meeting.time} WIB</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Lokasi</p>
                <p className="font-medium truncate" title={meeting.location}>
                  {meeting.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Peserta</p>
                <p className="font-medium">{meeting.attendees.length} orang</p>
              </div>
            </div>
          </div>

          <Separator className="my-4 sm:my-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Pimpinan Rapat</p>
                <p className="font-medium truncate" title={meeting.chairperson}>
                  {meeting.chairperson}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Notulis</p>
                <p className="font-medium truncate" title={meeting.secretary}>
                  {meeting.secretary}
                </p>
              </div>
            </div>
          </div>

          {meeting.description && (
            <>
              <Separator className="my-4 sm:my-6" />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Deskripsi</p>
                <p className="dark:text-white break-words">
                  {meeting.description}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Tabs Content - Mobile responsive tabs */}
      <Tabs defaultValue="agenda" className="w-full">
        <TabsList
          className={`grid w-full ${
            canAccessNotes
              ? "grid-cols-3 sm:grid-cols-5"
              : "grid-cols-2 sm:grid-cols-4"
          } h-auto p-1`}
        >
          <TabsTrigger value="agenda" className="text-xs sm:text-sm px-2 py-2">
            Agenda
          </TabsTrigger>
          <TabsTrigger
            value="attendees"
            className="text-xs sm:text-sm px-2 py-2"
          >
            Peserta
          </TabsTrigger>
          <TabsTrigger
            value="decisions"
            className="text-xs sm:text-sm px-2 py-2"
          >
            Keputusan
          </TabsTrigger>
          <TabsTrigger value="actions" className="text-xs sm:text-sm px-2 py-2">
            Actions
          </TabsTrigger>
          {canAccessNotes && (
            <TabsTrigger value="notes" className="text-xs sm:text-sm px-2 py-2">
              Notulensi
            </TabsTrigger>
          )}
        </TabsList>

        {/* Agenda Tab */}
        <TabsContent value="agenda" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Agenda Rapat</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {meeting.agenda.length > 0 ? (
                <div className="space-y-3">
                  {meeting.agenda.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <p className="dark:text-white break-words flex-1">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic text-center py-4">
                  Belum ada agenda yang ditambahkan
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendees Tab */}
        <TabsContent value="attendees" className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Present Attendees */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Hadir ({presentAttendees.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {presentAttendees.length > 0 ? (
                  <div className="space-y-3">
                    {presentAttendees.map((attendee) => (
                      <div
                        key={attendee.id}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-medium truncate"
                            title={attendee.name}
                          >
                            {attendee.name}
                          </p>
                          <p
                            className="text-sm text-muted-foreground truncate"
                            title={attendee.role}
                          >
                            {attendee.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic text-center py-4">
                    Tidak ada peserta yang hadir
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Absent Attendees */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Circle className="h-5 w-5 text-muted-foreground" />
                  Tidak Hadir ({absentAttendees.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {absentAttendees.length > 0 ? (
                  <div className="space-y-3">
                    {absentAttendees.map((attendee) => (
                      <div
                        key={attendee.id}
                        className="flex items-center gap-3 p-3 border rounded-lg opacity-60"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-medium dark:text-white truncate"
                            title={attendee.name}
                          >
                            {attendee.name}
                          </p>
                          <p
                            className="text-sm text-muted-foreground truncate"
                            title={attendee.role}
                          >
                            {attendee.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic text-center py-4">
                    Semua peserta hadir
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Decisions Tab */}
        <TabsContent value="decisions" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">
                Keputusan Rapat
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {meeting.decisions.length > 0 ? (
                <div className="space-y-4">
                  {meeting.decisions.map((decision, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-black break-words flex-1">
                        {decision}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic text-center py-4">
                  Belum ada keputusan yang dibuat
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Action Items Tab */}
        <TabsContent value="actions" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-lg sm:text-xl">
                <span>Action Items</span>
                <div className="text-sm text-muted-foreground font-normal">
                  {completedActionItems}/{totalActionItems} selesai
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              {meeting.actionItems.length > 0 ? (
                <div className="space-y-4">
                  {meeting.actionItems.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h4 className="font-medium dark:text-white break-words flex-1 min-w-0">
                          {item.task}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`${
                            actionItemStatusColors[item.status]
                          } flex-shrink-0 self-start`}
                        >
                          {actionItemStatusLabels[item.status]}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 flex-shrink-0" />
                          <span
                            className="truncate"
                            title={`PIC: ${item.assignedTo}`}
                          >
                            PIC: {item.assignedTo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <span>
                            Due:{" "}
                            {format(new Date(item.dueDate), "dd MMM yyyy", {
                              locale: localeId,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground italic">
                    Belum ada action items yang dibuat
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab - Only available for ongoing/completed meetings */}
        {canAccessNotes && (
          <TabsContent value="notes" className="mt-4 sm:mt-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-lg sm:text-xl">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Notulensi Rapat
                  </div>
                  {canEditNotes && !isEditingNotes && (
                    <Button
                      onClick={() => setIsEditingNotes(true)}
                      size="sm"
                      className="flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Notulensi
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {isEditingNotes ? (
                  <div className="space-y-4">
                    <Textarea
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      placeholder="Tulis notulensi rapat disini..."
                      className="min-h-[200px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                      rows={10}
                    />
                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <Button
                        onClick={handleCancelNotesEdit}
                        variant="outline"
                        className="flex items-center gap-2 w-full sm:w-auto justify-center"
                        disabled={isSavingNotes}
                      >
                        <X className="h-4 w-4" />
                        Batal
                      </Button>
                      <Button
                        onClick={handleSaveNotes}
                        disabled={isSavingNotes}
                        className="flex items-center gap-2 w-full sm:w-auto justify-center"
                      >
                        <Save className="h-4 w-4" />
                        {isSavingNotes ? "Menyimpan..." : "Simpan"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {meeting.notes ? (
                      <div className="prose max-w-none dark:prose-invert">
                        <div className="whitespace-pre-wrap p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                          {meeting.notes}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground italic mb-4">
                          Belum ada notulensi yang ditambahkan
                        </p>
                        {canEditNotes && (
                          <Button
                            onClick={() => setIsEditingNotes(true)}
                            className="flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Tambah Notulensi
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
