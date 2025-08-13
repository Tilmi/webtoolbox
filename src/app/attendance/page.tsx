"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import QRCodeComponent from "@/components/attendance/qr-code";
import AttendanceList from "@/components/attendance/attendance-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Settings,
  RefreshCw,
} from "lucide-react";
import { Meeting, AttendanceRecord } from "@/lib/attendance/types";
import { generateMeetingId } from "@/lib/attendance/utils";

const AttendancePage = () => {
  // Sample meeting data
  const [meeting, setMeeting] = useState<Meeting>({
    id: generateMeetingId(),
    title: "Team Meeting - Q3 Review & Planning",
    description: "Review hasil Q3 dan perencanaan untuk Q4",
    date: new Date().toISOString().split("T")[0],
    startTime: "14:00",
    endTime: "16:00",
    location: "Meeting Room A / Zoom",
    organizerId: "user_123",
    qrCode: "",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [totalRegistered, setTotalRegistered] = useState(50); // Sample data
  const [isClient, setIsClient] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sample initial data
  useEffect(() => {
    if (!isClient) return;

    // Simulasi data awal dengan 4 user
    const sampleRecords: AttendanceRecord[] = [
      {
        id: "1",
        meetingId: meeting.id,
        attendeeId: "att_1",
        attendee: {
          id: "att_1",
          name: "Ahmad Suryadi",
          email: "ahmad.suryadi@pupukkujang.co.id",
          phone: "081234567890",
          department: "Technology Information",
          position: "Senior Developer",
        },
        scannedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 menit yang lalu
        ipAddress: "192.168.1.100",
      },
      {
        id: "2",
        meetingId: meeting.id,
        attendeeId: "att_2",
        attendee: {
          id: "att_2",
          name: "Bob Smith",
          email: "bob.smith@pupukkujang.co.id",
          phone: "081987654321",
          department: "Technology Information",
          position: "Staff",
        },
        scannedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 menit yang lalu
        ipAddress: "192.168.1.101",
      },
      {
        id: "3",
        meetingId: meeting.id,
        attendeeId: "att_3",
        attendee: {
          id: "att_3",
          name: "Budi Santoso",
          email: "budi.santoso@pupukkujang.co.id",
          phone: "081122334455",
          department: "Technology Information",
          position: "Engineer",
        },
        scannedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 menit yang lalu
        ipAddress: "192.168.1.102",
      },
      {
        id: "4",
        meetingId: meeting.id,
        attendeeId: "att_4",
        attendee: {
          id: "att_4",
          name: "Rudi Hermawan",
          email: "rudi.hermawan@pupukkujang.co.id",
          phone: "081555666777",
          department: "Technology Information",
          position: "Officer",
        },
        scannedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 menit yang lalu
        ipAddress: "192.168.1.103",
      },
    ];

    setAttendanceRecords(sampleRecords);
  }, [meeting.id, isClient]);

  const refreshMeeting = () => {
    const newId = generateMeetingId();
    setMeeting((prev) => ({
      ...prev,
      id: newId,
      updatedAt: new Date().toISOString(),
    }));
    toast.success("QR Code telah diperbarui");
  };

  const toggleMeetingStatus = () => {
    setMeeting((prev) => ({
      ...prev,
      isActive: !prev.isActive,
      updatedAt: new Date().toISOString(),
    }));

    toast.success(
      meeting.isActive
        ? "Meeting telah dinonaktifkan"
        : "Meeting telah diaktifkan"
    );
  };

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const currentDate = new Date();
  const meetingDate = new Date(meeting.date);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Sistem Kehadiran</h1>
          <p className="text-muted-foreground">
            Kelola kehadiran meeting dengan QR code
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={toggleMeetingStatus}
            variant={meeting.isActive ? "destructive" : "default"}
            size="sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            {meeting.isActive ? "Nonaktifkan" : "Aktifkan"}
          </Button>

          <Button onClick={refreshMeeting} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Meeting Info Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl">{meeting.title}</CardTitle>
            <Badge variant={meeting.isActive ? "default" : "secondary"}>
              {meeting.isActive ? "Aktif" : "Nonaktif"}
            </Badge>
          </div>
          {meeting.description && (
            <p className="text-muted-foreground">{meeting.description}</p>
          )}
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Tanggal</p>
                <p className="text-sm text-muted-foreground">
                  {meetingDate.toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Waktu</p>
                <p className="text-sm text-muted-foreground">
                  {meeting.startTime} - {meeting.endTime} WIB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Lokasi</p>
                <p className="text-sm text-muted-foreground">
                  {meeting.location}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - QR Code */}
        <QRCodeComponent meeting={meeting} onRefresh={refreshMeeting} />

        {/* Right Column - Attendance List */}
        <AttendanceList
          records={attendanceRecords}
          meeting={meeting}
          totalRegistered={totalRegistered}
        />
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Ringkasan Kehadiran
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {attendanceRecords.length}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Total Hadir
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {totalRegistered > 0
                  ? Math.round(
                      (attendanceRecords.length / totalRegistered) * 100
                    )
                  : 0}
                %
              </div>
              <div className="text-sm text-green-600 font-medium">
                Tingkat Kehadiran
              </div>
            </div>

            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {totalRegistered - attendanceRecords.length}
              </div>
              <div className="text-sm text-orange-600 font-medium">
                Belum Hadir
              </div>
            </div>

            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {totalRegistered}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Total Undangan
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Meeting ID: {meeting.id} • Dibuat:{" "}
          {new Date(meeting.createdAt).toLocaleDateString("id-ID")} •
          Diperbarui: {new Date(meeting.updatedAt).toLocaleDateString("id-ID")}
        </p>
      </div>
    </div>
  );
};

export default AttendancePage;
