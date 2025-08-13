// components/teams/delete-confirmation-modal.tsx
"use client";

import { Member } from "@/lib/teams/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  member,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: DeleteConfirmationModalProps) {
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
      <DialogContent className="max-w-md mx-4 sm:mx-auto">
        <DialogHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold dark:text-white">
            Konfirmasi Hapus Member
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            Apakah Anda yakin ingin menghapus member ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Member Info Card */}
          <div className="bg-gray-50 dark:bg-transparent rounded-xl p-4 border-2">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                <AvatarImage src={member.photoProfile} alt={member.nama} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  {getInitials(member.nama)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold dark:text-white truncate text-lg">
                  {member.nama}
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
                  ID: {member.employeeId}
                </p>
                <p className="text-sm dark:text-white mt-1">
                  {member.posisi} - {member.department}
                </p>
              </div>
            </div>
          </div>

          {/* Warning Section */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-800 mb-2">
                  Peringatan Penting!
                </h4>
                <div className="text-sm text-red-700 space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Data member akan dihapus secara permanen</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Riwayat dan informasi terkait akan hilang</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Tindakan ini tidak dapat dibatalkan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:flex-1 h-11"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full sm:flex-1 h-11 bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menghapus...
                </>
              ) : (
                <>Hapus Member</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
