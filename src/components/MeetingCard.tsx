import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Settings,
  X,
  Plus,
  Search,
  Clock,
  User,
  Link as LinkIcon,
  Trash2,
  List,
} from "lucide-react";
import {
  MeetingFormData,
  meetingOptions,
  membersData,
  Member,
  AgendaItem,
  generateMeetingLink,
} from "../lib/MeetingData";

interface CardProps {
  formData: MeetingFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}

// Component untuk Basic Information Card
interface BasicInfoCardProps
  extends Pick<CardProps, "formData" | "handleInputChange"> {
  handleAgendaChange: (agenda: AgendaItem[]) => void;
}

export const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  formData,
  handleInputChange,
  handleAgendaChange,
}) => {
  const [newAgendaItem, setNewAgendaItem] = useState("");
  const [newAgendaDuration, setNewAgendaDuration] = useState("");
  const [newAgendaPresenter, setNewAgendaPresenter] = useState("");

  const handleAddAgenda = () => {
    if (!newAgendaItem.trim()) return;

    const newAgenda: AgendaItem = {
      id: Math.random().toString(36).substring(2, 15),
      title: newAgendaItem.trim(),
      duration: newAgendaDuration || undefined,
      presenter: newAgendaPresenter || undefined,
    };

    handleAgendaChange([...formData.agenda, newAgenda]);
    setNewAgendaItem("");
    setNewAgendaDuration("");
    setNewAgendaPresenter("");
  };

  const handleRemoveAgenda = (agendaId: string) => {
    const updatedAgenda = formData.agenda.filter(
      (item) => item.id !== agendaId
    );
    handleAgendaChange(updatedAgenda);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-white text-black">
          <Calendar className="w-5 h-5 text-blue-400" />
          Informasi Dasar Meeting
        </CardTitle>
        <CardDescription className="text-gray-400">
          Isi informasi dasar untuk meeting yang akan dibuat
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="dark:text-white text-black">
            Judul Meeting <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Masukkan judul meeting"
            className="dark:text-white text-black placeholder-gray-400"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="dark:text-white text-black">
            Deskripsi Meeting
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Deskripsikan tujuan dan konteks meeting"
            className="text-black dark:text-white placeholder-gray-400 min-h-[80px]"
          />
        </div>

        {/* Agenda Section */}
        <div className="space-y-3">
          <Label className="dark:text-white text-black flex items-center gap-2">
            Agenda Meeting
          </Label>

          {/* Add New Agenda Item */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="space-y-2">
              <Label className="text-sm text-gray-600 dark:text-gray-400">
                Tambah Item Agenda
              </Label>
              <Input
                value={newAgendaItem}
                onChange={(e) => setNewAgendaItem(e.target.value)}
                placeholder="Contoh: Review laporan bulanan"
                className="dark:text-white text-black placeholder-gray-400"
              />
            </div>

            <Button
              type="button"
              onClick={handleAddAgenda}
              disabled={!newAgendaItem.trim()}
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Agenda
            </Button>
          </div>

          {/* Agenda Items List */}
          {formData.agenda.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm text-gray-600 dark:text-gray-400">
                Daftar Agenda ({formData.agenda.length} item)
              </Label>
              <div className="space-y-2">
                {formData.agenda.map((item: AgendaItem, index: number) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 border rounded-lg"
                  >
                    <div className=" w-6 h-6 bg-gray-400 dark:text-white text-black rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium dark:text-white text-black">
                        {item.title}
                      </h4>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAgenda(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-black dark:text-white">
              Tanggal Meeting <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className="text-black dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime" className="text-black dark:text-white">
              Waktu Mulai <span className="text-red-500">*</span>
            </Label>
            <Input
              id="startTime"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleInputChange}
              className="text-black dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime" className="text-black dark:text-white">
              Waktu Selesai <span className="text-red-500">*</span>
            </Label>
            <Input
              id="endTime"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleInputChange}
              className="text-black dark:text-white"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component untuk Location & Format Card with Auto-Generate Link
interface LocationFormatCardProps
  extends Pick<
    CardProps,
    "formData" | "handleInputChange" | "handleSelectChange"
  > {
  handleMeetingLinkGenerate: () => void;
}

export const LocationFormatCard: React.FC<LocationFormatCardProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleMeetingLinkGenerate,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black dark:text-white">
          <MapPin className="w-5 h-5 text-red-500" />
          Lokasi & Format Meeting
        </CardTitle>
        <CardDescription className="text-gray-400">
          Tentukan format dan lokasi meeting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label className="text-black dark:text-white">
            Tipe Meeting <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.meetingType}
            onValueChange={(value) => handleSelectChange("meetingType", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="text-black dark:text-white">
                Online Meeting
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offline" id="offline" />
              <Label htmlFor="offline" className="text-black dark:text-white">
                Offline Meeting
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.meetingType === "online" && (
          <>
            <div className="space-y-2">
              <Label className="text-black dark:text-white">
                Platform Meeting <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => handleSelectChange("platform", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih platform meeting" />
                </SelectTrigger>
                <SelectContent>
                  {meetingOptions.platforms.map((platform: any) => (
                    <SelectItem
                      key={platform.value}
                      value={platform.value}
                      className="text-black dark:text-white"
                    >
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="meetingLink"
                  className="text-black dark:text-white"
                >
                  Link Meeting
                </Label>
                {formData.platform && formData.title && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleMeetingLinkGenerate}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <LinkIcon className="w-4 h-4 mr-1" />
                    Generate Link
                  </Button>
                )}
              </div>
              <Input
                id="meetingLink"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
                placeholder="Link akan di-generate otomatis atau input manual"
                className="text-black dark:text-white placeholder-gray-400"
              />
              {formData.meetingLink && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LinkIcon className="w-4 h-4" />
                  <span>Link meeting siap digunakan</span>
                </div>
              )}
            </div>
          </>
        )}

        {formData.meetingType === "offline" && (
          <div className="space-y-2">
            <Label className="text-black dark:text-white">
              Lokasi Fisik <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleSelectChange("location", value)}
            >
              <SelectTrigger className="w-full text-black dark:text-white">
                <SelectValue placeholder="Pilih lokasi meeting" />
              </SelectTrigger>
              <SelectContent>
                {meetingOptions.locations.map((location: any) => (
                  <SelectItem
                    key={location.value}
                    value={location.value}
                    className="text-black dark:text-white"
                  >
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Component untuk Participants Card with Member Selection
interface ParticipantsCardProps
  extends Pick<
    CardProps,
    "formData" | "handleInputChange" | "handleSelectChange"
  > {
  handleParticipantsChange: (participants: string[]) => void;
}

export const ParticipantsCard: React.FC<ParticipantsCardProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleParticipantsChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] =
    useState("all");

  // Filter members based on search term and department
  const filteredMembers = membersData.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartmentFilter === "all" ||
      member.department === selectedDepartmentFilter;
    return matchesSearch && matchesDepartment;
  });

  // Get selected members
  const selectedMembers = membersData.filter((member) =>
    formData.participants.includes(member.id)
  );

  const handleMemberSelect = (memberId: string) => {
    if (!formData.participants.includes(memberId)) {
      const newParticipants = [...formData.participants, memberId];
      handleParticipantsChange(newParticipants);
    }
  };

  const handleMemberRemove = (memberId: string) => {
    const newParticipants = formData.participants.filter(
      (id) => id !== memberId
    );
    handleParticipantsChange(newParticipants);
  };

  const handleAddAllFromDepartment = () => {
    const departmentMembers = membersData.filter(
      (member) =>
        member.department === formData.department &&
        !formData.participants.includes(member.id)
    );
    const newParticipants = [
      ...formData.participants,
      ...departmentMembers.map((m) => m.id),
    ];
    handleParticipantsChange(newParticipants);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black dark:text-white">
          <Users className="w-5 h-5 text-purple-400" />
          Peserta Meeting
        </CardTitle>
        <CardDescription className="text-gray-400">
          Pilih peserta dan atur pengaturan partisipasi
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="organizer" className="text-black dark:text-white">
            Organizer/Host
          </Label>
          <Input
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleInputChange}
            placeholder="Nama organizer"
            className="text-black dark:text-white placeholder-gray-400"
          />
        </div>

        {/* Department Selection */}
        <div className="space-y-2">
          <Label className="text-black dark:text-white">
            Departemen Yang Diundang
          </Label>
          <div className="flex gap-2">
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
            >
              <SelectTrigger className="w-full text-black dark:text-white flex-1">
                <SelectValue placeholder="Pilih departemen" />
              </SelectTrigger>
              <SelectContent>
                {meetingOptions.departments.map((dept: any) => (
                  <SelectItem
                    key={dept.value}
                    value={dept.value}
                    className="text-black dark:text-white"
                  >
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.department && formData.department !== "all" && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddAllFromDepartment}
                className="text-black dark:text-white whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-1" />
                Tambah Semua
              </Button>
            )}
          </div>
        </div>

        {/* Member Selection Section */}
        <div className="space-y-3">
          <Label className="text-black dark:text-white">Pilih Peserta</Label>

          {/* Search and Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-black dark:text-white placeholder-gray-400 pl-10"
              />
            </div>

            <Select
              value={selectedDepartmentFilter}
              onValueChange={setSelectedDepartmentFilter}
            >
              <SelectTrigger className="w-full text-black dark:text-white">
                <SelectValue placeholder="Filter departemen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-black dark:text-white">
                  Semua Departemen
                </SelectItem>
                {meetingOptions.departments.slice(1).map((dept: any) => (
                  <SelectItem
                    key={dept.value}
                    value={dept.value}
                    className="text-black dark:text-white"
                  >
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Members */}
          {selectedMembers.length > 0 && (
            <div className="space-y-2">
              <Label className="text-black dark:text-white text-sm">
                Peserta Terpilih ({selectedMembers.length})
              </Label>
              <div className="flex flex-wrap gap-2 p-3 rounded-lg border">
                {selectedMembers.map((member: Member) => (
                  <Badge
                    key={member.id}
                    variant="secondary"
                    className="text-black dark:text-white hover:bg-gray pr-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        {member.avatar}
                      </div>
                      <span>{member.name}</span>
                      <button
                        type="button"
                        onClick={() => handleMemberRemove(member.id)}
                        className="ml-1 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Available Members */}
          <div className="space-y-2">
            <Label className="text-black dark:text-white text-sm">
              Member Tersedia
            </Label>
            <div className="max-h-60 overflow-y-auto border rounded-lg">
              {filteredMembers.length === 0 ? (
                <div className="p-4 text-center text-gray-400">
                  Tidak ada member yang ditemukan
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredMembers.map((member: Member) => (
                    <div
                      key={member.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        formData.participants.includes(member.id)
                          ? "text-black dark:text-white"
                          : "hover:bg-gray-100 text-black dark:text-white"
                      }`}
                      onClick={() => handleMemberSelect(member.id)}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          formData.participants.includes(member.id)
                            ? "bg-gray-300"
                            : "bg-gray-500"
                        }`}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {member.position} -{" "}
                          {
                            meetingOptions.departments.find(
                              (d) => d.value === member.department
                            )?.label
                          }
                        </div>
                      </div>
                      {formData.participants.includes(member.id) && (
                        <div className="text-blue-200">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="maxParticipants"
            className="text-black dark:text-white"
          >
            Kapasitas Maksimal
          </Label>
          <Input
            id="maxParticipants"
            name="maxParticipants"
            type="number"
            value={formData.maxParticipants}
            onChange={handleInputChange}
            placeholder="10"
            className="text-black dark:text-white placeholder-gray-400"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Component untuk Meeting Settings Card
interface MeetingSettingsCardProps
  extends Pick<
    CardProps,
    "formData" | "handleSelectChange" | "handleSwitchChange"
  > {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const MeetingSettingsCard: React.FC<MeetingSettingsCardProps> = ({
  formData,
  handleSelectChange,
  handleSwitchChange,
  handleInputChange,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-black dark:text-white">
        <Settings className="w-5 h-5 text-muted-foreground" />
        Pengaturan Meeting
      </CardTitle>
      <CardDescription className="text-gray-400">
        Atur pengaturan tambahan untuk meeting
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label className="text-black dark:text-white">
          Pengulangan Meeting
        </Label>
        <Select
          value={formData.recurrence}
          onValueChange={(value) => handleSelectChange("recurrence", value)}
        >
          <SelectTrigger className="w-full text-black dark:text-white">
            <SelectValue placeholder="Pilih pengulangan" />
          </SelectTrigger>
          <SelectContent>
            {meetingOptions.recurrenceOptions.map((option: any) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-black dark:text-white"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-black dark:text-white">
          Reminder Notification
        </Label>
        <Select
          value={formData.reminder}
          onValueChange={(value) => handleSelectChange("reminder", value)}
        >
          <SelectTrigger className="w-full text-black dark:text-white">
            <SelectValue placeholder="Pilih waktu reminder" />
          </SelectTrigger>
          <SelectContent>
            {meetingOptions.reminderOptions.map((option: any) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-black dark:text-white"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="autoRecord" className="text-black dark:text-white">
            Auto Recording
          </Label>
          <Switch
            id="autoRecord"
            checked={formData.autoRecord}
            onCheckedChange={(checked) =>
              handleSwitchChange("autoRecord", checked)
            }
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="waitingRoom" className="text-black dark:text-white">
            Waiting Room
          </Label>
          <Switch
            id="waitingRoom"
            checked={formData.waitingRoom}
            onCheckedChange={(checked) =>
              handleSwitchChange("waitingRoom", checked)
            }
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-black dark:text-white">
            Visibility Meeting
          </Label>
          <RadioGroup
            value={formData.visibility}
            onValueChange={(value) => handleSelectChange("visibility", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="text-black dark:text-white">
                Public
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="text-black dark:text-white">
                Private
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="department" id="department" />
              <Label
                htmlFor="department"
                className="text-black dark:text-white"
              >
                Department Only
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-black dark:text-white">
            Password Meeting (Opsional)
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Masukkan password meeting"
            className="text-black dark:text-white placeholder-gray-400"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);
