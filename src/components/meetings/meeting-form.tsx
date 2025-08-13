// "use client";

// import React, { useState } from "react";
// import { format } from "date-fns";
// import {
//   Plus,
//   Trash2,
//   Save,
//   ArrowLeft,
//   Calendar,
//   Clock,
//   MapPin,
//   Users,
//   User,
//   FileText,
//   Target,
//   CheckSquare,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Meeting,
//   MeetingFormData,
//   ActionItem,
//   Attendee,
// } from "@/lib/listmeeting/types";

// interface MeetingFormProps {
//   meeting?: Meeting | null;
//   onSave: (data: MeetingFormData) => void;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// const initialFormData: MeetingFormData = {
//   title: "",
//   date: format(new Date(), "yyyy-MM-dd"),
//   time: "09:00",
//   location: "",
//   description: "",
//   agenda: [""],
//   decisions: [""],
//   actionItems: [],
//   attendees: [],
//   chairperson: "",
//   secretary: "",
// };

// const defaultActionItem = {
//   task: "",
//   assignedTo: "",
//   dueDate: format(new Date(), "yyyy-MM-dd"),
//   status: "pending" as const,
// };

// const defaultAttendee = {
//   name: "",
//   email: "",
//   role: "",
//   isPresent: true,
// };

// export function MeetingForm({
//   meeting,
//   onSave,
//   onCancel,
//   isLoading = false,
// }: MeetingFormProps) {
//   const [formData, setFormData] = useState<MeetingFormData>(() => {
//     if (meeting) {
//       return {
//         title: meeting.title,
//         date: meeting.date,
//         time: meeting.time,
//         location: meeting.location,
//         description: meeting.description,
//         agenda: meeting.agenda.length > 0 ? meeting.agenda : [""],
//         decisions: meeting.decisions.length > 0 ? meeting.decisions : [""],
//         actionItems: meeting.actionItems.map((item) => ({
//           task: item.task,
//           assignedTo: item.assignedTo,
//           dueDate: item.dueDate,
//           status: item.status,
//         })),
//         attendees: meeting.attendees.map((attendee) => ({
//           name: attendee.name,
//           email: attendee.email,
//           role: attendee.role,
//           isPresent: attendee.isPresent,
//         })),
//         chairperson: meeting.chairperson,
//         secretary: meeting.secretary,
//       };
//     }
//     return initialFormData;
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Clean up empty agenda and decisions
//     const cleanedData = {
//       ...formData,
//       agenda: formData.agenda.filter((item) => item.trim() !== ""),
//       decisions: formData.decisions.filter((item) => item.trim() !== ""),
//     };

//     onSave(cleanedData);
//   };

//   const addAgendaItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       agenda: [...prev.agenda, ""],
//     }));
//   };

//   const removeAgendaItem = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       agenda: prev.agenda.filter((_, i) => i !== index),
//     }));
//   };

//   const updateAgendaItem = (index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       agenda: prev.agenda.map((item, i) => (i === index ? value : item)),
//     }));
//   };

//   const addDecisionItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       decisions: [...prev.decisions, ""],
//     }));
//   };

//   const removeDecisionItem = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       decisions: prev.decisions.filter((_, i) => i !== index),
//     }));
//   };

//   const updateDecisionItem = (index: number, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       decisions: prev.decisions.map((item, i) => (i === index ? value : item)),
//     }));
//   };

//   const addActionItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       actionItems: [...prev.actionItems, { ...defaultActionItem }],
//     }));
//   };

//   const removeActionItem = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       actionItems: prev.actionItems.filter((_, i) => i !== index),
//     }));
//   };

//   const updateActionItem = (
//     index: number,
//     field: keyof typeof defaultActionItem,
//     value: string
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       actionItems: prev.actionItems.map((item, i) =>
//         i === index ? { ...item, [field]: value } : item
//       ),
//     }));
//   };

//   const addAttendee = () => {
//     setFormData((prev) => ({
//       ...prev,
//       attendees: [...prev.attendees, { ...defaultAttendee }],
//     }));
//   };

//   const removeAttendee = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       attendees: prev.attendees.filter((_, i) => i !== index),
//     }));
//   };

//   const updateAttendee = (
//     index: number,
//     field: keyof typeof defaultAttendee,
//     value: string | boolean
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       attendees: prev.attendees.map((attendee, i) =>
//         i === index ? { ...attendee, [field]: value } : attendee
//       ),
//     }));
//   };

//   return (
//     <div className="min-h-screen p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
//       {/* Header - Mobile responsive */}
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//         <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 min-w-0 flex-1">
//           <Button
//             variant="outline"
//             onClick={onCancel}
//             className="flex items-center gap-2 self-start shrink-0"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span className="sm:inline">Kembali</span>
//           </Button>
//           <div className="min-w-0 flex-1">
//             <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
//               {meeting ? "Edit Meeting" : "Buat Meeting Baru"}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base break-words">
//               {meeting
//                 ? "Update informasi meeting PT Pupuk Kujang"
//                 : "Isi detail meeting PT Pupuk Kujang yang akan dibuat"}
//             </p>
//           </div>
//         </div>

//         <Button
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-center"
//         >
//           <Save className="h-4 w-4" />
//           {isLoading ? "Menyimpan..." : "Simpan Meeting"}
//         </Button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//         {/* Basic Information */}
//         <Card className="dark:bg-gray-800 dark:border-gray-700">
//           <CardHeader className="p-4 sm:p-6">
//             <CardTitle className="flex items-center gap-2 dark:text-gray-100 text-lg sm:text-xl">
//               <FileText className="h-5 w-5" />
//               Informasi Dasar
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="title"
//                 className="dark:text-gray-200 text-sm sm:text-base"
//               >
//                 Judul Meeting <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="title"
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, title: e.target.value }))
//                 }
//                 placeholder="Masukkan judul meeting"
//                 className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="date"
//                   className="dark:text-gray-200 text-sm sm:text-base"
//                 >
//                   Tanggal <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
//                   <Input
//                     id="date"
//                     type="date"
//                     value={formData.date}
//                     onChange={(e) =>
//                       setFormData((prev) => ({ ...prev, date: e.target.value }))
//                     }
//                     className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="time"
//                   className="dark:text-gray-200 text-sm sm:text-base"
//                 >
//                   Waktu <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
//                   <Input
//                     id="time"
//                     type="time"
//                     value={formData.time}
//                     onChange={(e) =>
//                       setFormData((prev) => ({ ...prev, time: e.target.value }))
//                     }
//                     className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="location"
//                 className="dark:text-gray-200 text-sm sm:text-base"
//               >
//                 Lokasi <span className="text-red-500">*</span>
//               </Label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
//                 <Input
//                   id="location"
//                   value={formData.location}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       location: e.target.value,
//                     }))
//                   }
//                   placeholder="Ruang Rapat Gedung Direktorat, Virtual - Teams, dll"
//                   className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="description"
//                 className="dark:text-gray-200 text-sm sm:text-base"
//               >
//                 Deskripsi
//               </Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     description: e.target.value,
//                   }))
//                 }
//                 placeholder="Deskripsi singkat tentang meeting"
//                 className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
//                 rows={3}
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="chairperson"
//                   className="dark:text-gray-200 text-sm sm:text-base"
//                 >
//                   Pimpinan Rapat <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
//                   <Input
//                     id="chairperson"
//                     value={formData.chairperson}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         chairperson: e.target.value,
//                       }))
//                     }
//                     placeholder="Nama pimpinan rapat"
//                     className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="secretary"
//                   className="dark:text-gray-200 text-sm sm:text-base"
//                 >
//                   Notulis <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
//                   <Input
//                     id="secretary"
//                     value={formData.secretary}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         secretary: e.target.value,
//                       }))
//                     }
//                     placeholder="Nama notulis"
//                     className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Tabs for detailed information - Mobile responsive */}
//         <Tabs defaultValue="agenda" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 dark:bg-gray-800 h-auto p-1">
//             <TabsTrigger
//               value="agenda"
//               className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
//             >
//               Agenda
//             </TabsTrigger>
//             <TabsTrigger
//               value="attendees"
//               className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
//             >
//               Peserta
//             </TabsTrigger>
//             <TabsTrigger
//               value="decisions"
//               className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
//             >
//               Keputusan
//             </TabsTrigger>
//             <TabsTrigger
//               value="actions"
//               className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
//             >
//               Actions
//             </TabsTrigger>
//           </TabsList>

//           {/* Agenda Tab */}
//           <TabsContent value="agenda" className="mt-4 sm:mt-6">
//             <Card className="dark:bg-gray-800 dark:border-gray-700">
//               <CardHeader className="p-4 sm:p-6">
//                 <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:text-gray-100 text-lg sm:text-xl">
//                   <div className="flex items-center gap-2">
//                     <Target className="h-5 w-5" />
//                     Agenda Rapat
//                   </div>
//                   <Button
//                     type="button"
//                     onClick={addAgendaItem}
//                     size="sm"
//                     className="flex items-center gap-2 w-full sm:w-auto justify-center"
//                   >
//                     <Plus className="h-4 w-4" />
//                     Tambah Agenda
//                   </Button>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
//                 {formData.agenda.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start sm:items-center gap-3"
//                   >
//                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-medium mt-2 sm:mt-0">
//                       {index + 1}
//                     </span>
//                     <Input
//                       value={item}
//                       onChange={(e) => updateAgendaItem(index, e.target.value)}
//                       placeholder="Masukkan agenda..."
//                       className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
//                     />
//                     {formData.agenda.length > 1 && (
//                       <Button
//                         type="button"
//                         onClick={() => removeAgendaItem(index)}
//                         size="sm"
//                         variant="ghost"
//                         className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 shrink-0"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Attendees Tab */}
//           <TabsContent value="attendees" className="mt-4 sm:mt-6">
//             <Card className="dark:bg-gray-800 dark:border-gray-700">
//               <CardHeader className="p-4 sm:p-6">
//                 <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:text-gray-100 text-lg sm:text-xl">
//                   <div className="flex items-center gap-2">
//                     <Users className="h-5 w-5" />
//                     Peserta Rapat
//                   </div>
//                   <Button
//                     type="button"
//                     onClick={addAttendee}
//                     size="sm"
//                     className="flex items-center gap-2 w-full sm:w-auto justify-center"
//                   >
//                     <Plus className="h-4 w-4" />
//                     Tambah Peserta
//                   </Button>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
//                 {formData.attendees.map((attendee, index) => (
//                   <div
//                     key={index}
//                     className="border rounded-lg p-3 sm:p-4 space-y-3 dark:border-gray-600 dark:bg-gray-700"
//                   >
//                     <div className="flex items-center justify-between">
//                       <h4 className="font-medium dark:text-gray-200 text-sm sm:text-base">
//                         Peserta {index + 1}
//                       </h4>
//                       <Button
//                         type="button"
//                         onClick={() => removeAttendee(index)}
//                         size="sm"
//                         variant="ghost"
//                         className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <Input
//                         value={attendee.name}
//                         onChange={(e) =>
//                           updateAttendee(index, "name", e.target.value)
//                         }
//                         placeholder="Nama lengkap"
//                         className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
//                       />
//                       <Input
//                         value={attendee.email}
//                         onChange={(e) =>
//                           updateAttendee(index, "email", e.target.value)
//                         }
//                         placeholder="Email"
//                         type="email"
//                         className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
//                       />
//                     </div>

//                     <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//                       <Input
//                         value={attendee.role}
//                         onChange={(e) =>
//                           updateAttendee(index, "role", e.target.value)
//                         }
//                         placeholder="Jabatan/Role"
//                         className="flex-1 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
//                       />
//                       <div className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`present-${index}`}
//                           checked={attendee.isPresent}
//                           onCheckedChange={(checked) =>
//                             updateAttendee(index, "isPresent", !!checked)
//                           }
//                         />
//                         <Label
//                           htmlFor={`present-${index}`}
//                           className="text-sm dark:text-gray-200"
//                         >
//                           Hadir
//                         </Label>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {formData.attendees.length === 0 && (
//                   <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
//                     <Users className="h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-4 opacity-50" />
//                     <p className="text-sm sm:text-base mb-4">
//                       Belum ada peserta yang ditambahkan
//                     </p>
//                     <Button
//                       type="button"
//                       onClick={addAttendee}
//                       className="w-full sm:w-auto"
//                     >
//                       Tambah Peserta Pertama
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Decisions Tab */}
//           <TabsContent value="decisions" className="mt-4 sm:mt-6">
//             <Card className="dark:bg-gray-800 dark:border-gray-700">
//               <CardHeader className="p-4 sm:p-6">
//                 <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:text-gray-100 text-lg sm:text-xl">
//                   <div className="flex items-center gap-2">
//                     <CheckSquare className="h-5 w-5" />
//                     Keputusan Rapat
//                   </div>
//                   <Button
//                     type="button"
//                     onClick={addDecisionItem}
//                     size="sm"
//                     className="flex items-center gap-2 w-full sm:w-auto justify-center"
//                   >
//                     <Plus className="h-4 w-4" />
//                     Tambah Keputusan
//                   </Button>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
//                 {formData.decisions.map((decision, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full flex items-center justify-center text-sm font-medium mt-2">
//                       {index + 1}
//                     </span>
//                     <Textarea
//                       value={decision}
//                       onChange={(e) =>
//                         updateDecisionItem(index, e.target.value)
//                       }
//                       placeholder="Masukkan keputusan rapat..."
//                       className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
//                       rows={2}
//                     />
//                     {formData.decisions.length > 1 && (
//                       <Button
//                         type="button"
//                         onClick={() => removeDecisionItem(index)}
//                         size="sm"
//                         variant="ghost"
//                         className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 mt-2 shrink-0"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Action Items Tab */}
//           <TabsContent value="actions" className="mt-4 sm:mt-6">
//             <Card className="dark:bg-gray-800 dark:border-gray-700">
//               <CardHeader className="p-4 sm:p-6">
//                 <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:text-gray-100 text-lg sm:text-xl">
//                   <div className="flex items-center gap-2">
//                     <Target className="h-5 w-5" />
//                     Action Items
//                   </div>
//                   <Button
//                     type="button"
//                     onClick={addActionItem}
//                     size="sm"
//                     className="flex items-center gap-2 w-full sm:w-auto justify-center"
//                   >
//                     <Plus className="h-4 w-4" />
//                     Tambah Action Item
//                   </Button>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
//                 {formData.actionItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="border rounded-lg p-3 sm:p-4 space-y-3 dark:border-gray-600 dark:bg-gray-700"
//                   >
//                     <div className="flex items-center justify-between">
//                       <h4 className="font-medium dark:text-gray-200 text-sm sm:text-base">
//                         Action Item {index + 1}
//                       </h4>
//                       <Button
//                         type="button"
//                         onClick={() => removeActionItem(index)}
//                         size="sm"
//                         variant="ghost"
//                         className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>

//                     <Textarea
//                       value={item.task}
//                       onChange={(e) =>
//                         updateActionItem(index, "task", e.target.value)
//                       }
//                       placeholder="Deskripsi tugas..."
//                       className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
//                       rows={2}
//                     />

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                       <Input
//                         value={item.assignedTo}
//                         onChange={(e) =>
//                           updateActionItem(index, "assignedTo", e.target.value)
//                         }
//                         placeholder="PIC (Person in Charge)"
//                         className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
//                       />
//                       <Input
//                         type="date"
//                         value={item.dueDate}
//                         onChange={(e) =>
//                           updateActionItem(index, "dueDate", e.target.value)
//                         }
//                         className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
//                       />
//                       <Select
//                         value={item.status}
//                         onValueChange={(value) =>
//                           updateActionItem(index, "status", value)
//                         }
//                       >
//                         <SelectTrigger className="w-full dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100">
//                           <SelectValue placeholder="Status" />
//                         </SelectTrigger>
//                         <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
//                           <SelectItem
//                             value="pending"
//                             className="dark:text-gray-100 dark:focus:bg-gray-600"
//                           >
//                             Pending
//                           </SelectItem>
//                           <SelectItem
//                             value="in-progress"
//                             className="dark:text-gray-100 dark:focus:bg-gray-600"
//                           >
//                             In Progress
//                           </SelectItem>
//                           <SelectItem
//                             value="completed"
//                             className="dark:text-gray-100 dark:focus:bg-gray-600"
//                           >
//                             Completed
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 ))}

//                 {formData.actionItems.length === 0 && (
//                   <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
//                     <Target className="h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-4 opacity-50" />
//                     <p className="text-sm sm:text-base mb-4">
//                       Belum ada action items yang ditambahkan
//                     </p>
//                     <Button
//                       type="button"
//                       onClick={addActionItem}
//                       className="w-full sm:w-auto"
//                     >
//                       Tambah Action Item Pertama
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {/* Form Actions - Mobile responsive */}
//         <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t dark:border-gray-600">
//           <Button
//             type="button"
//             onClick={onCancel}
//             variant="outline"
//             className="w-full sm:w-auto"
//           >
//             Batal
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="flex items-center gap-2 w-full sm:w-auto justify-center"
//           >
//             <Save className="h-4 w-4" />
//             {isLoading ? "Menyimpan..." : "Simpan Meeting"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  FileText,
  Target,
  CheckSquare,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Meeting,
  MeetingFormData,
  ActionItem,
  Attendee,
} from "@/lib/listmeeting/types";

interface MeetingFormProps {
  meeting?: Meeting | null;
  onSave: (data: MeetingFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const initialFormData: MeetingFormData = {
  title: "",
  date: format(new Date(), "yyyy-MM-dd"),
  time: "09:00",
  location: "",
  description: "",
  agenda: [""],
  decisions: [""],
  actionItems: [],
  attendees: [],
  chairperson: "",
  secretary: "",
  notes: "",
};

const defaultActionItem = {
  task: "",
  assignedTo: "",
  dueDate: format(new Date(), "yyyy-MM-dd"),
  status: "pending" as const,
};

const defaultAttendee = {
  name: "",
  email: "",
  role: "",
  isPresent: true,
};

export function MeetingForm({
  meeting,
  onSave,
  onCancel,
  isLoading = false,
}: MeetingFormProps) {
  const [formData, setFormData] = useState<MeetingFormData>(() => {
    if (meeting) {
      return {
        title: meeting.title,
        date: meeting.date,
        time: meeting.time,
        location: meeting.location,
        description: meeting.description,
        agenda: meeting.agenda.length > 0 ? meeting.agenda : [""],
        decisions: meeting.decisions.length > 0 ? meeting.decisions : [""],
        actionItems: meeting.actionItems.map((item) => ({
          task: item.task,
          assignedTo: item.assignedTo,
          dueDate: item.dueDate,
          status: item.status,
        })),
        attendees: meeting.attendees.map((attendee) => ({
          name: attendee.name,
          email: attendee.email,
          role: attendee.role,
          isPresent: attendee.isPresent,
        })),
        chairperson: meeting.chairperson,
        secretary: meeting.secretary,
        notes: meeting.notes || "",
      };
    }
    return initialFormData;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up empty agenda and decisions
    const cleanedData = {
      ...formData,
      agenda: formData.agenda.filter((item) => item.trim() !== ""),
      decisions: formData.decisions.filter((item) => item.trim() !== ""),
    };

    onSave(cleanedData);
  };

  const addAgendaItem = () => {
    setFormData((prev) => ({
      ...prev,
      agenda: [...prev.agenda, ""],
    }));
  };

  const removeAgendaItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index),
    }));
  };

  const updateAgendaItem = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addDecisionItem = () => {
    setFormData((prev) => ({
      ...prev,
      decisions: [...prev.decisions, ""],
    }));
  };

  const removeDecisionItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      decisions: prev.decisions.filter((_, i) => i !== index),
    }));
  };

  const updateDecisionItem = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      decisions: prev.decisions.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addActionItem = () => {
    setFormData((prev) => ({
      ...prev,
      actionItems: [...prev.actionItems, { ...defaultActionItem }],
    }));
  };

  const removeActionItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      actionItems: prev.actionItems.filter((_, i) => i !== index),
    }));
  };

  const updateActionItem = (
    index: number,
    field: keyof typeof defaultActionItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      actionItems: prev.actionItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addAttendee = () => {
    setFormData((prev) => ({
      ...prev,
      attendees: [...prev.attendees, { ...defaultAttendee }],
    }));
  };

  const removeAttendee = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((_, i) => i !== index),
    }));
  };

  const updateAttendee = (
    index: number,
    field: keyof typeof defaultAttendee,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      attendees: prev.attendees.map((attendee, i) =>
        i === index ? { ...attendee, [field]: value } : attendee
      ),
    }));
  };

  // Check if notes tab should be available
  const canAccessNotes =
    meeting && (meeting.status === "ongoing" || meeting.status === "completed");

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      {/* Header - Mobile responsive */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 min-w-0 flex-1">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex items-center gap-2 self-start shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sm:inline">Kembali</span>
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {meeting ? "Edit Meeting" : "Buat Meeting Baru"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base break-words">
              {meeting
                ? "Update informasi meeting PT Pupuk Kujang"
                : "Isi detail meeting PT Pupuk Kujang yang akan dibuat"}
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-center"
        >
          <Save className="h-4 w-4" />
          {isLoading ? "Menyimpan..." : "Simpan Meeting"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Basic Information */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 dark:text-gray-100 text-lg sm:text-xl">
              <FileText className="h-5 w-5" />
              Informasi Dasar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="dark:text-gray-200 text-sm sm:text-base"
              >
                Judul Meeting <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Masukkan judul meeting"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Tanggal <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="time"
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Waktu <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="dark:text-gray-200 text-sm sm:text-base"
              >
                Lokasi <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Ruang Rapat Gedung Direktorat, Virtual - Teams, dll"
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="dark:text-gray-200 text-sm sm:text-base"
              >
                Deskripsi
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Deskripsi singkat tentang meeting"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="chairperson"
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Pimpinan Rapat <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                  <Input
                    id="chairperson"
                    value={formData.chairperson}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        chairperson: e.target.value,
                      }))
                    }
                    placeholder="Nama pimpinan rapat"
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="secretary"
                  className="dark:text-gray-200 text-sm sm:text-base"
                >
                  Notulis <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                  <Input
                    id="secretary"
                    value={formData.secretary}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        secretary: e.target.value,
                      }))
                    }
                    placeholder="Nama notulis"
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for detailed information - Mobile responsive */}
        <Tabs defaultValue="agenda" className="w-full">
          <TabsList
            className={`grid w-full ${
              canAccessNotes
                ? "grid-cols-3 sm:grid-cols-5"
                : "grid-cols-2 sm:grid-cols-4"
            } dark:bg-gray-800 h-auto p-1`}
          >
            <TabsTrigger
              value="agenda"
              className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
            >
              Agenda
            </TabsTrigger>
            <TabsTrigger
              value="attendees"
              className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
            >
              Peserta
            </TabsTrigger>
            <TabsTrigger
              value="decisions"
              className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
            >
              Keputusan
            </TabsTrigger>
            <TabsTrigger
              value="actions"
              className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
            >
              Actions
            </TabsTrigger>
            {canAccessNotes && (
              <TabsTrigger
                value="notes"
                className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 py-2"
              >
                Notulensi
              </TabsTrigger>
            )}
          </TabsList>

          {/* Agenda Tab */}
          <TabsContent value="agenda" className="mt-4 sm:mt-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:text-gray-100 text-lg sm:text-xl">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Agenda Rapat
                  </div>
                  <Button
                    type="button"
                    onClick={addAgendaItem}
                    size="sm"
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Agenda
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
                {formData.agenda.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start sm:items-center gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-medium mt-2 sm:mt-0">
                      {index + 1}
                    </span>
                    <Input
                      value={item}
                      onChange={(e) => updateAgendaItem(index, e.target.value)}
                      placeholder="Masukkan agenda..."
                      className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                    />
                    {formData.agenda.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeAgendaItem(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendees Tab */}
          <TabsContent value="attendees" className="mt-4 sm:mt-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:text-gray-100 text-lg sm:text-xl">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Peserta Rapat
                  </div>
                  <Button
                    type="button"
                    onClick={addAttendee}
                    size="sm"
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Peserta
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                {formData.attendees.map((attendee, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 sm:p-4 space-y-3 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium dark:text-gray-200 text-sm sm:text-base">
                        Peserta {index + 1}
                      </h4>
                      <Button
                        type="button"
                        onClick={() => removeAttendee(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        value={attendee.name}
                        onChange={(e) =>
                          updateAttendee(index, "name", e.target.value)
                        }
                        placeholder="Nama lengkap"
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                      />
                      <Input
                        value={attendee.email}
                        onChange={(e) =>
                          updateAttendee(index, "email", e.target.value)
                        }
                        placeholder="Email"
                        type="email"
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <Input
                        value={attendee.role}
                        onChange={(e) =>
                          updateAttendee(index, "role", e.target.value)
                        }
                        placeholder="Jabatan/Role"
                        className="flex-1 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`present-${index}`}
                          checked={attendee.isPresent}
                          onCheckedChange={(checked) =>
                            updateAttendee(index, "isPresent", !!checked)
                          }
                        />
                        <Label
                          htmlFor={`present-${index}`}
                          className="text-sm dark:text-gray-200"
                        >
                          Hadir
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}

                {formData.attendees.length === 0 && (
                  <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
                    <Users className="h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm sm:text-base mb-4">
                      Belum ada peserta yang ditambahkan
                    </p>
                    <Button
                      type="button"
                      onClick={addAttendee}
                      className="w-full sm:w-auto"
                    >
                      Tambah Peserta Pertama
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Decisions Tab */}
          <TabsContent value="decisions" className="mt-4 sm:mt-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:text-gray-100 text-lg sm:text-xl">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5" />
                    Keputusan Rapat
                  </div>
                  <Button
                    type="button"
                    onClick={addDecisionItem}
                    size="sm"
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Keputusan
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
                {formData.decisions.map((decision, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full flex items-center justify-center text-sm font-medium mt-2">
                      {index + 1}
                    </span>
                    <Textarea
                      value={decision}
                      onChange={(e) =>
                        updateDecisionItem(index, e.target.value)
                      }
                      placeholder="Masukkan keputusan rapat..."
                      className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                      rows={2}
                    />
                    {formData.decisions.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeDecisionItem(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 mt-2 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Action Items Tab */}
          <TabsContent value="actions" className="mt-4 sm:mt-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:text-gray-100 text-lg sm:text-xl">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Action Items
                  </div>
                  <Button
                    type="button"
                    onClick={addActionItem}
                    size="sm"
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Action Item
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                {formData.actionItems.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 sm:p-4 space-y-3 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium dark:text-gray-200 text-sm sm:text-base">
                        Action Item {index + 1}
                      </h4>
                      <Button
                        type="button"
                        onClick={() => removeActionItem(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Textarea
                      value={item.task}
                      onChange={(e) =>
                        updateActionItem(index, "task", e.target.value)
                      }
                      placeholder="Deskripsi tugas..."
                      className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                      rows={2}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <Input
                        value={item.assignedTo}
                        onChange={(e) =>
                          updateActionItem(index, "assignedTo", e.target.value)
                        }
                        placeholder="PIC (Person in Charge)"
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                      />
                      <Input
                        type="date"
                        value={item.dueDate}
                        onChange={(e) =>
                          updateActionItem(index, "dueDate", e.target.value)
                        }
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100"
                      />
                      <Select
                        value={item.status}
                        onValueChange={(value) =>
                          updateActionItem(index, "status", value)
                        }
                      >
                        <SelectTrigger className="w-full dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                          <SelectItem
                            value="pending"
                            className="dark:text-gray-100 dark:focus:bg-gray-600"
                          >
                            Pending
                          </SelectItem>
                          <SelectItem
                            value="in-progress"
                            className="dark:text-gray-100 dark:focus:bg-gray-600"
                          >
                            In Progress
                          </SelectItem>
                          <SelectItem
                            value="completed"
                            className="dark:text-gray-100 dark:focus:bg-gray-600"
                          >
                            Completed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}

                {formData.actionItems.length === 0 && (
                  <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
                    <Target className="h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm sm:text-base mb-4">
                      Belum ada action items yang ditambahkan
                    </p>
                    <Button
                      type="button"
                      onClick={addActionItem}
                      className="w-full sm:w-auto"
                    >
                      Tambah Action Item Pertama
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab - Only available for ongoing/completed meetings */}
          {canAccessNotes && (
            <TabsContent value="notes" className="mt-4 sm:mt-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 dark:text-gray-100 text-lg sm:text-xl">
                    <Edit3 className="h-5 w-5" />
                    Notulensi Rapat
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <Label
                      htmlFor="notes"
                      className="dark:text-gray-200 text-sm sm:text-base"
                    >
                      Catatan Meeting
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Tulis notulensi rapat disini... Misalnya: pembukaan, diskusi utama, keputusan yang diambil, kesimpulan, dll."
                      className="min-h-[200px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                      rows={12}
                    />
                    <p className="text-xs text-muted-foreground">
                      Notulensi ini akan tersedia untuk meeting dengan status
                      "Berlangsung" atau "Selesai"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Form Actions - Mobile responsive */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t dark:border-gray-600">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Menyimpan..." : "Simpan Meeting"}
          </Button>
        </div>
      </form>
    </div>
  );
}
