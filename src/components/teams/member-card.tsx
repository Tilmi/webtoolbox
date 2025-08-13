// components/teams/member-card.tsx
"use client";

import { Member } from "@/lib/teams/types";
import { formatDate, getStatusColor, getPosisiColor } from "@/lib/teams/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  Calendar,
  Building,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

interface MemberCardProps {
  member: Member;
  onView?: (member: Member) => void;
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
}

export function MemberCard({
  member,
  onView,
  onEdit,
  onDelete,
}: MemberCardProps) {
  const getInitials = (nama: string) => {
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-start gap-4">
            <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-gray-100">
              <AvatarImage src={member.photoProfile} alt={member.nama} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-sm sm:text-base">
                {getInitials(member.nama)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold dark:text-white truncate">
                    {member.nama}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    ID: {member.employeeId}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2 sm:items-end">
                  <Badge
                    className={getStatusColor(member.status)}
                    variant="secondary"
                  >
                    {member.status}
                  </Badge>
                  <Badge
                    className={getPosisiColor(member.posisi)}
                    variant="secondary"
                  >
                    {member.posisi}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 px-1">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 dark:text-white flex-shrink-0" />
              <span
                className="text-muted-foreground truncate"
                title={member.email}
              >
                {member.email}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 dark:text-white flex-shrink-0" />
              <span className="text-muted-foreground">{member.noTelp}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Building className="w-4 h-4 dark:text-white flex-shrink-0" />
              <span
                className="text-muted-foreground truncate"
                title={member.department}
              >
                {member.department}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 dark:text-white flex-shrink-0" />
              <span className="text-muted-foreground">
                Bergabung: {formatDate(member.tanggalBergabung)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-muted-foreground">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(member)}
                className="flex-1 flex items-center justify-center gap-2 "
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View</span>
              </Button>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(member)}
                className="flex-1 flex items-center justify-center gap-2 "
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(member)}
                className="flex-1 flex items-center justify-center gap-2 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
