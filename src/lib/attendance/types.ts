// lib/attendance/types.ts
export interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizerId: string;
  qrCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  meetingId: string;
  attendeeId: string;
  attendee: Attendee;
  scannedAt: string;
  ipAddress?: string;
  userAgent?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface AttendanceStats {
  totalRegistered: number;
  totalPresent: number;
  attendanceRate: number;
  onTimeCount: number;
  lateCount: number;
}

export interface QRScanData {
  meetingId: string;
  timestamp: string;
  signature?: string;
}

export interface AttendanceFormData {
  name: string;
  email: string;
  phone?: string;
  department?: string;
}

export type AttendanceStatus = "present" | "absent" | "late";
