export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  agenda: string[];
  decisions: string[];
  actionItems: ActionItem[];
  attendees: Attendee[];
  chairperson: string;
  secretary: string;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  notes?: string; // Added notes field
  createdAt: string;
  updatedAt: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  role: string;
  isPresent: boolean;
}

export interface MeetingFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  agenda: string[];
  decisions: string[];
  actionItems: Omit<ActionItem, "id">[];
  attendees: Omit<Attendee, "id">[];
  chairperson: string;
  secretary: string;
  notes?: string; // Added notes field
}

export interface PDFExportOptions {
  includeAgenda: boolean;
  includeDecisions: boolean;
  includeActionItems: boolean;
  includeAttendees: boolean;
  includeSignatures: boolean;
  includeNotes: boolean; // Added notes export option
}
