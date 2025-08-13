"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Meeting } from "@/lib/listmeeting/types";

interface MeetingListProps {
  meetings: Meeting[];
  onMeetingClick: (meetingId: string) => void;
  onEditMeeting: (meetingId: string) => void;
  onDeleteMeeting: (meetingId: string) => void;
  onCreateMeeting: () => void;
}

const statusColors = {
  scheduled:
    "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800",
  ongoing:
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800",
  completed:
    "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800",
  cancelled:
    "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800",
};

const statusLabels = {
  scheduled: "Terjadwal",
  ongoing: "Berlangsung",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export function MeetingList({
  meetings,
  onMeetingClick,
  onEditMeeting,
  onDeleteMeeting,
  onCreateMeeting,
}: MeetingListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  // Filter and sort meetings
  const filteredMeetings = meetings
    .filter((meeting) => {
      const matchesSearch =
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || meeting.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const formatMeetingDate = (dateStr: string, timeStr: string) => {
    try {
      const date = new Date(`${dateStr}T${timeStr}`);
      return {
        date: format(date, "dd MMM yyyy", { locale: localeId }),
        time: format(date, "HH:mm", { locale: localeId }),
      };
    } catch {
      return {
        date: dateStr,
        time: timeStr,
      };
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold  dark:text-white">
            Meeting Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola dan pantau semua meeting PT Pupuk Kujang Cikampek
          </p>
        </div>
        <Link href="/addmeeting">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Buat Meeting Baru
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
          <Input
            placeholder="Cari meeting..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10  dark:placeholder-gray-300"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 ">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="scheduled">Terjadwal</SelectItem>
            <SelectItem value="ongoing">Berlangsung</SelectItem>
            <SelectItem value="completed">Selesai</SelectItem>
            <SelectItem value="cancelled">Dibatalkan</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48 ">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Tanggal</SelectItem>
            <SelectItem value="title">Judul</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Meeting Count */}
      <div className="text-md text-muted-foreground">
        Menampilkan {filteredMeetings.length} dari {meetings.length} meeting
      </div>

      {/* Meeting Cards */}
      <div className="grid gap-4">
        {filteredMeetings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium  dark:text-white mb-2">
                Tidak ada meeting ditemukan
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchQuery || statusFilter !== "all"
                  ? "Coba ubah filter pencarian Anda"
                  : "Belum ada meeting yang dibuat"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Link href="/addmeeting">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Meeting Pertama
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredMeetings.map((meeting) => {
            const { date, time } = formatMeetingDate(
              meeting.date,
              meeting.time
            );

            return (
              <Card
                key={meeting.id}
                className="hover:shadow-md transition-shadow cursor-pointer dark:hover:shadow-lg"
                onClick={() => onMeetingClick(meeting.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {meeting.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                        {meeting.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className={statusColors[meeting.status]}>
                        {statusLabels[meeting.status]}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm dark:text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      {date}
                    </div>
                    <div className="flex items-center text-sm dark:text-white">
                      <Clock className="h-4 w-4 mr-2" />
                      {time} WIB
                    </div>
                    <div className="flex items-center text-sm dark:text-white">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="truncate">{meeting.location}</span>
                    </div>
                    <div className="flex items-center text-sm dark:text-white">
                      <Users className="h-4 w-4 mr-2" />
                      {meeting.attendees.length} peserta
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs dark:text-white">
                      <span>Pimpinan: {meeting.chairperson}</span>
                      <span className="mx-2">•</span>
                      <span>Notulis: {meeting.secretary}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditMeeting(meeting.id);
                        }}
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteMeeting(meeting.id);
                        }}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress indicators */}
                  {meeting.agenda.length > 0 ||
                  meeting.actionItems.length > 0 ? (
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t dark:border-gray-600 text-xs text-muted-foreground">
                      {meeting.agenda.length > 0 && (
                        <span>{meeting.agenda.length} agenda</span>
                      )}
                      {meeting.actionItems.length > 0 && (
                        <span>
                          {
                            meeting.actionItems.filter(
                              (item) => item.status === "completed"
                            ).length
                          }
                          /{meeting.actionItems.length} action items selesai
                        </span>
                      )}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
