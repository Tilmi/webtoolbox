import jsPDF from "jspdf";
import { Meeting } from "@/types/meeting";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export class PDFGenerator {
  private doc: jsPDF;
  private yPosition: number;
  private pageWidth: number;
  private margin: number;

  constructor() {
    this.doc = new jsPDF();
    this.yPosition = 20;
    this.pageWidth = this.doc.internal.pageSize.width;
    this.margin = 20;
  }

  private addTitle(text: string, fontSize = 16) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(text, this.margin, this.yPosition);
    this.yPosition += 10;
  }

  private addSubTitle(text: string, fontSize = 12) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(text, this.margin, this.yPosition);
    this.yPosition += 8;
  }

  private addText(text: string, fontSize = 10, indent = 0) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont("helvetica", "normal");

    const maxWidth = this.pageWidth - this.margin * 2 - indent;
    const lines = this.doc.splitTextToSize(text, maxWidth);

    for (const line of lines) {
      if (this.yPosition > 270) {
        this.doc.addPage();
        this.yPosition = 20;
      }
      this.doc.text(line, this.margin + indent, this.yPosition);
      this.yPosition += 6;
    }
  }

  private addLine() {
    this.doc.line(
      this.margin,
      this.yPosition,
      this.pageWidth - this.margin,
      this.yPosition
    );
    this.yPosition += 5;
  }

  private addSpacing(space = 5) {
    this.yPosition += space;
  }

  private addHeader() {
    // Header dengan logo/kop surat (bisa disesuaikan)
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("NOTULENSI RAPAT", this.pageWidth / 2, 20, {
      align: "center",
    });

    this.yPosition = 35;
    this.addLine();
    this.addSpacing(10);
  }

  private addMeetingInfo(meeting: Meeting) {
    this.addSubTitle("INFORMASI RAPAT");

    const info = [
      { label: "Judul Rapat", value: meeting.title },
      {
        label: "Tanggal",
        value: format(meeting.date, "dd MMMM yyyy", { locale: id }),
      },
      { label: "Waktu", value: meeting.time },
      { label: "Tempat", value: meeting.location },
      { label: "Pimpinan Rapat", value: meeting.chairperson },
      { label: "Notulis", value: meeting.secretary },
      { label: "Peserta Rapat", value: meeting.attendees.join(", ") },
    ];

    info.forEach((item) => {
      this.doc.setFont("helvetica", "bold");
      this.doc.text(`${item.label}:`, this.margin, this.yPosition);
      this.doc.setFont("helvetica", "normal");
      this.addText(item.value, 10, 40);
      this.yPosition -= 6; // Adjust untuk spacing yang tepat
      this.addSpacing(2);
    });

    this.addSpacing(10);
    this.addLine();
    this.addSpacing(10);
  }

  private addAgenda(meeting: Meeting) {
    this.addSubTitle("AGENDA RAPAT");

    if (meeting.agenda.length === 0) {
      this.addText("Tidak ada agenda yang tercatat.");
    } else {
      meeting.agenda.forEach((item, index) => {
        this.addText(`${index + 1}. ${item.title}`, 10, 5);
        if (item.description) {
          this.addText(`   ${item.description}`, 9, 10);
        }
        if (item.presenter) {
          this.addText(`   Presenter: ${item.presenter}`, 9, 10);
        }
        if (item.duration) {
          this.addText(`   Durasi: ${item.duration} menit`, 9, 10);
        }
        this.addSpacing(5);
      });
    }

    this.addSpacing(10);
    this.addLine();
    this.addSpacing(10);
  }

  private addDecisions(meeting: Meeting) {
    this.addSubTitle("KEPUTUSAN RAPAT");

    if (meeting.decisions.length === 0) {
      this.addText("Tidak ada keputusan yang diambil.");
    } else {
      meeting.decisions.forEach((decision, index) => {
        this.addText(`${index + 1}. ${decision.title}`, 10, 5);
        this.addText(`   ${decision.description}`, 9, 10);

        const statusText =
          decision.decisionType === "approved"
            ? "DISETUJUI"
            : decision.decisionType === "rejected"
            ? "DITOLAK"
            : "DITUNDA";
        this.addText(`   Status: ${statusText}`, 9, 10);

        if (decision.votes) {
          this.addText(
            `   Voting - Setuju: ${decision.votes.approve}, Tidak: ${decision.votes.reject}, Abstain: ${decision.votes.abstain}`,
            9,
            10
          );
        }
        this.addSpacing(5);
      });
    }

    this.addSpacing(10);
    this.addLine();
    this.addSpacing(10);
  }

  private addActionItems(meeting: Meeting) {
    this.addSubTitle("TINDAK LANJUT (ACTION ITEMS)");

    if (meeting.actionItems.length === 0) {
      this.addText("Tidak ada tindak lanjut yang ditetapkan.");
    } else {
      meeting.actionItems.forEach((item, index) => {
        this.addText(`${index + 1}. ${item.task}`, 10, 5);
        this.addText(`   Penanggung Jawab: ${item.assignee}`, 9, 10);
        this.addText(
          `   Deadline: ${format(item.dueDate, "dd MMMM yyyy", {
            locale: id,
          })}`,
          9,
          10
        );
        this.addText(`   Prioritas: ${item.priority.toUpperCase()}`, 9, 10);
        this.addText(
          `   Status: ${item.status.replace("-", " ").toUpperCase()}`,
          9,
          10
        );
        this.addSpacing(5);
      });
    }

    this.addSpacing(15);
    this.addLine();
    this.addSpacing(15);
  }

  private addSignatures(meeting: Meeting) {
    this.addSubTitle("PENGESAHAN");

    // Kolom tanda tangan
    const leftX = this.margin;
    const rightX = this.pageWidth - 80;

    // Pimpinan Rapat
    this.doc.text("Pimpinan Rapat", leftX, this.yPosition);
    this.doc.text("Notulis", rightX, this.yPosition);

    this.yPosition += 30; // Space untuk tanda tangan

    // Nama dan garis untuk tanda tangan
    this.doc.line(leftX, this.yPosition, leftX + 60, this.yPosition);
    this.doc.line(rightX, this.yPosition, rightX + 60, this.yPosition);

    this.yPosition += 8;

    this.doc.text(meeting.chairperson, leftX, this.yPosition);
    this.doc.text(meeting.secretary, rightX, this.yPosition);
  }

  private addFooter() {
    const pageCount = this.doc.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.setFont("helvetica", "normal");

      // Tanggal generate
      const now = new Date();
      const dateText = `Dibuat pada: ${format(now, "dd MMMM yyyy HH:mm", {
        locale: id,
      })}`;
      this.doc.text(
        dateText,
        this.margin,
        this.doc.internal.pageSize.height - 10
      );

      // Nomor halaman
      const pageText = `Halaman ${i} dari ${pageCount}`;
      this.doc.text(
        pageText,
        this.pageWidth - this.margin,
        this.doc.internal.pageSize.height - 10,
        { align: "right" }
      );
    }
  }

  public generateMeetingReport(meeting: Meeting): void {
    // Reset position
    this.yPosition = 20;

    // Build PDF content
    this.addHeader();
    this.addMeetingInfo(meeting);
    this.addAgenda(meeting);
    this.addDecisions(meeting);
    this.addActionItems(meeting);
    this.addSignatures(meeting);
    this.addFooter();

    // Generate filename
    const dateStr = format(meeting.date, "yyyy-MM-dd");
    const filename = `Notulensi_${meeting.title.replace(
      /\s+/g,
      "_"
    )}_${dateStr}.pdf`;

    // Save PDF
    this.doc.save(filename);
  }

  public static exportToPDF(meeting: Meeting): void {
    const generator = new PDFGenerator();
    generator.generateMeetingReport(meeting);
  }
}
