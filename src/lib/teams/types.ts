// lib/teams/types.ts

export interface Member {
  id: string;
  employeeId: string;
  nama: string;
  email: string;
  posisi: "VP" | "Officer" | "Staff";
  department: string;
  noTelp: string;
  status: "Aktif" | "Non-aktif" | "Cuti";
  tanggalBergabung: string;
  photoProfile?: string;
}

export interface MemberFormData {
  employeeId: string;
  nama: string;
  email: string;
  posisi: "VP" | "Officer" | "Staff";
  department: string;
  noTelp: string;
  status: "Aktif" | "Non-aktif" | "Cuti";
  tanggalBergabung: string;
  photoProfile?: string;
}

export interface FilterOptions {
  search: string;
  posisi: string;
  status: string;
  department: string;
}

export const POSISI_OPTIONS = ["VP", "Officer", "Staff"] as const;
export const STATUS_OPTIONS = ["Aktif", "Non-aktif", "Cuti"] as const;
