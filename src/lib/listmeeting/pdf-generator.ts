import jsPDF from "jspdf";
import { Meeting, PDFExportOptions } from "../listmeeting/types";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export class PDFGenerator {
  private doc: jsPDF;
  private pageHeight: number;
  private currentY: number;
  private margin: number;
  private lineHeight: number;

  constructor() {
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
    this.currentY = 20;
    this.margin = 20;
    this.lineHeight = 6;
  }

  private checkPageBreak(neededSpace: number = 10): void {
    if (this.currentY + neededSpace > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  private addTitle(text: string): void {
    this.checkPageBreak(15);
    this.doc.setFontSize(16);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(text, this.margin, this.currentY);
    this.currentY += 12;
  }

  private addSubtitle(text: string): void {
    this.checkPageBreak(10);
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(text, this.margin, this.currentY);
    this.currentY += 8;
  }

  private addText(text: string, indent: number = 0): void {
    this.checkPageBreak(8);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "normal");

    const maxWidth =
      this.doc.internal.pageSize.width - this.margin * 2 - indent;
    const lines = this.doc.splitTextToSize(text, maxWidth);

    for (const line of lines) {
      this.checkPageBreak(6);
      this.doc.text(line, this.margin + indent, this.currentY);
      this.currentY += this.lineHeight;
    }
  }

  private addBulletPoint(text: string): void {
    this.checkPageBreak(8);
    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "normal");

    const bulletPoint = "• ";
    const maxWidth = this.doc.internal.pageSize.width - this.margin * 2 - 10;
    const lines = this.doc.splitTextToSize(text, maxWidth);

    // First line with bullet
    this.doc.text(bulletPoint + lines[0], this.margin + 5, this.currentY);
    this.currentY += this.lineHeight;

    // Remaining lines indented
    for (let i = 1; i < lines.length; i++) {
      this.checkPageBreak(6);
      this.doc.text(lines[i], this.margin + 10, this.currentY);
      this.currentY += this.lineHeight;
    }
  }

  private addSpacer(): void {
    this.currentY += 5;
  }

  private addHeader(meeting: Meeting): void {
    // Company/Organization Header
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(
      "NOTULENSI RAPAT",
      this.doc.internal.pageSize.width / 2,
      this.currentY,
      { align: "center" }
    );
    this.currentY += 15;

    // Meeting Title
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(
      meeting.title.toUpperCase(),
      this.doc.internal.pageSize.width / 2,
      this.currentY,
      { align: "center" }
    );
    this.currentY += 15;

    // Meeting Info Table
    const infoData = [
      [
        "Tanggal",
        ": " +
          format(new Date(meeting.date), "dd MMMM yyyy", { locale: localeId }),
      ],
      ["Waktu", ": " + meeting.time + " WIB"],
      ["Tempat", ": " + meeting.location],
      ["Pimpinan Rapat", ": " + meeting.chairperson],
      ["Notulis", ": " + meeting.secretary],
    ];

    this.doc.setFontSize(11);
    this.doc.setFont("helvetica", "normal");

    for (const [label, value] of infoData) {
      this.checkPageBreak(8);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(label.padEnd(20), this.margin, this.currentY);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(value, this.margin + 50, this.currentY);
      this.currentY += this.lineHeight + 1;
    }

    this.addSpacer();
  }

  private addAttendees(meeting: Meeting): void {
    this.addSubtitle("PESERTA RAPAT");

    const presentAttendees = meeting.attendees.filter((a) => a.isPresent);
    const absentAttendees = meeting.attendees.filter((a) => !a.isPresent);

    if (presentAttendees.length > 0) {
      this.doc.setFont("helvetica", "bold");
      this.addText("Hadir:", 5);
      this.doc.setFont("helvetica", "normal");

      presentAttendees.forEach((attendee, index) => {
        this.addText(`${index + 1}. ${attendee.name} (${attendee.role})`, 10);
      });
    }

    if (absentAttendees.length > 0) {
      this.addSpacer();
      this.doc.setFont("helvetica", "bold");
      this.addText("Tidak Hadir:", 5);
      this.doc.setFont("helvetica", "normal");

      absentAttendees.forEach((attendee, index) => {
        this.addText(`${index + 1}. ${attendee.name} (${attendee.role})`, 10);
      });
    }

    this.addSpacer();
  }

  private addAgenda(meeting: Meeting): void {
    if (meeting.agenda.length === 0) return;

    this.addSubtitle("AGENDA RAPAT");
    meeting.agenda.forEach((item, index) => {
      this.addText(`${index + 1}. ${item}`, 5);
    });
    this.addSpacer();
  }

  private addNotes(meeting: Meeting): void {
    if (!meeting.notes || meeting.notes.trim() === "") return;

    this.addSubtitle("NOTULENSI RAPAT");

    // Split notes by paragraphs and process each one
    const paragraphs = meeting.notes.split("\n\n");

    paragraphs.forEach((paragraph) => {
      if (paragraph.trim()) {
        // Handle line breaks within paragraphs
        const lines = paragraph.split("\n");
        lines.forEach((line) => {
          if (line.trim()) {
            this.addText(line.trim(), 5);
          } else {
            // Add small space for empty lines
            this.currentY += 3;
          }
        });

        // Add space between paragraphs
        this.addSpacer();
      }
    });

    this.addSpacer();
  }

  private addDecisions(meeting: Meeting): void {
    if (meeting.decisions.length === 0) return;

    this.addSubtitle("KEPUTUSAN RAPAT");
    meeting.decisions.forEach((decision, index) => {
      this.addText(`${index + 1}. ${decision}`, 5);
    });
    this.addSpacer();
  }

  private addActionItems(meeting: Meeting): void {
    if (meeting.actionItems.length === 0) return;

    this.addSubtitle("ACTION ITEMS");

    meeting.actionItems.forEach((item, index) => {
      this.checkPageBreak(20);

      // Action item number and task
      this.doc.setFont("helvetica", "bold");
      this.addText(`${index + 1}. ${item.task}`, 5);

      // PIC and due date
      this.doc.setFont("helvetica", "normal");
      this.addText(`   PIC: ${item.assignedTo}`, 5);
      this.addText(
        `   Due Date: ${format(new Date(item.dueDate), "dd MMMM yyyy", {
          locale: localeId,
        })}`,
        5
      );

      // Status with Indonesian translation
      const statusTranslation = {
        pending: "Pending",
        "in-progress": "Sedang Dikerjakan",
        completed: "Selesai",
      };

      this.addText(
        `   Status: ${statusTranslation[item.status] || item.status}`,
        5
      );

      this.addSpacer();
    });

    this.addSpacer();
  }

  private addSignatures(meeting: Meeting): void {
    this.checkPageBreak(60);

    const signatureY = this.currentY + 20;
    const pageWidth = this.doc.internal.pageSize.width;

    // Date
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(11);
    this.doc.text(
      `Jakarta, ${format(new Date(), "dd MMMM yyyy", { locale: localeId })}`,
      pageWidth - this.margin,
      signatureY - 10,
      { align: "right" }
    );

    // Signatures
    this.doc.setFont("helvetica", "bold");

    // Left signature (Secretary)
    const leftX = this.margin + 40;
    this.doc.text("Notulis,", leftX, signatureY, { align: "center" });
    this.doc.text(meeting.secretary, leftX, signatureY + 40, {
      align: "center",
    });

    // Right signature (Chairperson)
    const rightX = pageWidth - this.margin - 40;
    this.doc.text("Pimpinan Rapat,", rightX, signatureY, { align: "center" });
    this.doc.text(meeting.chairperson, rightX, signatureY + 40, {
      align: "center",
    });
  }

  public generateMeetingMinutes(
    meeting: Meeting,
    options: PDFExportOptions
  ): void {
    // Reset position
    this.currentY = 20;

    // Add content based on options
    this.addHeader(meeting);

    if (options.includeAttendees) {
      this.addAttendees(meeting);
    }

    if (options.includeAgenda) {
      this.addAgenda(meeting);
    }

    if (options.includeNotes && meeting.notes) {
      this.addNotes(meeting);
    }

    if (options.includeDecisions) {
      this.addDecisions(meeting);
    }

    if (options.includeActionItems) {
      this.addActionItems(meeting);
    }

    if (options.includeSignatures) {
      this.addSignatures(meeting);
    }
  }

  public save(filename: string): void {
    this.doc.save(filename);
  }

  public getBlob(): Blob {
    return this.doc.output("blob");
  }
}

export const exportMeetingToPDF = (
  meeting: Meeting,
  options: PDFExportOptions
): void => {
  const generator = new PDFGenerator();
  generator.generateMeetingMinutes(meeting, options);

  const filename = `Notulensi_${meeting.title.replace(
    /[^a-z0-9]/gi,
    "_"
  )}_${format(new Date(meeting.date), "yyyy-MM-dd")}.pdf`;
  generator.save(filename);
};
