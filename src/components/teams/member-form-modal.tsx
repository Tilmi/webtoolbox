// "use client";

// import { useState, useEffect } from "react";
// import {
//   Member,
//   MemberFormData,
//   POSISI_OPTIONS,
//   STATUS_OPTIONS,
// } from "@/lib/teams/types";
// import { departmentOptions } from "@/lib/teams/data";
// import { isValidEmail, isValidPhoneNumber } from "@/lib/teams/utils";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Upload, User } from "lucide-react";

// interface MemberFormModalProps {
//   member?: Member | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: MemberFormData) => void;
//   isLoading?: boolean;
// }

// export function MemberFormModal({
//   member,
//   isOpen,
//   onClose,
//   onSubmit,
//   isLoading,
// }: MemberFormModalProps) {
//   const [formData, setFormData] = useState<MemberFormData>({
//     employeeId: "",
//     nama: "",
//     email: "",
//     posisi: "Staff",
//     department: "Technology Information",
//     noTelp: "",
//     status: "Aktif",
//     tanggalBergabung: new Date().toISOString().split("T")[0],
//     photoProfile: "",
//   });

//   const [errors, setErrors] = useState<Partial<MemberFormData>>({});

//   // Reset form when modal opens/closes or member changes
//   useEffect(() => {
//     if (isOpen) {
//       if (member) {
//         // Edit mode
//         setFormData({
//           employeeId: member.employeeId,
//           nama: member.nama,
//           email: member.email,
//           posisi: member.posisi,
//           department: member.department,
//           noTelp: member.noTelp,
//           status: member.status,
//           tanggalBergabung: member.tanggalBergabung,
//           photoProfile: member.photoProfile || "",
//         });
//       } else {
//         // Add mode - reset to defaults
//         setFormData({
//           employeeId: "",
//           nama: "",
//           email: "",
//           posisi: "Staff",
//           department: "Technology Information",
//           noTelp: "",
//           status: "Aktif",
//           tanggalBergabung: new Date().toISOString().split("T")[0],
//           photoProfile: "",
//         });
//       }
//       setErrors({});
//     }
//   }, [isOpen, member]);

//   const validateForm = (): boolean => {
//     const newErrors: Partial<MemberFormData> = {};

//     if (!formData.employeeId.trim()) {
//       newErrors.employeeId = "Employee ID wajib diisi";
//     }

//     if (!formData.nama.trim()) {
//       newErrors.nama = "Nama wajib diisi";
//     } else if (formData.nama.trim().length < 2) {
//       newErrors.nama = "Nama minimal 2 karakter";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email wajib diisi";
//     } else if (!isValidEmail(formData.email)) {
//       newErrors.email = "Format email tidak valid";
//     }

//     if (!formData.noTelp.trim()) {
//       newErrors.noTelp = "Nomor telepon wajib diisi";
//     } else if (!isValidPhoneNumber(formData.noTelp)) {
//       newErrors.noTelp =
//         "Format nomor telepon tidak valid (contoh: 081234567890)";
//     }

//     if (!formData.tanggalBergabung) {
//       newErrors.tanggalBergabung = "Tanggal bergabung wajib diisi";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSubmit(formData);
//     }
//   };

//   const handleInputChange = (field: keyof MemberFormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const getInitials = (nama: string) => {
//     if (!nama) return "";
//     return nama
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] p-0">
//         <DialogHeader className="px-6 py-4 border-b">
//           <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
//             <User className="w-5 h-5" />
//             {member ? "Edit Member" : "Tambah Member Baru"}
//           </DialogTitle>
//         </DialogHeader>

//         <ScrollArea className="max-h-[calc(90vh-80px)]">
//           <form onSubmit={handleSubmit} className="p-6 space-y-6">
//             {/* Photo Profile Section */}
//             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg">
//               <Avatar className="w-20 h-20">
//                 <AvatarImage src={formData.photoProfile} alt={formData.nama} />
//                 <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
//                   {formData.nama ? (
//                     getInitials(formData.nama)
//                   ) : (
//                     <User className="w-8 h-8" />
//                   )}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 w-full sm:w-auto space-y-2">
//                 <Label htmlFor="photoProfile" className="text-sm font-medium">
//                   Photo Profile URL (Optional)
//                 </Label>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <Input
//                     id="photoProfile"
//                     type="url"
//                     placeholder="https://example.com/photo.jpg"
//                     value={formData.photoProfile}
//                     onChange={(e) =>
//                       handleInputChange("photoProfile", e.target.value)
//                     }
//                     className="flex-1 h-10"
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="w-full sm:w-auto h-10"
//                   >
//                     <Upload className="w-4 h-4 sm:mr-2" />
//                     <span className="hidden sm:inline">Upload</span>
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//               {/* Employee ID */}
//               <div className="space-y-2">
//                 <Label htmlFor="employeeId" className="text-sm font-medium">
//                   Employee ID <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="employeeId"
//                   placeholder="PKG001"
//                   value={formData.employeeId}
//                   onChange={(e) =>
//                     handleInputChange("employeeId", e.target.value)
//                   }
//                   className={`h-10 ${
//                     errors.employeeId ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.employeeId && (
//                   <p className="text-xs text-red-600">{errors.employeeId}</p>
//                 )}
//               </div>

//               {/* Nama */}
//               <div className="space-y-2">
//                 <Label htmlFor="nama" className="text-sm font-medium">
//                   Nama Lengkap <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="nama"
//                   placeholder="Ahmad Suryadi"
//                   value={formData.nama}
//                   onChange={(e) => handleInputChange("nama", e.target.value)}
//                   className={`h-10 ${errors.nama ? "border-red-500" : ""}`}
//                 />
//                 {errors.nama && (
//                   <p className="text-xs text-red-600">{errors.nama}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   Email <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="ahmad.suryadi@pupukkujang.co.id"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className={`h-10 ${errors.email ? "border-red-500" : ""}`}
//                 />
//                 {errors.email && (
//                   <p className="text-xs text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               {/* No. Telp */}
//               <div className="space-y-2">
//                 <Label htmlFor="noTelp" className="text-sm font-medium">
//                   Nomor Telepon <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="noTelp"
//                   placeholder="081234567890"
//                   value={formData.noTelp}
//                   onChange={(e) => handleInputChange("noTelp", e.target.value)}
//                   className={`h-10 ${errors.noTelp ? "border-red-500" : ""}`}
//                 />
//                 {errors.noTelp && (
//                   <p className="text-xs text-red-600">{errors.noTelp}</p>
//                 )}
//               </div>

//               {/* Posisi */}
//               <div className="space-y-2">
//                 <Label className="text-sm font-medium">
//                   Posisi/Jabatan <span className="text-red-500">*</span>
//                 </Label>
//                 <Select
//                   value={formData.posisi}
//                   onValueChange={(value: any) =>
//                     handleInputChange("posisi", value)
//                   }
//                 >
//                   <SelectTrigger
//                     className="h-10 min-h-[2.5rem]"
//                     style={{ height: "2.5rem" }}
//                   >
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {POSISI_OPTIONS.map((posisi) => (
//                       <SelectItem key={posisi} value={posisi}>
//                         {posisi}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Department */}
//               <div className="space-y-2">
//                 <Label className="text-sm font-medium">
//                   Department <span className="text-red-500">*</span>
//                 </Label>
//                 <Select
//                   value={formData.department}
//                   onValueChange={(value) =>
//                     handleInputChange("department", value)
//                   }
//                 >
//                   <SelectTrigger
//                     className="h-10 min-h-[2.5rem]"
//                     style={{ height: "2.5rem" }}
//                   >
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {departmentOptions.map((dept) => (
//                       <SelectItem key={dept} value={dept}>
//                         {dept}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Status */}
//               <div className="space-y-2">
//                 <Label className="text-sm font-medium">
//                   Status <span className="text-red-500">*</span>
//                 </Label>
//                 <Select
//                   value={formData.status}
//                   onValueChange={(value: any) =>
//                     handleInputChange("status", value)
//                   }
//                 >
//                   <SelectTrigger
//                     className="h-10 min-h-[2.5rem]"
//                     style={{ height: "2.5rem" }}
//                   >
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {STATUS_OPTIONS.map((status) => (
//                       <SelectItem key={status} value={status}>
//                         {status}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Tanggal Bergabung */}
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="tanggalBergabung"
//                   className="text-sm font-medium"
//                 >
//                   Tanggal Bergabung <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="tanggalBergabung"
//                   type="date"
//                   value={formData.tanggalBergabung}
//                   onChange={(e) =>
//                     handleInputChange("tanggalBergabung", e.target.value)
//                   }
//                   className={`h-10 ${
//                     errors.tanggalBergabung ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.tanggalBergabung && (
//                   <p className="text-xs text-red-600">
//                     {errors.tanggalBergabung}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onClose}
//                 disabled={isLoading}
//                 className="w-full sm:flex-1"
//               >
//                 Batal
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full sm:flex-1"
//               >
//                 {isLoading
//                   ? "Menyimpan..."
//                   : member
//                   ? "Update Member"
//                   : "Tambah Member"}
//               </Button>
//             </div>
//           </form>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }
// components/teams/member-form-modal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Member,
  MemberFormData,
  POSISI_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/teams/types";
import { departmentOptions } from "@/lib/teams/data";
import { isValidEmail, isValidPhoneNumber } from "@/lib/teams/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, User } from "lucide-react";

interface MemberFormModalProps {
  member?: Member | null; // null untuk add, ada value untuk edit
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MemberFormData) => void;
  isLoading?: boolean;
}

export function MemberFormModal({
  member,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: MemberFormModalProps) {
  const [formData, setFormData] = useState<MemberFormData>({
    employeeId: "",
    nama: "",
    email: "",
    posisi: "Staff",
    department: "Technology Information",
    noTelp: "",
    status: "Aktif",
    tanggalBergabung: new Date().toISOString().split("T")[0],
    photoProfile: "",
  });

  const [errors, setErrors] = useState<Partial<MemberFormData>>({});

  // Reset form when modal opens/closes or member changes
  useEffect(() => {
    if (isOpen) {
      if (member) {
        // Edit mode
        setFormData({
          employeeId: member.employeeId,
          nama: member.nama,
          email: member.email,
          posisi: member.posisi,
          department: member.department,
          noTelp: member.noTelp,
          status: member.status,
          tanggalBergabung: member.tanggalBergabung,
          photoProfile: member.photoProfile || "",
        });
      } else {
        // Add mode - reset to defaults
        setFormData({
          employeeId: "",
          nama: "",
          email: "",
          posisi: "Staff",
          department: "Technology Information",
          noTelp: "",
          status: "Aktif",
          tanggalBergabung: new Date().toISOString().split("T")[0],
          photoProfile: "",
        });
      }
      setErrors({});
    }
  }, [isOpen, member]);

  const validateForm = (): boolean => {
    const newErrors: Partial<MemberFormData> = {};

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID wajib diisi";
    }

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama wajib diisi";
    } else if (formData.nama.trim().length < 2) {
      newErrors.nama = "Nama minimal 2 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.noTelp.trim()) {
      newErrors.noTelp = "Nomor telepon wajib diisi";
    } else if (!isValidPhoneNumber(formData.noTelp)) {
      newErrors.noTelp =
        "Format nomor telepon tidak valid (contoh: 081234567890)";
    }

    if (!formData.tanggalBergabung) {
      newErrors.tanggalBergabung = "Tanggal bergabung wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof MemberFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getInitials = (nama: string) => {
    if (!nama) return "";
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="w-5 h-5" />
            {member ? "Edit Member" : "Tambah Member Baru"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Photo Profile Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg">
              <Avatar className="w-20 h-20">
                <AvatarImage src={formData.photoProfile} alt={formData.nama} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                  {formData.nama ? (
                    getInitials(formData.nama)
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 w-full sm:w-auto space-y-2">
                <Label htmlFor="photoProfile" className="text-sm font-medium">
                  Photo Profile URL (Optional)
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="photoProfile"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.photoProfile}
                    onChange={(e) =>
                      handleInputChange("photoProfile", e.target.value)
                    }
                    className="flex-1 h-10"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto h-10"
                  >
                    <Upload className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Upload</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Employee ID */}
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-sm font-medium">
                  Employee ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="employeeId"
                  placeholder="PKG001"
                  value={formData.employeeId}
                  onChange={(e) =>
                    handleInputChange("employeeId", e.target.value)
                  }
                  className={`h-9 ${errors.employeeId ? "border-red-500" : ""}`}
                />
                {errors.employeeId && (
                  <p className="text-xs text-red-600">{errors.employeeId}</p>
                )}
              </div>

              {/* Nama */}
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-sm font-medium">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama"
                  placeholder="Ahmad Suryadi"
                  value={formData.nama}
                  onChange={(e) => handleInputChange("nama", e.target.value)}
                  className={`h-9 ${errors.nama ? "border-red-500" : ""}`}
                />
                {errors.nama && (
                  <p className="text-xs text-red-600">{errors.nama}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ahmad.suryadi@pupukkujang.co.id"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`h-9 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* No. Telp */}
              <div className="space-y-2">
                <Label htmlFor="noTelp" className="text-sm font-medium">
                  Nomor Telepon <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="noTelp"
                  placeholder="081234567890"
                  value={formData.noTelp}
                  onChange={(e) => handleInputChange("noTelp", e.target.value)}
                  className={`h-9 ${errors.noTelp ? "border-red-500" : ""}`}
                />
                {errors.noTelp && (
                  <p className="text-xs text-red-600">{errors.noTelp}</p>
                )}
              </div>

              {/* Posisi */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Posisi/Jabatan <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.posisi}
                  onValueChange={(value: any) =>
                    handleInputChange("posisi", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POSISI_OPTIONS.map((posisi) => (
                      <SelectItem key={posisi} value={posisi}>
                        {posisi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) =>
                    handleInputChange("status", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tanggal Bergabung */}
              <div className="space-y-2">
                <Label
                  htmlFor="tanggalBergabung"
                  className="text-sm font-medium"
                >
                  Tanggal Bergabung <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tanggalBergabung"
                  type="date"
                  value={formData.tanggalBergabung}
                  onChange={(e) =>
                    handleInputChange("tanggalBergabung", e.target.value)
                  }
                  className={`h-9 ${
                    errors.tanggalBergabung ? "border-red-500" : ""
                  }`}
                />
                {errors.tanggalBergabung && (
                  <p className="text-xs text-red-600">
                    {errors.tanggalBergabung}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:flex-1"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:flex-1"
              >
                {isLoading
                  ? "Menyimpan..."
                  : member
                  ? "Update Member"
                  : "Tambah Member"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
