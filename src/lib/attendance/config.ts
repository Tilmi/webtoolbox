// lib/attendance/config.ts

export const ATTENDANCE_CONFIG = {
  // QR Code Configuration
  QR_CODE: {
    SIZE: 256,
    ERROR_CORRECTION: "M" as const,
    MARGIN: 4,
    COLOR: {
      DARK: "#000000",
      LIGHT: "#FFFFFF",
    },
  },

  // Meeting Configuration
  MEETING: {
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_LOCATION_LENGTH: 100,
    DEFAULT_DURATION_MINUTES: 120,
    TIMEZONE: "Asia/Jakarta",
  },

  // Attendee Configuration
  ATTENDEE: {
    MAX_NAME_LENGTH: 100,
    MAX_DEPARTMENT_LENGTH: 50,
    MAX_POSITION_LENGTH: 50,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },

  // File Export
  EXPORT: {
    CSV_SEPARATOR: ",",
    DATE_FORMAT: "dd/MM/yyyy HH:mm:ss",
    FILENAME_DATE_FORMAT: "yyyy-MM-dd",
  },

  // UI Configuration
  UI: {
    REFRESH_INTERVAL_MS: 30000, // 30 seconds
    TOAST_DURATION_MS: 3000,
    SEARCH_DEBOUNCE_MS: 300,
  },

  // Validation
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^(\+62|62|0)[0-9]{9,13}$/,
    NAME_REGEX: /^[a-zA-Z\s\.]+$/,
  },
} as const;

// Environment-specific configuration
export const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side
    return window.location.origin;
  }

  // Server-side
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
};

// API Endpoints
export const API_ENDPOINTS = {
  ATTENDANCE: "/attendance/api",
  MEETINGS: "/attendance/api?action=meetings",
  EXPORT_CSV: "/attendance/api/export",
} as const;

// Default values
export const DEFAULT_MEETING = {
  title: "Meeting Baru",
  description: "",
  location: "Meeting Room",
  duration: ATTENDANCE_CONFIG.MEETING.DEFAULT_DURATION_MINUTES,
} as const;

export const DEFAULT_ATTENDEE = {
  name: "",
  email: "",
  phone: "",
  department: "",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Koneksi jaringan bermasalah. Silakan coba lagi.",
  VALIDATION_ERROR: "Data yang dimasukkan tidak valid.",
  DUPLICATE_EMAIL: "Email sudah terdaftar dalam kehadiran ini.",
  MEETING_NOT_FOUND: "Meeting tidak ditemukan.",
  MEETING_INACTIVE: "Meeting sudah tidak aktif.",
  REQUIRED_FIELDS: "Field yang wajib diisi belum lengkap.",
  EMAIL_INVALID: "Format email tidak valid.",
  PHONE_INVALID: "Format nomor telepon tidak valid.",
  NAME_INVALID: "Nama hanya boleh berisi huruf dan spasi.",
  UNKNOWN_ERROR: "Terjadi kesalahan yang tidak diketahui.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  ATTENDANCE_RECORDED: "Kehadiran berhasil dicatat!",
  MEETING_CREATED: "Meeting berhasil dibuat!",
  MEETING_UPDATED: "Meeting berhasil diperbarui!",
  MEETING_DELETED: "Meeting berhasil dihapus!",
  QR_REFRESHED: "QR Code telah diperbarui!",
  DATA_EXPORTED: "Data berhasil diekspor!",
  MEETING_ACTIVATED: "Meeting telah diaktifkan!",
  MEETING_DEACTIVATED: "Meeting telah dinonaktifkan!",
} as const;
