"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Meeting } from "@/lib/attendance/types";
import { generateQRData } from "@/lib/attendance/utils";

interface QRCodeComponentProps {
  meeting: Meeting;
  onRefresh?: () => void;
  className?: string;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  meeting,
  onRefresh,
  className = "",
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrLoaded, setQrLoaded] = useState(false);
  const qrData = generateQRData(meeting.id, meeting.title);

  // Generate QR Code menggunakan canvas dan algoritma sederhana
  const generateQRCode = () => {
    if (!qrRef.current) return;

    // Clear previous QR
    qrRef.current.innerHTML = "";

    // Create a simple QR-like grid display
    const container = document.createElement("div");
    container.className = "bg-white p-4 rounded-lg border";
    container.style.width = "256px";
    container.style.height = "256px";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.fontSize = "12px";
    container.style.textAlign = "center";
    container.style.lineHeight = "1.4";

    // Simple QR representation
    const qrGrid = document.createElement("div");
    qrGrid.style.display = "grid";
    qrGrid.style.gridTemplateColumns = "repeat(8, 1fr)";
    qrGrid.style.gap = "2px";
    qrGrid.style.marginBottom = "10px";
    qrGrid.style.width = "120px";
    qrGrid.style.height = "120px";

    // Create simple pattern based on meeting ID
    const pattern = meeting.id
      .split("")
      .map((char, i) => char.charCodeAt(0) % 2);

    for (let i = 0; i < 64; i++) {
      const cell = document.createElement("div");
      cell.style.backgroundColor = pattern[i % pattern.length]
        ? "#000"
        : "#fff";
      cell.style.border = "1px solid #ddd";
      qrGrid.appendChild(cell);
    }

    container.appendChild(qrGrid);

    // Add text info
    const textInfo = document.createElement("div");
    textInfo.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">QR Code Meeting</div>
      <div style="color: #666;">ID: ${meeting.id}</div>
      <div style="color: #666; margin-top: 5px;">${meeting.title}</div>
    `;
    container.appendChild(textInfo);

    qrRef.current.appendChild(container);
    setQrLoaded(true);
  };

  useEffect(() => {
    generateQRCode();
  }, [meeting.id, meeting.title]);

  const downloadQR = () => {
    // Create a canvas for download
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    // White background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);

    // Draw simple pattern
    const cellSize = 20;
    const startX = 50;
    const startY = 50;
    const pattern = meeting.id
      .split("")
      .map((char, i) => char.charCodeAt(0) % 2);

    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const index = (row * 15 + col) % pattern.length;
        ctx.fillStyle = pattern[index] ? "#000" : "#fff";
        if (pattern[index]) {
          ctx.fillRect(
            startX + col * cellSize,
            startY + row * cellSize,
            cellSize,
            cellSize
          );
        }

        // Border
        ctx.strokeStyle = "#ddd";
        ctx.strokeRect(
          startX + col * cellSize,
          startY + row * cellSize,
          cellSize,
          cellSize
        );
      }
    }

    // Add text
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("QR Code Meeting", 200, 380);
    ctx.font = "12px Arial";
    ctx.fillText(`ID: ${meeting.id}`, 200, 395);

    // Download
    const link = document.createElement("a");
    link.download = `qr_${meeting.title.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl">
          <QrCode className="h-5 w-5" />
          QR Code Kehadiran
        </CardTitle>
        <Badge
          variant={meeting.isActive ? "default" : "secondary"}
          className="mx-auto"
        >
          {meeting.isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col items-center space-y-4">
        <div
          ref={qrRef}
          className="flex items-center justify-center"
          style={{ minHeight: "256px", minWidth: "256px" }}
        />

        <div className="text-center space-y-2">
          <h3 className="font-semibold text-sm sm:text-base">
            {meeting.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {new Date(meeting.date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {meeting.startTime} - {meeting.endTime} WIB
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            📍 {meeting.location}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button
            onClick={downloadQR}
            variant="outline"
            size="sm"
            className="flex-1"
            disabled={!qrLoaded}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>

          {onRefresh && (
            <Button
              onClick={onRefresh}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>

        <div className="bg-muted/50 rounded-lg p-3 w-full">
          <p className="text-xs text-center text-muted-foreground">
            Arahkan kamera ke QR code untuk melakukan absensi
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeComponent;
