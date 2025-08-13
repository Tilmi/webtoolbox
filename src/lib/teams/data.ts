// lib/teams/data.ts
import { Member } from "./types";

export const mockMembers: Member[] = [
  {
    id: "1",
    employeeId: "PKG001",
    nama: "Ahmad Suryadi",
    email: "ahmad.suryadi@pupukkujang.co.id",
    posisi: "VP",
    department: "Technology Information",
    noTelp: "081234567890",
    status: "Aktif",
    tanggalBergabung: "2020-01-15",
    photoProfile:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    employeeId: "PKG002",
    nama: "Siti Nurhaliza",
    email: "siti.nurhaliza@pupukkujang.co.id",
    posisi: "Officer",
    department: "Technology Information",
    noTelp: "081234567891",
    status: "Aktif",
    tanggalBergabung: "2021-03-10",
    photoProfile:
      "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    employeeId: "PKG003",
    nama: "Budi Santoso",
    email: "budi.santoso@pupukkujang.co.id",
    posisi: "Staff",
    department: "Technology Information",
    noTelp: "081234567892",
    status: "Aktif",
    tanggalBergabung: "2022-07-20",
    photoProfile:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    employeeId: "PKG004",
    nama: "Dewi Anggraini",
    email: "dewi.anggraini@pupukkujang.co.id",
    posisi: "Officer",
    department: "Technology Information",
    noTelp: "081234567893",
    status: "Cuti",
    tanggalBergabung: "2021-11-05",
    photoProfile:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    employeeId: "PKG005",
    nama: "Rudi Hermawan",
    email: "rudi.hermawan@pupukkujang.co.id",
    posisi: "Staff",
    department: "Technology Information",
    noTelp: "081234567894",
    status: "Non-aktif",
    tanggalBergabung: "2019-09-12",
    photoProfile:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

// Department options (bisa diperluas nanti)
export const departmentOptions = [
  "Technology Information",
  "IT Support",
  "System Development",
  "Data Analytics",
  "Cybersecurity",
];
