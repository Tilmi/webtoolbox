// lib/MeetingData.ts
export interface AgendaItem {
  id: string;
  title: string;
  duration?: string;
  presenter?: string;
}

export interface MeetingFormData {
  title: string;
  description: string;
  agenda: AgendaItem[];
  date: string;
  startTime: string;
  endTime: string;
  meetingType: "online" | "offline";
  platform: string;
  meetingLink: string;
  location: string;
  organizer: string;
  participants: string[];
  department: string;
  maxParticipants: string;
  recurrence: string;
  reminder: string;
  autoRecord: boolean;
  waitingRoom: boolean;
  requireRegistration: boolean;
  needApproval: boolean;
  password: string;
  visibility: "public" | "private" | "department";
}

export interface Member {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar?: string;
}

export const initialMeetingData: MeetingFormData = {
  title: "",
  description: "",
  agenda: [], // Empty agenda items initially
  date: "",
  startTime: "",
  endTime: "",
  meetingType: "online",
  platform: "",
  meetingLink: "",
  location: "",
  organizer: "admin@pupukkujang.com",
  participants: [],
  department: "",
  maxParticipants: "",
  recurrence: "once",
  reminder: "15",
  autoRecord: false,
  waitingRoom: true,
  requireRegistration: false,
  needApproval: false,
  password: "",
  visibility: "private",
};

// Sample members data
export const membersData: Member[] = [
  {
    id: "1",
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@pupukkujang.com",
    department: "engineering",
    position: "Senior Engineer",
    avatar: "AW",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@pupukkujang.com",
    department: "finance",
    position: "Finance Manager",
    avatar: "SN",
  },
  {
    id: "3",
    name: "Budi Santoso",
    email: "budi.santoso@pupukkujang.com",
    department: "IT",
    position: "IT Specialist",
    avatar: "BS",
  },
  {
    id: "4",
    name: "Diana Putri",
    email: "diana.putri@pupukkujang.com",
    department: "engineering",
    position: "Project Manager",
    avatar: "DP",
  },
  {
    id: "5",
    name: "Reza Pratama",
    email: "reza.pratama@pupukkujang.com",
    department: "finance",
    position: "Financial Analyst",
    avatar: "RP",
  },
  {
    id: "6",
    name: "Maya Sari",
    email: "maya.sari@pupukkujang.com",
    department: "IT",
    position: "System Administrator",
    avatar: "MS",
  },
  {
    id: "7",
    name: "Indra Gunawan",
    email: "indra.gunawan@pupukkujang.com",
    department: "engineering",
    position: "Lead Engineer",
    avatar: "IG",
  },
  {
    id: "8",
    name: "Fitri Handayani",
    email: "fitri.handayani@pupukkujang.com",
    department: "finance",
    position: "Accounting Staff",
    avatar: "FH",
  },
];

export const meetingOptions = {
  platforms: [
    { value: "zoom", label: "Zoom" },
    { value: "teams", label: "Microsoft Teams" },
    { value: "meet", label: "Google Meet" },
  ],
  departments: [
    { value: "all", label: "Semua Departemen" },
    { value: "engineering", label: "Engineering" },
    { value: "finance", label: "Finance" },
    { value: "IT", label: "Technology Information" },
  ],
  locations: [
    { value: "meeting-room-a", label: "Meeting Room A" },
    { value: "meeting-room-b", label: "Meeting Room B" },
    { value: "board-room", label: "Board Room" },
    { value: "conference-hall", label: "Conference Hall" },
    { value: "other", label: "Lokasi Lainnya" },
  ],
  recurrenceOptions: [
    { value: "once", label: "Sekali" },
    { value: "daily", label: "Harian" },
    { value: "weekly", label: "Mingguan" },
    { value: "monthly", label: "Bulanan" },
  ],
  reminderOptions: [
    { value: "5", label: "5 menit sebelum" },
    { value: "15", label: "15 menit sebelum" },
    { value: "30", label: "30 menit sebelum" },
    { value: "60", label: "1 jam sebelum" },
    { value: "1440", label: "1 hari sebelum" },
  ],
};

// Function to generate meeting links based on platform
export const generateMeetingLink = (
  platform: string,
  meetingTitle: string
): string => {
  const meetingId = Math.random().toString(36).substring(2, 15);
  const encodedTitle = encodeURIComponent(meetingTitle);

  switch (platform) {
    case "zoom":
      return `https://zoom.us/j/${meetingId}?pwd=${Math.random()
        .toString(36)
        .substring(2, 10)}`;
    case "teams":
      return `https://teams.microsoft.com/l/meetup-join/${meetingId}/${Math.random()
        .toString(36)
        .substring(2, 15)}`;
    case "meet":
      return `https://meet.google.com/${meetingId}`;
    default:
      return "";
  }
};
