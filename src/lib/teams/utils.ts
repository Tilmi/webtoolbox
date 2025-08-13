// lib/teams/utils.ts
import { Member, FilterOptions } from "./types";

// Filter members berdasarkan search dan filter options
export const filterMembers = (
  members: Member[],
  filters: FilterOptions
): Member[] => {
  return members.filter((member) => {
    const matchesSearch =
      member.nama.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(filters.search.toLowerCase());

    const matchesPosisi =
      filters.posisi === "" || member.posisi === filters.posisi;
    const matchesStatus =
      filters.status === "" || member.status === filters.status;
    const matchesDepartment =
      filters.department === "" || member.department === filters.department;

    return matchesSearch && matchesPosisi && matchesStatus && matchesDepartment;
  });
};

// Format tanggal untuk display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// Generate random ID untuk member baru
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Validasi email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validasi nomor telepon Indonesia
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Get status badge color
export const getStatusColor = (status: Member["status"]): string => {
  switch (status) {
    case "Aktif":
      return "bg-green-100 text-green-800";
    case "Non-aktif":
      return "bg-red-100 text-red-800";
    case "Cuti":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Get posisi badge color
export const getPosisiColor = (posisi: Member["posisi"]): string => {
  switch (posisi) {
    case "VP":
      return "bg-purple-100 text-purple-800";
    case "Officer":
      return "bg-blue-100 text-blue-800";
    case "Staff":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
