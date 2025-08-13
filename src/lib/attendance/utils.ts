// lib/attendance/utils.ts
import { AttendanceStats, AttendanceRecord, Meeting } from "./types";

export function generateMeetingId(): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substr(2, 9);
  return `MTG_${timestamp}_${randomStr}`;
}

export function generateQRData(
  meetingId: string,
  meetingTitle: string
): string {
  return JSON.stringify({
    meetingId,
    meetingTitle,
    timestamp: new Date().toISOString(),
    version: "1.0",
  });
}

export function parseQRData(qrString: string): {
  meetingId: string;
  meetingTitle: string;
  timestamp: string;
} | null {
  try {
    const data = JSON.parse(qrString);
    if (data.meetingId && data.meetingTitle && data.timestamp) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Failed to parse QR data:", error);
    return null;
  }
}

export function calculateAttendanceStats(
  records: AttendanceRecord[],
  meeting: Meeting,
  totalRegistered: number
): AttendanceStats {
  const totalPresent = records.length;
  const attendanceRate =
    totalRegistered > 0 ? (totalPresent / totalRegistered) * 100 : 0;

  // Hitung yang on-time vs late (asumsi meeting dimulai pada startTime)
  const meetingStartTime = new Date(`${meeting.date} ${meeting.startTime}`);
  let onTimeCount = 0;
  let lateCount = 0;

  records.forEach((record) => {
    const scannedTime = new Date(record.scannedAt);
    if (scannedTime <= meetingStartTime) {
      onTimeCount++;
    } else {
      lateCount++;
    }
  });

  return {
    totalRegistered,
    totalPresent,
    attendanceRate: Math.round(attendanceRate * 100) / 100,
    onTimeCount,
    lateCount,
  };
}

export function formatDateTime(dateTime: string | Date): string {
  const date = new Date(dateTime);

  // Avoid hydration issues by using a consistent format
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

export function formatTime(time: string): string {
  try {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  } catch (error) {
    return time;
  }
}

export function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return dateStr;
  }
}

export function exportToCSV(
  records: AttendanceRecord[],
  meeting: Meeting
): void {
  if (typeof window === "undefined") return; // Server-side guard

  const headers = ["No", "Nama", "Email", "Departemen", "Waktu Scan", "Status"];
  const meetingStartTime = new Date(`${meeting.date} ${meeting.startTime}`);

  const csvContent = [
    headers.join(","),
    ...records.map((record, index) => {
      const scannedTime = new Date(record.scannedAt);
      const status =
        scannedTime <= meetingStartTime ? "Tepat Waktu" : "Terlambat";

      return [
        index + 1,
        `"${record.attendee.name.replace(/"/g, '""')}"`, // Escape quotes
        `"${record.attendee.email}"`,
        `"${record.attendee.department || "-"}"`,
        `"${formatDateTime(record.scannedAt)}"`,
        status,
      ].join(",");
    }),
  ].join("\n");

  try {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance_${meeting.title.replace(/[^a-zA-Z0-9]/g, "_")}_${
        meeting.date
      }.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to export CSV:", error);
    alert("Gagal mengekspor file CSV");
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s.'-]+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
}

export function generateAvatar(name: string): string {
  const initials = name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];

  // Use character codes to get consistent color
  const nameHash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = nameHash % colors.length;

  return `${colors[colorIndex]} text-white`;
}

export function getTimeAgo(dateTime: string): string {
  const now = new Date();
  const past = new Date(dateTime);
  const diffMs = now.getTime() - past.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return "Baru saja";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} menit yang lalu`;
  } else if (diffHours < 24) {
    return `${diffHours} jam yang lalu`;
  } else {
    return `${diffDays} hari yang lalu`;
  }
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential XSS characters
    .slice(0, 255); // Limit length
}

export function validateAttendanceData(data: {
  name: string;
  email: string;
  phone?: string;
  department?: string;
}): {
  isValid: boolean;
  errors: Partial<typeof data>;
} {
  const errors: Partial<typeof data> = {};

  // Validate name
  if (!data.name || !isValidName(data.name)) {
    errors.name =
      "Nama tidak valid (minimal 2 karakter, hanya huruf dan spasi)";
  }

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Format email tidak valid";
  }

  // Validate phone (optional)
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = "Format nomor telepon tidak valid";
  }

  // Validate department (optional)
  if (data.department && data.department.trim().length > 50) {
    errors.department = "Departemen maksimal 50 karakter";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateAttendanceReport(
  records: AttendanceRecord[],
  meeting: Meeting,
  totalRegistered: number
) {
  const stats = calculateAttendanceStats(records, meeting, totalRegistered);

  return {
    meeting: {
      id: meeting.id,
      title: meeting.title,
      date: meeting.date,
      time: `${meeting.startTime} - ${meeting.endTime}`,
      location: meeting.location,
    },
    statistics: stats,
    attendees: records.map((record, index) => ({
      no: index + 1,
      name: record.attendee.name,
      email: record.attendee.email,
      department: record.attendee.department || "-",
      scannedAt: record.scannedAt,
      status:
        new Date(record.scannedAt) <=
        new Date(`${meeting.date} ${meeting.startTime}`)
          ? "Tepat Waktu"
          : "Terlambat",
    })),
    generatedAt: new Date().toISOString(),
  };
}
