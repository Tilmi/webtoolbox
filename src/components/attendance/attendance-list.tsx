"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Download,
  Users,
  Clock,
  Mail,
  Phone,
  Building,
  Filter,
} from "lucide-react";
import { AttendanceRecord, Meeting } from "@/lib/attendance/types";
import { formatDateTime, exportToCSV } from "@/lib/attendance/utils";

interface AttendanceListProps {
  records: AttendanceRecord[];
  meeting: Meeting;
  totalRegistered: number;
  className?: string;
}

const AttendanceList: React.FC<AttendanceListProps> = ({
  records,
  meeting,
  totalRegistered,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");

  // Filter and search records
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.attendee.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.attendee.department
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesDepartment =
        filterDepartment === "all" ||
        record.attendee.department === filterDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [records, searchTerm, filterDepartment]);

  // Get unique departments
  const departments = useMemo(() => {
    const depts = records
      .map((record) => record.attendee.department)
      .filter(Boolean)
      .filter((dept, index, array) => array.indexOf(dept) === index);
    return depts;
  }, [records]);

  // Get status based on scan time
  const getAttendanceStatus = (scannedAt: string) => {
    const meetingStart = new Date(`${meeting.date} ${meeting.startTime}`);
    const scanTime = new Date(scannedAt);

    if (scanTime <= meetingStart) {
      return {
        label: "Tepat Waktu",
        variant: "default" as const,
        color: "text-green-600",
      };
    } else {
      return {
        label: "Terlambat",
        variant: "destructive" as const,
        color: "text-red-600",
      };
    }
  };

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredRecords, meeting);
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Daftar Kehadiran
            <Badge variant="outline" className="ml-2">
              {filteredRecords.length} dari {records.length}
            </Badge>
          </CardTitle>

          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            disabled={records.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, atau departemen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {departments.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">Semua Departemen</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Records List */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {records.length === 0 ? "Belum Ada Kehadiran" : "Tidak Ada Hasil"}
            </h3>
            <p className="text-muted-foreground">
              {records.length === 0
                ? "Belum ada yang melakukan scan QR code"
                : "Coba ubah kriteria pencarian"}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredRecords.map((record, index) => {
              const status = getAttendanceStatus(record.scannedAt);

              return (
                <div
                  key={record.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {/* Avatar */}
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={record.attendee.avatar} />
                    <AvatarFallback className="text-sm">
                      {getInitials(record.attendee.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">
                        {record.attendee.name}
                      </h4>
                      <Badge variant={status.variant} className="text-xs">
                        {status.label}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">
                          {record.attendee.email}
                        </span>
                      </div>

                      {record.attendee.phone && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{record.attendee.phone}</span>
                        </div>
                      )}

                      {record.attendee.department && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Building className="h-3 w-3" />
                          <span>{record.attendee.department}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(record.scannedAt).toLocaleTimeString(
                          "id-ID",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary */}
        {records.length > 0 && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {records.length}
                </div>
                <div className="text-xs text-muted-foreground">Hadir</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {
                    records.filter(
                      (r) =>
                        new Date(r.scannedAt) <=
                        new Date(`${meeting.date} ${meeting.startTime}`)
                    ).length
                  }
                </div>
                <div className="text-xs text-muted-foreground">Tepat Waktu</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">
                  {
                    records.filter(
                      (r) =>
                        new Date(r.scannedAt) >
                        new Date(`${meeting.date} ${meeting.startTime}`)
                    ).length
                  }
                </div>
                <div className="text-xs text-muted-foreground">Terlambat</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceList;
