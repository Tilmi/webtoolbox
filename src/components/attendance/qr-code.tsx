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
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // Generate QR Code using QR Server API
  const generateQRCode = () => {
    if (!qrRef.current) return;

    try {
      // Create QR code data
      const qrData = JSON.stringify({
        meetingId: meeting.id,
        meetingTitle: meeting.title,
        timestamp: new Date().toISOString(),
        version: "1.0",
      });

      // Encode data for URL
      const encodedData = encodeURIComponent(qrData);

      // Generate QR code URL using qr-server.com API
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodedData}&format=png&margin=10`;

      // Clear previous content
      qrRef.current.innerHTML = "";

      // Create image element
      const qrImage = document.createElement("img");
      qrImage.src = qrUrl;
      qrImage.alt = "QR Code";
      qrImage.style.width = "256px";
      qrImage.style.height = "256px";
      qrImage.style.border = "1px solid #e5e7eb";
      qrImage.style.borderRadius = "8px";
      qrImage.style.backgroundColor = "white";

      qrImage.onload = () => {
        setQrLoaded(true);
        setQrDataUrl(qrUrl);
      };

      qrImage.onerror = () => {
        // Fallback if API fails
        if (qrRef.current) {
          qrRef.current.innerHTML = `
            <div style="width: 256px; height: 256px; display: flex; align-items: center; justify-content: center; border: 2px dashed #ccc; background: #f9f9f9; border-radius: 8px;">
              <div style="text-align: center; padding: 20px;">
                <div style="font-size: 48px; margin-bottom: 10px;">📱</div>
                <div style="font-size: 14px; color: #666; margin-bottom: 5px;">QR Code</div>
                <div style="font-size: 12px; color: #999; word-break: break-all;">${meeting.id}</div>
              </div>
            </div>
          `;
        }
        setQrLoaded(true);
      };

      qrRef.current.appendChild(qrImage);
    } catch (error) {
      console.error("Error generating QR code:", error);

      // Fallback display
      if (qrRef.current) {
        qrRef.current.innerHTML = `
          <div style="width: 256px; height: 256px; display: flex; align-items: center; justify-content: center; border: 2px dashed #ccc; background: #f9f9f9; border-radius: 8px;">
            <div style="text-align: center; padding: 20px;">
              <div style="font-size: 48px; margin-bottom: 10px;">📱</div>
              <div style="font-size: 14px; color: #666; margin-bottom: 5px;">QR Code</div>
              <div style="font-size: 12px; color: #999; word-break: break-all;">${meeting.id}</div>
            </div>
          </div>
        `;
      }
      setQrLoaded(true);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [meeting.id, meeting.title]);

  const downloadQR = () => {
    if (!qrDataUrl) return;

    try {
      // Create higher resolution QR for download
      const qrData = JSON.stringify({
        meetingId: meeting.id,
        meetingTitle: meeting.title,
        timestamp: new Date().toISOString(),
        version: "1.0",
      });

      const encodedData = encodeURIComponent(qrData);
      const downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodedData}&format=png&margin=20`;

      // Create temporary link for download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `qr_${meeting.title.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
      link.target = "_blank";

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
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
        >
          {/* Loading placeholder */}
          <div
            className="animate-pulse bg-gray-200 rounded-lg"
            style={{ width: "256px", height: "256px" }}
          ></div>
        </div>

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
          <p className="text-xs text-center text-muted-foreground mt-1">
            Meeting ID: {meeting.id}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeComponent;
