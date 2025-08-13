import jsPDF from "jspdf";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import type { Meeting, PDFExportOptions } from "./types";

async function loadSvgAsPngBase64(svgPublicPath: string): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error(
      "loadSvgAsPngBase64 harus dipanggil di sisi klien (browser)"
    );
  }

  const res = await fetch(svgPublicPath, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Gagal memuat SVG: ${res.status}`);
  const raw = await res.text();

  let svg = raw;
  if (!/viewBox=/i.test(svg) && !/width=|height=/i.test(svg)) {
    svg = raw.replace(/<svg(\s[^>]*)?>/i, (m) =>
      m.replace(/>$/, ' viewBox="0 0 256 256">')
    );
  }

  const svgBlob = new Blob([svg], { type: "image/svg+xml" });

  try {
    const bitmap = await createImageBitmap(svgBlob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width || 256;
    canvas.height = bitmap.height || 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context tidak tersedia");
    ctx.drawImage(bitmap, 0, 0);
    return canvas.toDataURL("/kujang.svg");
  } catch {
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await new Promise<void>((resolve, reject) => {
      if (img.complete && (img as any).naturalWidth) return resolve();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Gagal memuat SVG ke Image()"));
    });

    const w = (img as any).naturalWidth || img.width || 256;
    const h = (img as any).naturalHeight || img.height || 256;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context tidak tersedia");
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    return canvas.toDataURL("/kujang.svg");
  }
}

export class PDFGenerator {
  private doc: jsPDF;
  private pageHeight: number;
  private currentY: number;
  private margin: number;
  private lineHeight: number;
  private logoDataUrl?: string;

  constructor() {
    this.doc = new jsPDF({ unit: "mm", format: "a4" });
    this.pageHeight = this.doc.internal.pageSize.height;
    this.currentY = 20;
    this.margin = 20;
    this.lineHeight = 6;

    this.doc.setFont("times", "normal");
    this.doc.setFontSize(11);
  }

  public setLogo(dataUrl: string) {
    this.logoDataUrl = dataUrl;
  }

  public async setLogoFromSvgPath(svgPublicPath: string): Promise<void> {
    const base64 = await loadSvgAsPngBase64(svgPublicPath);
    this.setLogo(base64);
  }

  private checkPageBreak(neededSpace: number = 10): void {
    if (this.currentY + neededSpace > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
      this.addPageHeaderFooter();
    }
  }

  private drawDivider(offsetY: number = 3) {
    const y = this.currentY + offsetY;
    this.doc.setLineWidth(0.2);
    this.doc.line(
      this.margin,
      y,
      this.doc.internal.pageSize.width - this.margin,
      y
    );
    this.currentY = y + 4;
  }

  private addPageHeaderFooter() {}

  private addSectionTitle(text: string): void {
    this.checkPageBreak(10);
    this.doc.setFont("times", "bold");
    this.doc.setFontSize(12);
    this.doc.text(text.toUpperCase(), this.margin, this.currentY);
    this.currentY += 3;
    this.drawDivider();
    this.doc.setFontSize(11);
    this.doc.setFont("times", "normal");
  }

  private addText(text: string, indent: number = 0): void {
    this.checkPageBreak(8);
    const maxWidth =
      this.doc.internal.pageSize.width - this.margin * 2 - indent;
    const lines = this.doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      this.checkPageBreak(6);
      this.doc.text(line, this.margin + indent, this.currentY);
      this.currentY += this.lineHeight;
    }
  }

  private addNumbered(
    text: string,
    index: number,
    baseIndent: number = 0
  ): void {
    const numColWidth = 8;
    const xNumber = this.margin + baseIndent;
    const xText = xNumber + numColWidth;
    const maxWidth = this.doc.internal.pageSize.width - this.margin - xText;

    const lines = this.doc.splitTextToSize(text, maxWidth);
    this.checkPageBreak(6);
    this.doc.text(`${index}.`, xNumber, this.currentY);
    this.doc.text(lines[0], xText, this.currentY);
    this.currentY += this.lineHeight;
    for (let i = 1; i < lines.length; i++) {
      this.checkPageBreak(6);
      this.doc.text(lines[i], xText, this.currentY);
      this.currentY += this.lineHeight;
    }
  }

  private addSpacer(h: number = 4): void {
    this.currentY += h;
  }

  private addHeader(meeting: Meeting): void {
    const pageWidth = this.doc.internal.pageSize.width;
    const headerTop = this.currentY;

    if (this.logoDataUrl) {
      try {
        this.doc.addImage(
          this.logoDataUrl,
          "PNG",
          this.margin,
          headerTop - 5,
          20,
          20
        );
      } catch (e) {
        console.warn("Gagal render logo ke PDF:", e);
      }
    }

    this.doc.setFont("times", "bold");
    this.doc.setFontSize(14);
    this.doc.text("NOTULENSI RAPAT", pageWidth / 2, headerTop, {
      align: "center",
    });

    this.doc.setFontSize(12);
    this.doc.text(meeting.title.toUpperCase(), pageWidth / 2, headerTop + 7, {
      align: "center",
    });

    const lineY1 = headerTop + 12;
    const lineY2 = lineY1 + 1.2;
    this.doc.setLineWidth(0.6);
    this.doc.line(this.margin, lineY1, pageWidth - this.margin, lineY1);
    this.doc.setLineWidth(0.2);
    this.doc.line(this.margin, lineY2, pageWidth - this.margin, lineY2);
    this.currentY = lineY2 + 5;

    this.doc.setFont("times", "normal");
    this.doc.setFontSize(11);
    const labelX = this.margin;
    const colonX = labelX + 35;
    const valueX = colonX + 3;

    const infoRows: Array<[string, string]> = [
      [
        "Tanggal",
        format(new Date(meeting.date), "dd MMMM yyyy", { locale: localeId }),
      ],
      ["Waktu", `${meeting.time} WIB`],
      ["Tempat", meeting.location],
      ["Pimpinan Rapat", meeting.chairperson],
      ["Notulis", meeting.secretary],
    ];

    infoRows.forEach(([label, value]) => {
      this.checkPageBreak(7);
      this.doc.setFont("times", "bold");
      this.doc.text(label, labelX, this.currentY);
      this.doc.setFont("times", "normal");
      this.doc.text(":", colonX, this.currentY);
      const maxWidth = pageWidth - this.margin - valueX;
      const lines = this.doc.splitTextToSize(value, maxWidth);
      this.doc.text(lines as string[], valueX, this.currentY);
      this.currentY += this.lineHeight;
    });

    this.addSpacer(2);
    this.drawDivider();
  }

  private addAttendees(meeting: Meeting): void {
    this.addSectionTitle("Peserta Rapat");
    const presentAttendees = meeting.attendees.filter((a) => a.isPresent);
    const absentAttendees = meeting.attendees.filter((a) => !a.isPresent);

    if (presentAttendees.length > 0) {
      this.doc.setFont("times", "bold");
      this.addText("Hadir:");
      this.doc.setFont("times", "normal");
      presentAttendees.forEach((attendee, index) => {
        this.addNumbered(`${attendee.name} (${attendee.role})`, index + 1, 2);
      });
      this.addSpacer(2);
    }

    if (absentAttendees.length > 0) {
      this.doc.setFont("times", "bold");
      this.addText("Tidak Hadir:");
      this.doc.setFont("times", "normal");
      absentAttendees.forEach((attendee, index) => {
        this.addNumbered(`${attendee.name} (${attendee.role})`, index + 1, 2);
      });
      this.addSpacer(2);
    }
  }

  private addAgenda(meeting: Meeting): void {
    if (meeting.agenda.length === 0) return;
    this.addSectionTitle("Agenda Rapat");
    meeting.agenda.forEach((item, index) => this.addNumbered(item, index + 1));
    this.addSpacer(2);
  }

  private addNotes(meeting: Meeting): void {
    if (!meeting.notes || meeting.notes.trim() === "") return;
    this.addSectionTitle("Notulensi Rapat");

    const paragraphs = meeting.notes.split("\n\n");
    paragraphs.forEach((paragraph) => {
      if (paragraph.trim()) {
        const lines = paragraph.split("\n");
        lines.forEach((line) => {
          if (line.trim()) this.addText(line.trim(), 0);
          else this.currentY += 2;
        });
        this.addSpacer(1);
      }
    });
    this.addSpacer(2);
  }

  private addDecisions(meeting: Meeting): void {
    if (meeting.decisions.length === 0) return;
    this.addSectionTitle("Keputusan Rapat");
    meeting.decisions.forEach((decision, index) =>
      this.addNumbered(decision, index + 1)
    );
    this.addSpacer(2);
  }

  private addActionItems(meeting: Meeting): void {
    if (meeting.actionItems.length === 0) return;
    this.addSectionTitle("Action Items");

    meeting.actionItems.forEach((item, index) => {
      this.checkPageBreak(22);

      this.doc.setFont("times", "bold");
      this.addNumbered(item.task, index + 1);

      this.doc.setFont("times", "normal");
      const statusMap: Record<string, string> = {
        pending: "Pending",
        "in-progress": "Sedang Dikerjakan",
        completed: "Selesai",
      };

      const details = [
        `PIC: ${item.assignedTo}`,
        `Due Date: ${format(new Date(item.dueDate), "dd MMMM yyyy", {
          locale: localeId,
        })}`,
        `Status: ${statusMap[(item as any).status] || (item as any).status}`,
      ];

      details.forEach((t) => this.addText(t, 8));
      this.addSpacer(2);
    });
  }

  private addSignatures(meeting: Meeting): void {
    this.checkPageBreak(60);

    const pageWidth = this.doc.internal.pageSize.width;
    const colWidth = 70;

    this.doc.setFont("times", "normal");
    this.doc.setFontSize(11);
    this.doc.text(
      `Jakarta, ${format(new Date(), "dd MMMM yyyy", { locale: localeId })}`,
      pageWidth - this.margin,
      this.currentY,
      { align: "right" }
    );

    const startY = this.currentY + 8;
    const leftCenterX = this.margin + colWidth / 2;
    const rightCenterX = pageWidth - this.margin - colWidth / 2;

    this.doc.setFont("times", "bold");
    this.doc.text("Notulis,", leftCenterX, startY, { align: "center" });
    this.doc.text("Pimpinan Rapat,", rightCenterX, startY, { align: "center" });

    const signLineY = startY + 30;
    this.doc.setLineWidth(0.2);
    this.doc.line(
      this.margin + 10,
      signLineY,
      this.margin + colWidth - 10,
      signLineY
    );
    this.doc.line(
      pageWidth - this.margin - colWidth + 10,
      signLineY,
      pageWidth - this.margin - 10,
      signLineY
    );

    this.doc.setFont("times", "bold");
    this.doc.text(meeting.secretary, leftCenterX, signLineY + 6, {
      align: "center",
    });
    this.doc.text(meeting.chairperson, rightCenterX, signLineY + 6, {
      align: "center",
    });

    this.currentY = signLineY + 10;
  }

  public generateMeetingMinutes(
    meeting: Meeting,
    options: PDFExportOptions
  ): void {
    this.currentY = 20;
    this.addHeader(meeting);
    if (options.includeAttendees) this.addAttendees(meeting);
    if (options.includeAgenda) this.addAgenda(meeting);
    if (options.includeNotes && meeting.notes) this.addNotes(meeting);
    if (options.includeDecisions) this.addDecisions(meeting);
    if (options.includeActionItems) this.addActionItems(meeting);
    if (options.includeSignatures) this.addSignatures(meeting);
  }

  public save(filename: string): void {
    this.doc.save(filename);
  }

  public getBlob(): Blob {
    return this.doc.output("blob");
  }
}

export async function exportMeetingToPDFWithAutoLogo(
  meeting: Meeting,
  options: PDFExportOptions
): Promise<void> {
  const generator = new PDFGenerator();
  try {
    const logoBase64 = await loadSvgAsPngBase64("kujang.svg");
    generator.setLogo(logoBase64);
  } catch (e) {
    console.warn("Logo gagal dimuat:", e);
  }
  generator.generateMeetingMinutes(meeting, options);
  const filename = `Notulensi_${meeting.title.replace(
    /[^a-z0-9]/gi,
    "_"
  )}_${format(new Date(meeting.date), "yyyy-MM-dd")}.pdf`;
  generator.save(filename);
}

export function exportMeetingToPDF(
  meeting: Meeting,
  options: PDFExportOptions
): void {
  const generator = new PDFGenerator();
  generator.generateMeetingMinutes(meeting, options);
  const filename = `Notulensi_${meeting.title.replace(
    /[^a-z0-9]/gi,
    "_"
  )}_${format(new Date(meeting.date), "yyyy-MM-dd")}.pdf`;
  generator.save(filename);
}
