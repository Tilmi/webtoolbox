"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Scan,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Loader2,
  Camera,
  StopCircle,
} from "lucide-react";
import { AttendanceFormData } from "@/lib/attendance/types";
import { isValidEmail } from "@/lib/attendance/utils";

interface QRScannerProps {
  meetingId: string;
  onScanSuccess: (attendeeData: AttendanceFormData) => void;
  onError?: (error: string) => void;
  isLoading?: boolean;
  className?: string;
}

const QRScanner: React.FC<QRScannerProps> = ({
  meetingId,
  onScanSuccess,
  onError,
  isLoading = false,
  className = "",
}) => {
  const [formData, setFormData] = useState<AttendanceFormData>({
    name: "",
    email: "",
    phone: "",
    department: "",
  });
  const [errors, setErrors] = useState<Partial<AttendanceFormData>>({});
  const [scanMode, setScanMode] = useState<"camera" | "manual">("manual");
  const [successMessage, setSuccessMessage] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup camera when component unmounts
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError("");

      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera tidak didukung oleh browser ini");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 320 },
          height: { ideal: 240 },
          facingMode: "environment", // Back camera for mobile
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(
        error instanceof Error ? error.message : "Tidak dapat mengakses kamera"
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setCameraError("");
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AttendanceFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (
      formData.phone &&
      (formData.phone.length < 10 || formData.phone.length > 15)
    ) {
      newErrors.phone = "Nomor telepon harus 10-15 digit";
    }

    if (formData.department && formData.department.trim().length > 50) {
      newErrors.department = "Departemen maksimal 50 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onScanSuccess(formData);
      setSuccessMessage("Absensi berhasil dicatat!");

      // Reset form setelah 2 detik
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          department: "",
        });
        setSuccessMessage("");
        setErrors({});
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      onError?.(errorMessage);
    }
  };

  const handleInputChange = (
    field: keyof AttendanceFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error saat user mulai mengetik
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const simulateCameraScan = () => {
    // Simulasi scan kamera dengan data dummy
    const dummyData: AttendanceFormData[] = [
      {
        name: "Ahmad Suryadi",
        email: "ahmad.suryadi@pupukkujang.co.id",
        phone: "081234567890",
        department: "Technology Information",
      },
      {
        name: "Siti Nurhaliza",
        email: "siti.nurhaliza@pupukkujang.co.id",
        phone: "081987654321",
        department: "Human Resources",
      },
      {
        name: "Budi Santoso",
        email: "budi.santoso@pupukkujang.co.id",
        phone: "081122334455",
        department: "Finance",
      },
      {
        name: "Maya Sari",
        email: "maya.sari@pupukkujang.co.id",
        phone: "081999888777",
        department: "Marketing",
      },
    ];

    const randomData = dummyData[Math.floor(Math.random() * dummyData.length)];
    setFormData(randomData);
    setScanMode("manual");
    stopCamera();
  };

  const handleModeChange = (mode: "camera" | "manual") => {
    setScanMode(mode);
    if (mode === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Scan className="h-5 w-5" />
          Scan QR Code
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {successMessage && (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Mode Selector */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={scanMode === "camera" ? "default" : "outline"}
            onClick={() => handleModeChange("camera")}
            className="flex-1"
            disabled={isLoading}
          >
            <Camera className="h-4 w-4 mr-2" />
            Kamera
          </Button>
          <Button
            type="button"
            variant={scanMode === "manual" ? "default" : "outline"}
            onClick={() => handleModeChange("manual")}
            className="flex-1"
            disabled={isLoading}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Manual
          </Button>
        </div>

        {/* Camera Mode */}
        {scanMode === "camera" && (
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center p-4 border-2 border-dashed relative overflow-hidden">
              {isCameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute inset-4 border-2 border-red-500 border-dashed pointer-events-none">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
                        Posisikan QR code di dalam kotak
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground mb-4">
                    {cameraError || "Klik tombol untuk mengaktifkan kamera"}
                  </p>
                  <div className="flex gap-2">
                    {!cameraError && (
                      <Button onClick={startCamera} variant="outline" size="sm">
                        Aktifkan Kamera
                      </Button>
                    )}
                    <Button
                      onClick={simulateCameraScan}
                      variant="outline"
                      size="sm"
                    >
                      Simulasi Scan
                    </Button>
                  </div>
                </>
              )}
            </div>

            {isCameraActive && (
              <div className="flex justify-center gap-2">
                <Button
                  onClick={simulateCameraScan}
                  variant="default"
                  size="sm"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  Simulasi Scan
                </Button>
                <Button onClick={stopCamera} variant="outline" size="sm">
                  <StopCircle className="h-4 w-4 mr-2" />
                  Stop Kamera
                </Button>
              </div>
            )}

            {cameraError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {cameraError}. Gunakan mode manual untuk input data.
                </AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Fitur kamera memerlukan izin akses kamera dari browser. Pastikan
                izin sudah diberikan.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Manual Form */}
        {scanMode === "manual" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  disabled={isLoading}
                  className={
                    errors.name
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.name && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="nama@company.com"
                  disabled={isLoading}
                  className={
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, "");
                    handleInputChange("phone", value);
                  }}
                  placeholder="081234567890"
                  disabled={isLoading}
                  maxLength={15}
                  className={
                    errors.phone
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Departemen</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  placeholder="Engineering, Marketing, HR, dll"
                  disabled={isLoading}
                  maxLength={50}
                  className={
                    errors.department
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.department && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.department}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Catat Kehadiran
                </>
              )}
            </Button>
          </form>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Pastikan data yang dimasukkan sudah benar. Data kehadiran akan
            dicatat dengan timestamp saat ini untuk meeting:{" "}
            <strong>{meetingId}</strong>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
