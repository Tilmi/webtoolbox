// import { Meeting } from "./types";

// export const mockMeetings: Meeting[] = [
//   {
//     id: "1",
//     title: "Rapat Koordinasi Produksi Bulanan",
//     date: "2024-12-15",
//     time: "09:00",
//     location: "Ruang Rapat Utama Gedung Direktorat",
//     description:
//       "Koordinasi bulanan untuk membahas target produksi pupuk dan evaluasi kinerja pabrik",
//     agenda: [
//       "Evaluasi pencapaian produksi pupuk urea dan NPK bulan November 2024",
//       "Review kapasitas produksi dan utilisasi mesin",
//       "Pembahasan rencana maintenance rutin Januari 2025",
//       "Koordinasi pasokan bahan baku dan raw material",
//       "Strategi peningkatan efisiensi produksi",
//     ],
//     decisions: [
//       "Meningkatkan target produksi pupuk urea menjadi 95% kapasitas pada Desember 2024",
//       "Melakukan maintenance besar pabrik NPK pada minggu ketiga Januari 2025",
//       "Mengoptimalkan penggunaan gas alam untuk mengurangi biaya produksi sebesar 8%",
//       "Melakukan audit kualitas produk secara berkala setiap 2 minggu",
//     ],
//     actionItems: [
//       {
//         id: "1",
//         task: "Menyusun jadwal maintenance detail untuk pabrik NPK",
//         assignedTo: "Ir. Budi Santoso (Manager Produksi)",
//         dueDate: "2024-12-20",
//         status: "in-progress",
//       },
//       {
//         id: "2",
//         task: "Koordinasi dengan bagian procurement untuk pasokan bahan baku Q1 2025",
//         assignedTo: "Drs. Ahmad Wijaya (Manager Procurement)",
//         dueDate: "2024-12-18",
//         status: "pending",
//       },
//       {
//         id: "3",
//         task: "Implementasi sistem monitoring real-time efisiensi produksi",
//         assignedTo: "Ir. Sari Dewi (Manager Teknik)",
//         dueDate: "2025-01-15",
//         status: "pending",
//       },
//     ],
//     attendees: [
//       {
//         id: "1",
//         name: "Ir. H. Dedi Supardi, M.T.",
//         email: "dedi.supardi@pupukkujang.com",
//         role: "Direktur Produksi",
//         isPresent: true,
//       },
//       {
//         id: "2",
//         name: "Ir. Budi Santoso",
//         email: "budi.santoso@pupukkujang.com",
//         role: "Manager Produksi",
//         isPresent: true,
//       },
//       {
//         id: "3",
//         name: "Drs. Ahmad Wijaya",
//         email: "ahmad.wijaya@pupukkujang.com",
//         role: "Manager Procurement",
//         isPresent: true,
//       },
//       {
//         id: "4",
//         name: "Ir. Sari Dewi",
//         email: "sari.dewi@pupukkujang.com",
//         role: "Manager Teknik",
//         isPresent: true,
//       },
//       {
//         id: "5",
//         name: "Dr. Andi Pratama",
//         email: "andi.pratama@pupukkujang.com",
//         role: "Manager Quality Control",
//         isPresent: false,
//       },
//     ],
//     chairperson: "Ir. H. Dedi Supardi, M.T.",
//     secretary: "Ir. Sari Dewi",
//     status: "completed",
//     createdAt: "2024-12-10T10:00:00Z",
//     updatedAt: "2024-12-15T11:30:00Z",
//   },
//   {
//     id: "2",
//     title: "Meeting Strategic Planning 2025",
//     date: "2024-12-20",
//     time: "13:30",
//     location: "Auditorium Gedung Corporate",
//     description:
//       "Pembahasan rencana strategis PT Pupuk Kujang untuk tahun 2025 termasuk target produksi, ekspansi pasar, dan investasi teknologi",
//     agenda: [
//       "Review pencapaian target strategis 2024",
//       "Penetapan target produksi dan penjualan 2025",
//       "Rencana investasi teknologi dan modernisasi pabrik",
//       "Strategi ekspansi pasar domestic dan regional",
//       "Program CSR dan sustainability initiatives",
//       "Budget allocation dan financial planning",
//     ],
//     decisions: [
//       "Target produksi total 2025 ditetapkan 2.8 juta ton pupuk",
//       "Alokasi budget Rp 500 miliar untuk modernisasi pabrik",
//       "Ekspansi pasar ke wilayah Indonesia Timur dan Malaysia",
//       "Implementasi program green manufacturing di semua lini produksi",
//     ],
//     actionItems: [
//       {
//         id: "3",
//         task: "Menyusun detailed business plan dan financial projection 2025",
//         assignedTo: "Ir. Rahmat Hidayat (CFO)",
//         dueDate: "2025-01-10",
//         status: "pending",
//       },
//       {
//         id: "4",
//         task: "Feasibility study ekspansi pasar Indonesia Timur",
//         assignedTo: "Dra. Maya Sari (Manager Marketing)",
//         dueDate: "2025-01-20",
//         status: "pending",
//       },
//       {
//         id: "5",
//         task: "Proposal investasi teknologi digital dan automation",
//         assignedTo: "Ir. Riko Pratama (Manager IT)",
//         dueDate: "2025-01-15",
//         status: "pending",
//       },
//     ],
//     attendees: [
//       {
//         id: "6",
//         name: "Ir. H. Bambang Wiranto, M.M.",
//         email: "bambang.wiranto@pupukkujang.com",
//         role: "Direktur Utama",
//         isPresent: true,
//       },
//       {
//         id: "7",
//         name: "Ir. H. Dedi Supardi, M.T.",
//         email: "dedi.supardi@pupukkujang.com",
//         role: "Direktur Produksi",
//         isPresent: true,
//       },
//       {
//         id: "8",
//         name: "Ir. Rahmat Hidayat",
//         email: "rahmat.hidayat@pupukkujang.com",
//         role: "Chief Financial Officer",
//         isPresent: true,
//       },
//       {
//         id: "9",
//         name: "Dra. Maya Sari, M.B.A.",
//         email: "maya.sari@pupukkujang.com",
//         role: "Manager Marketing",
//         isPresent: true,
//       },
//       {
//         id: "10",
//         name: "Ir. Riko Pratama",
//         email: "riko.pratama@pupukkujang.com",
//         role: "Manager IT",
//         isPresent: true,
//       },
//     ],
//     chairperson: "Ir. H. Bambang Wiranto, M.M.",
//     secretary: "Dra. Maya Sari, M.B.A.",
//     status: "scheduled",
//     createdAt: "2024-12-05T15:00:00Z",
//     updatedAt: "2024-12-12T09:20:00Z",
//   },
//   {
//     id: "3",
//     title: "Rapat Koordinasi K3 dan Environmental Compliance",
//     date: "2024-12-18",
//     time: "10:00",
//     location: "Ruang Meeting HSE Department",
//     description:
//       "Evaluasi implementasi program Keselamatan, Kesehatan Kerja dan Lingkungan serta compliance terhadap regulasi pemerintah",
//     agenda: [
//       "Review incident report dan near miss bulan November 2024",
//       "Evaluasi program safety training dan sertifikasi karyawan",
//       "Update compliance status regulasi lingkungan terbaru",
//       "Pembahasan program waste management dan emission control",
//       "Perencanaan audit internal K3 dan lingkungan Q1 2025",
//       "Sosialisasi update SOP keselamatan kerja",
//     ],
//     decisions: [
//       "Implementasi mandatory safety briefing harian di semua shift",
//       "Upgrade sistem deteksi gas dan emergency response equipment",
//       "Pelaksanaan audit lingkungan eksternal pada Februari 2025",
//       "Pelatihan refresher K3 untuk seluruh karyawan operasional",
//     ],
//     actionItems: [
//       {
//         id: "5",
//         task: "Procurement dan instalasi sistem deteksi gas terbaru",
//         assignedTo: "Ir. Agus Supriyanto (Manager HSE)",
//         dueDate: "2025-01-30",
//         status: "in-progress",
//       },
//       {
//         id: "6",
//         task: "Koordinasi dengan lembaga sertifikasi untuk audit lingkungan",
//         assignedTo: "Dr. Linda Permata (Environmental Specialist)",
//         dueDate: "2024-12-25",
//         status: "completed",
//       },
//       {
//         id: "7",
//         task: "Revisi dan update seluruh SOP keselamatan kerja",
//         assignedTo: "Ir. Agus Supriyanto (Manager HSE)",
//         dueDate: "2025-01-10",
//         status: "in-progress",
//       },
//     ],
//     attendees: [
//       {
//         id: "11",
//         name: "Ir. Agus Supriyanto",
//         email: "agus.supriyanto@pupukkujang.com",
//         role: "Manager HSE",
//         isPresent: true,
//       },
//       {
//         id: "12",
//         name: "Dr. Linda Permata",
//         email: "linda.permata@pupukkujang.com",
//         role: "Environmental Specialist",
//         isPresent: true,
//       },
//       {
//         id: "13",
//         name: "Ir. Budi Santoso",
//         email: "budi.santoso@pupukkujang.com",
//         role: "Manager Produksi",
//         isPresent: true,
//       },
//       {
//         id: "14",
//         name: "Drs. Hendra Kusuma",
//         email: "hendra.kusuma@pupukkujang.com",
//         role: "Manager HR & GA",
//         isPresent: true,
//       },
//       {
//         id: "15",
//         name: "Ir. Sari Dewi",
//         email: "sari.dewi@pupukkujang.com",
//         role: "Manager Teknik",
//         isPresent: false,
//       },
//     ],
//     chairperson: "Ir. Agus Supriyanto",
//     secretary: "Dr. Linda Permata",
//     status: "completed",
//     createdAt: "2024-12-01T08:00:00Z",
//     updatedAt: "2024-12-18T12:45:00Z",
//   },
//   {
//     id: "4",
//     title: "Board Meeting - Review Kinerja Q4 2024",
//     date: "2024-12-22",
//     time: "09:00",
//     location: "Boardroom Lantai 5 Gedung Direktorat",
//     description:
//       "Rapat dewan direksi untuk review comprehensive kinerja perusahaan quarter 4 2024 dan approval strategic initiatives",
//     agenda: [
//       "Presentasi financial performance Q4 2024",
//       "Review operational metrics dan KPI achievements",
//       "Evaluasi market position dan competitive landscape",
//       "Pembahasan dividend policy dan profit distribution",
//       "Approval budget dan strategic plan 2025",
//       "Risk assessment dan mitigation strategies",
//     ],
//     decisions: [
//       "Approval budget operasional 2025 sebesar Rp 8.5 triliun",
//       "Dividend payout ratio ditetapkan 45% dari net profit",
//       "Persetujuan investasi teknologi IoT dan digitalisasi pabrik",
//       "Pembentukan divisi baru untuk renewable energy projects",
//     ],
//     actionItems: [
//       {
//         id: "8",
//         task: "Finalisasi annual report 2024 dan submission ke otoritas",
//         assignedTo: "Ir. Rahmat Hidayat (CFO)",
//         dueDate: "2025-01-31",
//         status: "pending",
//       },
//       {
//         id: "9",
//         task: "Pembentukan tim steering committee untuk digital transformation",
//         assignedTo: "Ir. Riko Pratama (Manager IT)",
//         dueDate: "2025-01-05",
//         status: "pending",
//       },
//       {
//         id: "10",
//         task: "Market research untuk renewable energy business opportunity",
//         assignedTo: "Dra. Maya Sari (Manager Marketing)",
//         dueDate: "2025-02-15",
//         status: "pending",
//       },
//     ],
//     attendees: [
//       {
//         id: "16",
//         name: "Ir. H. Bambang Wiranto, M.M.",
//         email: "bambang.wiranto@pupukkujang.com",
//         role: "Direktur Utama",
//         isPresent: true,
//       },
//       {
//         id: "17",
//         name: "Ir. H. Dedi Supardi, M.T.",
//         email: "dedi.supardi@pupukkujang.com",
//         role: "Direktur Produksi",
//         isPresent: true,
//       },
//       {
//         id: "18",
//         name: "Ir. Rahmat Hidayat",
//         email: "rahmat.hidayat@pupukkujang.com",
//         role: "Chief Financial Officer",
//         isPresent: true,
//       },
//       {
//         id: "19",
//         name: "Dr. Ir. Sinta Maharani",
//         email: "sinta.maharani@pupukkujang.com",
//         role: "Direktur Pengembangan Usaha",
//         isPresent: true,
//       },
//       {
//         id: "20",
//         name: "Prof. Dr. Ir. Joko Sutrisno",
//         email: "joko.sutrisno@pupukkujang.com",
//         role: "Komisaris Utama",
//         isPresent: true,
//       },
//     ],
//     chairperson: "Prof. Dr. Ir. Joko Sutrisno",
//     secretary: "Ir. Rahmat Hidayat",
//     status: "scheduled",
//     createdAt: "2024-12-01T08:00:00Z",
//     updatedAt: "2024-12-10T14:30:00Z",
//   },
//   {
//     id: "5",
//     title: "Rapat Evaluasi Program Digitalisasi Pabrik",
//     date: "2024-12-25",
//     time: "14:00",
//     location: "Virtual Meeting - Microsoft Teams",
//     description:
//       "Evaluasi progress implementasi program Industry 4.0 dan digitalisasi proses produksi di seluruh fasilitas PT Pupuk Kujang",
//     agenda: [
//       "Review implementasi MES (Manufacturing Execution System)",
//       "Progress instalasi sensor IoT dan monitoring real-time",
//       "Evaluasi training digital literacy untuk operator pabrik",
//       "Assessment ROI dari investasi teknologi digital",
//       "Roadmap fase berikutnya digital transformation",
//       "Integration dengan existing ERP system",
//     ],
//     decisions: [
//       "Accelerate deployment MES ke pabrik urea dan NPK",
//       "Budget tambahan Rp 150 miliar untuk IoT infrastructure",
//       "Kerjasama dengan universitas untuk R&D digital manufacturing",
//       "Pembentukan Center of Excellence untuk Industry 4.0",
//     ],
//     actionItems: [
//       {
//         id: "11",
//         task: "Vendor selection untuk advanced analytics platform",
//         assignedTo: "Ir. Riko Pratama (Manager IT)",
//         dueDate: "2025-01-20",
//         status: "pending",
//       },
//       {
//         id: "12",
//         task: "Design curriculum pelatihan digital skills untuk karyawan",
//         assignedTo: "Drs. Hendra Kusuma (Manager HR)",
//         dueDate: "2025-01-15",
//         status: "pending",
//       },
//       {
//         id: "13",
//         task: "Pilot project predictive maintenance menggunakan AI",
//         assignedTo: "Ir. Sari Dewi (Manager Teknik)",
//         dueDate: "2025-03-01",
//         status: "pending",
//       },
//     ],
//     attendees: [
//       {
//         id: "21",
//         name: "Ir. H. Bambang Wiranto, M.M.",
//         email: "bambang.wiranto@pupukkujang.com",
//         role: "Direktur Utama",
//         isPresent: true,
//       },
//       {
//         id: "22",
//         name: "Ir. Riko Pratama",
//         email: "riko.pratama@pupukkujang.com",
//         role: "Manager IT",
//         isPresent: true,
//       },
//       {
//         id: "23",
//         name: "Ir. Sari Dewi",
//         email: "sari.dewi@pupukkujang.com",
//         role: "Manager Teknik",
//         isPresent: true,
//       },
//       {
//         id: "24",
//         name: "Dr. Ir. Ahmad Fauzi",
//         email: "ahmad.fauzi@pupukkujang.com",
//         role: "Manager R&D",
//         isPresent: true,
//       },
//       {
//         id: "25",
//         name: "Drs. Hendra Kusuma",
//         email: "hendra.kusuma@pupukkujang.com",
//         role: "Manager HR & GA",
//         isPresent: false,
//       },
//     ],
//     chairperson: "Ir. H. Bambang Wiranto, M.M.",
//     secretary: "Ir. Riko Pratama",
//     status: "scheduled",
//     createdAt: "2024-12-15T10:00:00Z",
//     updatedAt: "2024-12-20T16:45:00Z",
//   },
// ];

// // Utility function to get meeting by ID
// export const getMeetingById = (id: string): Meeting | undefined => {
//   return mockMeetings.find((meeting) => meeting.id === id);
// };

// // Utility function to get all meetings
// export const getAllMeetings = (): Meeting[] => {
//   return mockMeetings.sort(
//     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//   );
// };
import { Meeting } from "./types";

export const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Rapat Koordinasi Produksi Bulanan",
    date: "2024-12-15",
    time: "09:00",
    location: "Ruang Rapat Utama Gedung Direktorat",
    description:
      "Koordinasi bulanan untuk membahas target produksi pupuk dan evaluasi kinerja pabrik",
    agenda: [
      "Evaluasi pencapaian produksi pupuk urea dan NPK bulan November 2024",
      "Review kapasitas produksi dan utilisasi mesin",
      "Pembahasan rencana maintenance rutin Januari 2025",
      "Koordinasi pasokan bahan baku dan raw material",
      "Strategi peningkatan efisiensi produksi",
    ],
    decisions: [
      "Meningkatkan target produksi pupuk urea menjadi 95% kapasitas pada Desember 2024",
      "Melakukan maintenance besar pabrik NPK pada minggu ketiga Januari 2025",
      "Mengoptimalkan penggunaan gas alam untuk mengurangi biaya produksi sebesar 8%",
      "Melakukan audit kualitas produk secara berkala setiap 2 minggu",
    ],
    actionItems: [
      {
        id: "1",
        task: "Menyusun jadwal maintenance detail untuk pabrik NPK",
        assignedTo: "Ir. Budi Santoso (Manager Produksi)",
        dueDate: "2024-12-20",
        status: "in-progress",
      },
      {
        id: "2",
        task: "Koordinasi dengan bagian procurement untuk pasokan bahan baku Q1 2025",
        assignedTo: "Drs. Ahmad Wijaya (Manager Procurement)",
        dueDate: "2024-12-18",
        status: "pending",
      },
      {
        id: "3",
        task: "Implementasi sistem monitoring real-time efisiensi produksi",
        assignedTo: "Ir. Sari Dewi (Manager Teknik)",
        dueDate: "2025-01-15",
        status: "pending",
      },
    ],
    attendees: [
      {
        id: "1",
        name: "Ir. H. Dedi Supardi, M.T.",
        email: "dedi.supardi@pupukkujang.com",
        role: "Direktur Produksi",
        isPresent: true,
      },
      {
        id: "2",
        name: "Ir. Budi Santoso",
        email: "budi.santoso@pupukkujang.com",
        role: "Manager Produksi",
        isPresent: true,
      },
      {
        id: "3",
        name: "Drs. Ahmad Wijaya",
        email: "ahmad.wijaya@pupukkujang.com",
        role: "Manager Procurement",
        isPresent: true,
      },
      {
        id: "4",
        name: "Ir. Sari Dewi",
        email: "sari.dewi@pupukkujang.com",
        role: "Manager Teknik",
        isPresent: true,
      },
      {
        id: "5",
        name: "Dr. Andi Pratama",
        email: "andi.pratama@pupukkujang.com",
        role: "Manager Quality Control",
        isPresent: false,
      },
    ],
    chairperson: "Ir. H. Dedi Supardi, M.T.",
    secretary: "Ir. Sari Dewi",
    status: "completed",
    notes: `Rapat dimulai tepat pukul 09:00 WIB dengan dipimpin oleh Direktur Produksi.

PEMBUKAAN:
- Direktur Produksi menyampaikan apresiasi atas pencapaian produksi November 2024 yang mencapai 92% dari target
- Review singkat kondisi operasional pabrik dan kendala yang dihadapi

PEMBAHASAN UTAMA:

1. EVALUASI PRODUKSI NOVEMBER 2024
   - Produksi pupuk urea: 185.000 ton (target: 200.000 ton)
   - Produksi pupuk NPK: 95.000 ton (target: 100.000 ton)
   - Tingkat utilisasi mesin: 89% (target: 95%)
   - Kendala utama: supply gas alam tidak stabil selama 3 hari

2. REVIEW KAPASITAS PRODUKSI
   - Manager Produksi melaporkan beberapa equipment memerlukan maintenance
   - Kompressor utama pabrik urea menunjukkan signs of wear
   - Conveyor belt pabrik NPK perlu replacement

3. RENCANA MAINTENANCE JANUARI 2025
   - Dijadwalkan shutdown besar selama 2 minggu
   - Budget yang dibutuhkan: Rp 25 miliar
   - Vendor maintenance sudah dikonfirmasi

4. KOORDINASI BAHAN BAKU
   - Stock ammonia mencukupi untuk 2 bulan kedepan
   - Phosphate rock perlu additional procurement
   - Contract renewal dengan supplier gas alam

5. STRATEGI EFISIENSI
   - Implementasi predictive maintenance
   - Training operator untuk optimal operation
   - Energy saving initiatives

DISKUSI:
- Manager Teknik menyarankan investasi sensor IoT untuk monitoring real-time
- Manager QC mengingatkan pentingnya konsistensi kualitas produk
- Direktur menekankan pentingnya safety dan environmental compliance

KESIMPULAN:
Rapat berjalan lancar dengan partisipasi aktif dari seluruh peserta. Semua agenda berhasil dibahas tuntas dengan keputusan yang konkret dan actionable.

Rapat ditutup pukul 11:30 WIB.`,
    createdAt: "2024-12-10T10:00:00Z",
    updatedAt: "2024-12-15T11:30:00Z",
  },
  {
    id: "2",
    title: "Meeting Strategic Planning 2025",
    date: "2024-12-20",
    time: "13:30",
    location: "Auditorium Gedung Corporate",
    description:
      "Pembahasan rencana strategis PT Pupuk Kujang untuk tahun 2025 termasuk target produksi, ekspansi pasar, dan investasi teknologi",
    agenda: [
      "Review pencapaian target strategis 2024",
      "Penetapan target produksi dan penjualan 2025",
      "Rencana investasi teknologi dan modernisasi pabrik",
      "Strategi ekspansi pasar domestic dan regional",
      "Program CSR dan sustainability initiatives",
      "Budget allocation dan financial planning",
    ],
    decisions: [
      "Target produksi total 2025 ditetapkan 2.8 juta ton pupuk",
      "Alokasi budget Rp 500 miliar untuk modernisasi pabrik",
      "Ekspansi pasar ke wilayah Indonesia Timur dan Malaysia",
      "Implementasi program green manufacturing di semua lini produksi",
    ],
    actionItems: [
      {
        id: "3",
        task: "Menyusun detailed business plan dan financial projection 2025",
        assignedTo: "Ir. Rahmat Hidayat (CFO)",
        dueDate: "2025-01-10",
        status: "pending",
      },
      {
        id: "4",
        task: "Feasibility study ekspansi pasar Indonesia Timur",
        assignedTo: "Dra. Maya Sari (Manager Marketing)",
        dueDate: "2025-01-20",
        status: "pending",
      },
      {
        id: "5",
        task: "Proposal investasi teknologi digital dan automation",
        assignedTo: "Ir. Riko Pratama (Manager IT)",
        dueDate: "2025-01-15",
        status: "pending",
      },
    ],
    attendees: [
      {
        id: "6",
        name: "Ir. H. Bambang Wiranto, M.M.",
        email: "bambang.wiranto@pupukkujang.com",
        role: "Direktur Utama",
        isPresent: true,
      },
      {
        id: "7",
        name: "Ir. H. Dedi Supardi, M.T.",
        email: "dedi.supardi@pupukkujang.com",
        role: "Direktur Produksi",
        isPresent: true,
      },
      {
        id: "8",
        name: "Ir. Rahmat Hidayat",
        email: "rahmat.hidayat@pupukkujang.com",
        role: "Chief Financial Officer",
        isPresent: true,
      },
      {
        id: "9",
        name: "Dra. Maya Sari, M.B.A.",
        email: "maya.sari@pupukkujang.com",
        role: "Manager Marketing",
        isPresent: true,
      },
      {
        id: "10",
        name: "Ir. Riko Pratama",
        email: "riko.pratama@pupukkujang.com",
        role: "Manager IT",
        isPresent: true,
      },
    ],
    chairperson: "Ir. H. Bambang Wiranto, M.M.",
    secretary: "Dra. Maya Sari, M.B.A.",
    status: "scheduled",
    createdAt: "2024-12-05T15:00:00Z",
    updatedAt: "2024-12-12T09:20:00Z",
  },
  {
    id: "3",
    title: "Rapat Koordinasi K3 dan Environmental Compliance",
    date: "2024-12-18",
    time: "10:00",
    location: "Ruang Meeting HSE Department",
    description:
      "Evaluasi implementasi program Keselamatan, Kesehatan Kerja dan Lingkungan serta compliance terhadap regulasi pemerintah",
    agenda: [
      "Review incident report dan near miss bulan November 2024",
      "Evaluasi program safety training dan sertifikasi karyawan",
      "Update compliance status regulasi lingkungan terbaru",
      "Pembahasan program waste management dan emission control",
      "Perencanaan audit internal K3 dan lingkungan Q1 2025",
      "Sosialisasi update SOP keselamatan kerja",
    ],
    decisions: [
      "Implementasi mandatory safety briefing harian di semua shift",
      "Upgrade sistem deteksi gas dan emergency response equipment",
      "Pelaksanaan audit lingkungan eksternal pada Februari 2025",
      "Pelatihan refresher K3 untuk seluruh karyawan operasional",
    ],
    actionItems: [
      {
        id: "5",
        task: "Procurement dan instalasi sistem deteksi gas terbaru",
        assignedTo: "Ir. Agus Supriyanto (Manager HSE)",
        dueDate: "2025-01-30",
        status: "in-progress",
      },
      {
        id: "6",
        task: "Koordinasi dengan lembaga sertifikasi untuk audit lingkungan",
        assignedTo: "Dr. Linda Permata (Environmental Specialist)",
        dueDate: "2024-12-25",
        status: "completed",
      },
      {
        id: "7",
        task: "Revisi dan update seluruh SOP keselamatan kerja",
        assignedTo: "Ir. Agus Supriyanto (Manager HSE)",
        dueDate: "2025-01-10",
        status: "in-progress",
      },
    ],
    attendees: [
      {
        id: "11",
        name: "Ir. Agus Supriyanto",
        email: "agus.supriyanto@pupukkujang.com",
        role: "Manager HSE",
        isPresent: true,
      },
      {
        id: "12",
        name: "Dr. Linda Permata",
        email: "linda.permata@pupukkujang.com",
        role: "Environmental Specialist",
        isPresent: true,
      },
      {
        id: "13",
        name: "Ir. Budi Santoso",
        email: "budi.santoso@pupukkujang.com",
        role: "Manager Produksi",
        isPresent: true,
      },
      {
        id: "14",
        name: "Drs. Hendra Kusuma",
        email: "hendra.kusuma@pupukkujang.com",
        role: "Manager HR & GA",
        isPresent: true,
      },
      {
        id: "15",
        name: "Ir. Sari Dewi",
        email: "sari.dewi@pupukkujang.com",
        role: "Manager Teknik",
        isPresent: false,
      },
    ],
    chairperson: "Ir. Agus Supriyanto",
    secretary: "Dr. Linda Permata",
    status: "completed",
    notes: `NOTULENSI RAPAT K3 DAN ENVIRONMENTAL COMPLIANCE

Rapat dibuka pukul 10:00 WIB dengan agenda evaluasi implementasi program K3 dan environmental compliance.

LAPORAN INCIDENT NOVEMBER 2024:
- Total 2 minor incidents (slip and fall di area produksi)
- 5 near miss cases yang sudah ditindaklanjuti
- Zero major accident atau environmental spill
- Safety performance index: 96%

PROGRAM SAFETY TRAINING:
- Completed: 450 karyawan (90% dari target)
- Pending: 50 karyawan (new hires dan long leave returns)
- Sertifikasi K3 teknisi: 95% completion rate
- Emergency response drill: dilaksanakan monthly dengan hasil memuaskan

COMPLIANCE STATUS:
- Environmental permit: semua up-to-date
- Waste water treatment: compliance rate 98%
- Air emission: dalam batas normal sesuai regulasi
- B3 waste management: sudah sesuai prosedur

WASTE MANAGEMENT UPDATE:
- Solid waste reduction: 15% YoY
- Water recycling program: implemented di pabrik NPK
- B3 waste temporary storage: akan diperluas kapasitasnya

PERENCANAAN AUDIT Q1 2025:
- Internal audit: minggu ketiga Januari 2025
- External audit lingkungan: 10-12 Februari 2025
- Management review: akhir Maret 2025

UPDATE SOP:
- 15 SOP K3 telah direvisi sesuai best practices
- Digital SOP implementation melalui tablet di lapangan
- Training untuk supervisor telah dijadwalkan

DISKUSI TAMBAHAN:
- Manager Produksi menyampaikan komitmen penuh terhadap safety culture
- Environmental Specialist mengusulkan program green initiative
- Manager HR akan koordinasi untuk refresher training

KESIMPULAN:
Performance K3 dan environmental compliance menunjukkan tren positif. Komitmen management dan participation seluruh karyawan menjadi kunci keberhasilan program.

Rapat ditutup pukul 12:45 WIB dengan komitmen untuk improvement berkelanjutan.`,
    createdAt: "2024-12-01T08:00:00Z",
    updatedAt: "2024-12-18T12:45:00Z",
  },
  {
    id: "4",
    title: "Board Meeting - Review Kinerja Q4 2024",
    date: "2024-12-22",
    time: "09:00",
    location: "Boardroom Lantai 5 Gedung Direktorat",
    description:
      "Rapat dewan direksi untuk review comprehensive kinerja perusahaan quarter 4 2024 dan approval strategic initiatives",
    agenda: [
      "Presentasi financial performance Q4 2024",
      "Review operational metrics dan KPI achievements",
      "Evaluasi market position dan competitive landscape",
      "Pembahasan dividend policy dan profit distribution",
      "Approval budget dan strategic plan 2025",
      "Risk assessment dan mitigation strategies",
    ],
    decisions: [
      "Approval budget operasional 2025 sebesar Rp 8.5 triliun",
      "Dividend payout ratio ditetapkan 45% dari net profit",
      "Persetujuan investasi teknologi IoT dan digitalisasi pabrik",
      "Pembentukan divisi baru untuk renewable energy projects",
    ],
    actionItems: [
      {
        id: "8",
        task: "Finalisasi annual report 2024 dan submission ke otoritas",
        assignedTo: "Ir. Rahmat Hidayat (CFO)",
        dueDate: "2025-01-31",
        status: "pending",
      },
      {
        id: "9",
        task: "Pembentukan tim steering committee untuk digital transformation",
        assignedTo: "Ir. Riko Pratama (Manager IT)",
        dueDate: "2025-01-05",
        status: "pending",
      },
      {
        id: "10",
        task: "Market research untuk renewable energy business opportunity",
        assignedTo: "Dra. Maya Sari (Manager Marketing)",
        dueDate: "2025-02-15",
        status: "pending",
      },
    ],
    attendees: [
      {
        id: "16",
        name: "Ir. H. Bambang Wiranto, M.M.",
        email: "bambang.wiranto@pupukkujang.com",
        role: "Direktur Utama",
        isPresent: true,
      },
      {
        id: "17",
        name: "Ir. H. Dedi Supardi, M.T.",
        email: "dedi.supardi@pupukkujang.com",
        role: "Direktur Produksi",
        isPresent: true,
      },
      {
        id: "18",
        name: "Ir. Rahmat Hidayat",
        email: "rahmat.hidayat@pupukkujang.com",
        role: "Chief Financial Officer",
        isPresent: true,
      },
      {
        id: "19",
        name: "Dr. Ir. Sinta Maharani",
        email: "sinta.maharani@pupukkujang.com",
        role: "Direktur Pengembangan Usaha",
        isPresent: true,
      },
      {
        id: "20",
        name: "Prof. Dr. Ir. Joko Sutrisno",
        email: "joko.sutrisno@pupukkujang.com",
        role: "Komisaris Utama",
        isPresent: true,
      },
    ],
    chairperson: "Prof. Dr. Ir. Joko Sutrisno",
    secretary: "Ir. Rahmat Hidayat",
    status: "scheduled",
    createdAt: "2024-12-01T08:00:00Z",
    updatedAt: "2024-12-10T14:30:00Z",
  },
  {
    id: "5",
    title: "Rapat Evaluasi Program Digitalisasi Pabrik",
    date: "2024-12-25",
    time: "14:00",
    location: "Virtual Meeting - Microsoft Teams",
    description:
      "Evaluasi progress implementasi program Industry 4.0 dan digitalisasi proses produksi di seluruh fasilitas PT Pupuk Kujang",
    agenda: [
      "Review implementasi MES (Manufacturing Execution System)",
      "Progress instalasi sensor IoT dan monitoring real-time",
      "Evaluasi training digital literacy untuk operator pabrik",
      "Assessment ROI dari investasi teknologi digital",
      "Roadmap fase berikutnya digital transformation",
      "Integration dengan existing ERP system",
    ],
    decisions: [
      "Accelerate deployment MES ke pabrik urea dan NPK",
      "Budget tambahan Rp 150 miliar untuk IoT infrastructure",
      "Kerjasama dengan universitas untuk R&D digital manufacturing",
      "Pembentukan Center of Excellence untuk Industry 4.0",
    ],
    actionItems: [
      {
        id: "11",
        task: "Vendor selection untuk advanced analytics platform",
        assignedTo: "Ir. Riko Pratama (Manager IT)",
        dueDate: "2025-01-20",
        status: "pending",
      },
      {
        id: "12",
        task: "Design curriculum pelatihan digital skills untuk karyawan",
        assignedTo: "Drs. Hendra Kusuma (Manager HR)",
        dueDate: "2025-01-15",
        status: "pending",
      },
      {
        id: "13",
        task: "Pilot project predictive maintenance menggunakan AI",
        assignedTo: "Ir. Sari Dewi (Manager Teknik)",
        dueDate: "2025-03-01",
        status: "pending",
      },
    ],
    attendees: [
      {
        id: "21",
        name: "Ir. H. Bambang Wiranto, M.M.",
        email: "bambang.wiranto@pupukkujang.com",
        role: "Direktur Utama",
        isPresent: true,
      },
      {
        id: "22",
        name: "Ir. Riko Pratama",
        email: "riko.pratama@pupukkujang.com",
        role: "Manager IT",
        isPresent: true,
      },
      {
        id: "23",
        name: "Ir. Sari Dewi",
        email: "sari.dewi@pupukkujang.com",
        role: "Manager Teknik",
        isPresent: true,
      },
      {
        id: "24",
        name: "Dr. Ir. Ahmad Fauzi",
        email: "ahmad.fauzi@pupukkujang.com",
        role: "Manager R&D",
        isPresent: true,
      },
      {
        id: "25",
        name: "Drs. Hendra Kusuma",
        email: "hendra.kusuma@pupukkujang.com",
        role: "Manager HR & GA",
        isPresent: false,
      },
    ],
    chairperson: "Ir. H. Bambang Wiranto, M.M.",
    secretary: "Ir. Riko Pratama",
    status: "ongoing",
    notes: `Meeting masih berlangsung - catatan sementara:

OPENING SESSION (14:00 - 14:15):
- Meeting dibuka dengan sambutan Direktur Utama
- Overview agenda dan objectives meeting
- Konfirmasi attendance seluruh peserta via virtual platform

MES IMPLEMENTATION REVIEW (14:15 - 14:45):
- Manager IT melaporkan progress deployment MES
- Phase 1 (Pabrik Urea): 80% completion
- Phase 2 (Pabrik NPK): 45% completion  
- Main challenges: system integration dengan existing equipment
- Training untuk operator: 60% completed

IoT SENSOR DEPLOYMENT (14:45 - 15:15):
- Total 150 sensor telah terpasang dari target 200 sensor
- Real-time monitoring dashboard sudah operational
- Data accuracy rate: 98.5%
- Some connectivity issues di area dengan signal lemah

DIGITAL LITERACY TRAINING:
- 320 karyawan telah menyelesaikan basic digital training
- Advanced training untuk supervisor: ongoing
- Feedback positif dari participants
- Beberapa resistance dari senior operators

ROI ASSESSMENT (In Progress):
- Initial calculation menunjukkan positive ROI projection
- Efficiency improvement: 12% YoY
- Maintenance cost reduction: 8%
- Detailed analysis akan dipresentasikan dalam session berikutnya

Meeting akan berlanjut hingga 16:30 WIB...`,
    createdAt: "2024-12-15T10:00:00Z",
    updatedAt: "2024-12-20T16:45:00Z",
  },
];

// Utility function to get meeting by ID
export const getMeetingById = (id: string): Meeting | undefined => {
  return mockMeetings.find((meeting) => meeting.id === id);
};

// Utility function to get all meetings
export const getAllMeetings = (): Meeting[] => {
  return mockMeetings.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
