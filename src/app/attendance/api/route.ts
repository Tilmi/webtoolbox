// app/attendance/api/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  Meeting,
  AttendanceRecord,
  AttendanceFormData,
  Attendee,
} from "@/lib/attendance/types";
import { generateMeetingId } from "@/lib/attendance/utils";

// In-memory storage (gunakan database di production)
let meetings: Meeting[] = [];
let attendanceRecords: AttendanceRecord[] = [];

// GET - Ambil data meeting dan attendance records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const meetingId = searchParams.get("meetingId");
    const action = searchParams.get("action");

    if (action === "meetings") {
      return NextResponse.json({
        success: true,
        data: meetings,
      });
    }

    if (meetingId) {
      const meeting = meetings.find((m) => m.id === meetingId);

      if (!meeting) {
        return NextResponse.json(
          {
            success: false,
            error: "Meeting tidak ditemukan",
          },
          { status: 404 }
        );
      }

      const records = attendanceRecords.filter(
        (r) => r.meetingId === meetingId
      );

      return NextResponse.json({
        success: true,
        data: {
          meeting,
          records,
          totalRecords: records.length,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        meetings,
        totalMeetings: meetings.length,
        totalAttendanceRecords: attendanceRecords.length,
      },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// POST - Buat meeting baru atau catat kehadiran
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "create_meeting") {
      const {
        title,
        description,
        date,
        startTime,
        endTime,
        location,
        organizerId,
      } = body;

      // Validasi input
      if (!title || !date || !startTime || !endTime || !location) {
        return NextResponse.json(
          {
            success: false,
            error: "Field yang wajib diisi belum lengkap",
          },
          { status: 400 }
        );
      }

      const newMeeting: Meeting = {
        id: generateMeetingId(),
        title,
        description,
        date,
        startTime,
        endTime,
        location,
        organizerId: organizerId || "anonymous",
        qrCode: "", // Will be generated on frontend
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      meetings.push(newMeeting);

      return NextResponse.json({
        success: true,
        data: newMeeting,
        message: "Meeting berhasil dibuat",
      });
    }

    if (action === "record_attendance") {
      const {
        meetingId,
        attendeeData,
      }: {
        meetingId: string;
        attendeeData: AttendanceFormData;
      } = body;

      // Validasi meeting exists
      const meeting = meetings.find((m) => m.id === meetingId);
      if (!meeting) {
        return NextResponse.json(
          {
            success: false,
            error: "Meeting tidak ditemukan",
          },
          { status: 404 }
        );
      }

      // Check if meeting is active
      if (!meeting.isActive) {
        return NextResponse.json(
          {
            success: false,
            error: "Meeting sudah tidak aktif",
          },
          { status: 400 }
        );
      }

      // Validasi input
      if (!attendeeData.name || !attendeeData.email) {
        return NextResponse.json(
          {
            success: false,
            error: "Nama dan email wajib diisi",
          },
          { status: 400 }
        );
      }

      // Check duplicate email for this meeting
      const existingRecord = attendanceRecords.find(
        (r) =>
          r.meetingId === meetingId &&
          r.attendee.email.toLowerCase() === attendeeData.email.toLowerCase()
      );

      if (existingRecord) {
        return NextResponse.json(
          {
            success: false,
            error: "Email sudah terdaftar dalam kehadiran meeting ini",
          },
          { status: 400 }
        );
      }

      // Create new attendee
      const newAttendee: Attendee = {
        id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: attendeeData.name,
        email: attendeeData.email,
        phone: attendeeData.phone,
        department: attendeeData.department,
      };

      // Create attendance record
      const newRecord: AttendanceRecord = {
        id: `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        meetingId,
        attendeeId: newAttendee.id,
        attendee: newAttendee,
        scannedAt: new Date().toISOString(),
        ipAddress:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown",
        userAgent: request.headers.get("user-agent") || undefined,
      };

      attendanceRecords.push(newRecord);

      return NextResponse.json({
        success: true,
        data: newRecord,
        message: `Kehadiran ${attendeeData.name} berhasil dicatat`,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Action tidak valid",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// PUT - Update meeting atau attendance record
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, meetingId } = body;

    if (action === "toggle_meeting_status") {
      const meetingIndex = meetings.findIndex((m) => m.id === meetingId);

      if (meetingIndex === -1) {
        return NextResponse.json(
          {
            success: false,
            error: "Meeting tidak ditemukan",
          },
          { status: 404 }
        );
      }

      meetings[meetingIndex] = {
        ...meetings[meetingIndex],
        isActive: !meetings[meetingIndex].isActive,
        updatedAt: new Date().toISOString(),
      };

      return NextResponse.json({
        success: true,
        data: meetings[meetingIndex],
        message: `Meeting ${
          meetings[meetingIndex].isActive ? "diaktifkan" : "dinonaktifkan"
        }`,
      });
    }

    if (action === "update_meeting") {
      const meetingIndex = meetings.findIndex((m) => m.id === meetingId);

      if (meetingIndex === -1) {
        return NextResponse.json(
          {
            success: false,
            error: "Meeting tidak ditemukan",
          },
          { status: 404 }
        );
      }

      const { title, description, date, startTime, endTime, location } = body;

      meetings[meetingIndex] = {
        ...meetings[meetingIndex],
        ...(title && { title }),
        ...(description && { description }),
        ...(date && { date }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(location && { location }),
        updatedAt: new Date().toISOString(),
      };

      return NextResponse.json({
        success: true,
        data: meetings[meetingIndex],
        message: "Meeting berhasil diperbarui",
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Action tidak valid",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Hapus meeting atau attendance record
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const meetingId = searchParams.get("meetingId");
    const recordId = searchParams.get("recordId");

    if (recordId) {
      // Delete specific attendance record
      const recordIndex = attendanceRecords.findIndex((r) => r.id === recordId);

      if (recordIndex === -1) {
        return NextResponse.json(
          {
            success: false,
            error: "Record kehadiran tidak ditemukan",
          },
          { status: 404 }
        );
      }

      const deletedRecord = attendanceRecords.splice(recordIndex, 1)[0];

      return NextResponse.json({
        success: true,
        data: deletedRecord,
        message: "Record kehadiran berhasil dihapus",
      });
    }

    if (meetingId) {
      // Delete meeting and all related attendance records
      const meetingIndex = meetings.findIndex((m) => m.id === meetingId);

      if (meetingIndex === -1) {
        return NextResponse.json(
          {
            success: false,
            error: "Meeting tidak ditemukan",
          },
          { status: 404 }
        );
      }

      // Delete meeting
      const deletedMeeting = meetings.splice(meetingIndex, 1)[0];

      // Delete all related attendance records
      const deletedRecords = attendanceRecords.filter(
        (r) => r.meetingId === meetingId
      );
      attendanceRecords = attendanceRecords.filter(
        (r) => r.meetingId !== meetingId
      );

      return NextResponse.json({
        success: true,
        data: {
          meeting: deletedMeeting,
          deletedRecordsCount: deletedRecords.length,
        },
        message: `Meeting dan ${deletedRecords.length} record kehadiran berhasil dihapus`,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Parameter tidak valid",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
