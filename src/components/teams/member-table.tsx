// components/teams/member-table.tsx
"use client";

import { Member } from "@/lib/teams/types";
import { formatDate, getStatusColor, getPosisiColor } from "@/lib/teams/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Trash2 } from "lucide-react";

interface MemberTableProps {
  members: Member[];
  onView?: (member: Member) => void;
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
}

export function MemberTable({
  members,
  onView,
  onEdit,
  onDelete,
}: MemberTableProps) {
  const getInitials = (nama: string) => {
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (members.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Tidak ada data member yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Mobile View - Stack cards */}
      <div className="block lg:hidden">
        <div className="space-y-4 p-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-gray-50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.photoProfile} alt={member.nama} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                    {getInitials(member.nama)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {member.nama}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID: {member.employeeId}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={`${getStatusColor(member.status)} text-xs`}>
                    {member.status}
                  </Badge>
                  <Badge className={`${getPosisiColor(member.posisi)} text-xs`}>
                    {member.posisi}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="truncate" title={member.email}>
                  <span className="text-gray-600">Email:</span> {member.email}
                </div>
                <div>
                  <span className="text-gray-600">Telp:</span> {member.noTelp}
                </div>
                <div className="truncate" title={member.department}>
                  <span className="text-gray-600">Dept:</span>{" "}
                  {member.department}
                </div>
                <div>
                  <span className="text-gray-600">Bergabung:</span>{" "}
                  {formatDate(member.tanggalBergabung)}
                </div>
              </div>

              <div className="flex justify-end gap-1 pt-2">
                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(member)}
                    className="p-2"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(member)}
                    className="p-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(member)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Photo</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Posisi</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>No. Telp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal Bergabung</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.photoProfile} alt={member.nama} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                      {getInitials(member.nama)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {member.employeeId}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">
                      {member.nama}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <div className="truncate" title={member.email}>
                    {member.email}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPosisiColor(member.posisi)}>
                    {member.posisi}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[150px]">
                  <div className="truncate" title={member.department}>
                    {member.department}
                  </div>
                </TableCell>
                <TableCell>{member.noTelp}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(member.tanggalBergabung)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(member)}
                        className="p-2"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(member)}
                        className="p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(member)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
