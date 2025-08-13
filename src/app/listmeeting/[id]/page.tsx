"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { MeetingDetail } from "@/components/meetings/meeting-detail";
import { MeetingForm } from "@/components/meetings/meeting-form";
import { getMeetingById } from "@/lib/listmeeting/mock-data";
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
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type ViewMode = "detail" | "edit";

export default function MeetingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const meetingId = params.id as string;

  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [currentView, setCurrentView] = useState<ViewMode>("detail");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Load meeting data
  useEffect(() => {
    const loadMeeting = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const meetingData = getMeetingById(meetingId);
        if (meetingData) {
          setMeeting(meetingData);
        }
      } catch (error) {
        console.error("Error loading meeting:", error);
        toast.error("Terjadi kesalahan saat memuat data meeting");
      } finally {
        setIsPageLoading(false);
      }
    };

    if (meetingId) {
      loadMeeting();
    }
  }, [meetingId]);

  // Handle back to list
  const handleBack = () => {
    router.push("/listmeetings");
  };

  // Handle edit meeting
  const handleEdit = () => {
    setCurrentView("edit");
  };

  // Handle delete meeting
  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  // Confirm delete meeting
  const confirmDeleteMeeting = async () => {
    if (!meeting) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Meeting berhasil dihapus!");
      router.push("/listmeetings");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus meeting");
      console.error("Error deleting meeting:", error);
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  // Handle save meeting (update)
  const handleSaveMeeting = async (formData: MeetingFormData) => {
    if (!meeting) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update meeting data
      const updatedMeeting: Meeting = {
        ...meeting,
        ...formData,
        agenda: formData.agenda.filter((item) => item.trim() !== ""),
        decisions: formData.decisions.filter((item) => item.trim() !== ""),
        actionItems: formData.actionItems.map((item, index) => ({
          ...item,
          id:
            meeting.actionItems[index]?.id ||
            `${meeting.id}-action-${index + 1}`,
        })),
        attendees: formData.attendees.map((attendee, index) => ({
          ...attendee,
          id:
            meeting.attendees[index]?.id ||
            `${meeting.id}-attendee-${index + 1}`,
        })),
        updatedAt: new Date().toISOString(),
      };

      setMeeting(updatedMeeting);
      setCurrentView("detail");
      toast.success("Meeting berhasil diperbarui!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan meeting");
      console.error("Error saving meeting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setCurrentView("detail");
  };

  // Loading state
  if (isPageLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </div>

          <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Content Skeleton */}
            <Card>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4  rounded w-1/2"></div>
                        <div className="h-4  rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Meeting not found
  if (!meeting) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Meeting Tidak Ditemukan
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Meeting dengan ID "{meetingId}" tidak ditemukan atau mungkin
                telah dihapus.
              </p>
              <Button onClick={handleBack}>Kembali ke Daftar Meeting</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render content based on current view
  const renderContent = () => {
    switch (currentView) {
      case "edit":
        return (
          <MeetingForm
            meeting={meeting}
            onSave={handleSaveMeeting}
            onCancel={handleCancelEdit}
            isLoading={isLoading}
          />
        );
      default:
        return (
          <MeetingDetail
            meeting={meeting}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">{renderContent()}</div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Meeting</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus meeting "{meeting?.title}"?
              Semua data termasuk agenda, keputusan, dan action items akan
              hilang permanen.
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
              {isLoading ? "Menghapus..." : "Hapus Meeting"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
