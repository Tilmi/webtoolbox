// components/teams/member-detail-modal.tsx
"use client";

import { Member } from "@/lib/teams/types";
import { formatDate, getStatusColor, getPosisiColor } from "@/lib/teams/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  IdCard,
  Edit,
  Trash2,
} from "lucide-react";

interface MemberDetailModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
}

export function MemberDetailModal({
  member,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: MemberDetailModalProps) {
  if (!member) return null;

  const getInitials = (nama: string) => {
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg mx-4 sm:mx-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 dark:text-white" />
            Detail Member
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-4 py-2">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-gray-100">
              <AvatarImage src={member.photoProfile} alt={member.nama} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg sm:text-xl font-bold">
                {getInitials(member.nama)}
              </AvatarFallback>
            </Avatar>

            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold dark:text-white">
                {member.nama}
              </h3>
              <p className="text-muted-foreground font-mono text-sm bg-gray-50 px-3 py-1 rounded-full">
                ID: {member.employeeId}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <Badge
                  className={`${getStatusColor(member.status)} font-medium`}
                  variant="secondary"
                >
                  {member.status}
                </Badge>
                <Badge
                  className={`${getPosisiColor(member.posisi)} font-medium`}
                  variant="secondary"
                >
                  {member.posisi}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detail Information */}
          <div className="space-y-4">
            <h4 className="font-semibold dark:text-white text-sm uppercase tracking-wide">
              Informasi Kontak
            </h4>

            <div className="grid gap-3">
              {/* Email */}
              <div className="flex items-start gap-3 p-3 rounded-lg light:bg-gray-50 dark:border-2">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium dark:text-white mb-1">
                    Email
                  </p>
                  <p className="text-sm text-muted-foreground break-all">
                    {member.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3 rounded-lg light:bg-gray-50 dark:border-2">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium dark:text-white mb-1">
                    Nomor Telepon
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.noTelp}
                  </p>
                </div>
              </div>

              {/* Department */}
              <div className="flex items-start gap-3 p-3 rounded-lg light:bg-gray-50 dark:border-2">
                <Building className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium dark:text-white mb-1">
                    Department
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.department}
                  </p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-start gap-3 p-3 rounded-lg light:bg-gray-50 dark:border-2">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium dark:text-white mb-1">
                    Tanggal Bergabung
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(member.tanggalBergabung)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {onEdit && (
              <Button
                variant="outline"
                onClick={() => {
                  onEdit(member);
                  onClose();
                }}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 h-11"
              >
                <Edit className="w-4 h-4" />
                Edit Member
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                onClick={() => {
                  onDelete(member);
                  onClose();
                }}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 h-11 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete Member
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
