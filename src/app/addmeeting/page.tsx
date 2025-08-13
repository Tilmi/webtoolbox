// app/addmeeting/page.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MeetingFormData,
  initialMeetingData,
  membersData,
  Member,
  AgendaItem,
  generateMeetingLink,
} from "../../lib/MeetingData";
import {
  BasicInfoCard,
  LocationFormatCard,
  ParticipantsCard,
  MeetingSettingsCard,
} from "../../components/MeetingCard";

export default function AddMeetingPage() {
  const [formData, setFormData] = useState<MeetingFormData>(initialMeetingData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate meeting link when platform changes
    if (
      name === "platform" &&
      value &&
      formData.title &&
      formData.meetingType === "online"
    ) {
      const generatedLink = generateMeetingLink(value, formData.title);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        meetingLink: generatedLink,
      }));
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleParticipantsChange = (participants: string[]) => {
    setFormData((prev) => ({
      ...prev,
      participants,
    }));
  };

  const handleAgendaChange = (agenda: AgendaItem[]) => {
    setFormData((prev) => ({
      ...prev,
      agenda,
    }));
  };

  const handleMeetingLinkGenerate = () => {
    if (formData.platform && formData.title) {
      const generatedLink = generateMeetingLink(
        formData.platform,
        formData.title
      );
      setFormData((prev) => ({
        ...prev,
        meetingLink: generatedLink,
      }));
    }
  };

  const validateForm = (): boolean => {
    // Required fields validation
    if (!formData.title.trim()) {
      alert("Judul meeting wajib diisi");
      return false;
    }

    if (!formData.date) {
      alert("Tanggal meeting wajib diisi");
      return false;
    }

    if (!formData.startTime) {
      alert("Waktu mulai wajib diisi");
      return false;
    }

    if (!formData.endTime) {
      alert("Waktu selesai wajib diisi");
      return false;
    }

    if (!formData.meetingType) {
      alert("Tipe meeting wajib dipilih");
      return false;
    }

    // Time validation
    if (formData.startTime >= formData.endTime) {
      alert("Waktu mulai harus lebih awal dari waktu selesai");
      return false;
    }

    // Online meeting validation
    if (formData.meetingType === "online") {
      if (!formData.platform) {
        alert("Platform meeting wajib dipilih untuk online meeting");
        return false;
      }
      if (!formData.meetingLink) {
        alert("Link meeting wajib diisi atau di-generate untuk online meeting");
        return false;
      }
    }

    // Offline meeting validation
    if (formData.meetingType === "offline" && !formData.location) {
      alert("Lokasi meeting wajib dipilih untuk offline meeting");
      return false;
    }

    // Date validation (not in the past)
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Tanggal meeting tidak boleh di masa lalu");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Convert participant IDs to member data for submission
      const selectedMembers = membersData.filter((member) =>
        formData.participants.includes(member.id)
      );

      const submissionData = {
        ...formData,
        participantEmails: selectedMembers.map((member) => member.email),
        participantNames: selectedMembers.map((member) => member.name),
        agendaItems: formData.agenda,
      };

      console.log("Meeting Data to be sent:", submissionData);

      alert("Meeting berhasil dibuat!");

      setFormData(initialMeetingData);
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert("Terjadi kesalahan saat membuat meeting. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      alert("Minimal judul meeting harus diisi untuk menyimpan draft");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for saving draft
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Save as draft:", formData);

      alert("Meeting berhasil disimpan sebagai draft");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Terjadi kesalahan saat menyimpan draft.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Check if form has been modified
    const hasChanges =
      JSON.stringify(formData) !== JSON.stringify(initialMeetingData);

    if (hasChanges) {
      if (
        confirm(
          "Apakah Anda yakin ingin membatalkan? Semua perubahan akan hilang."
        )
      ) {
        setFormData(initialMeetingData);
      }
    } else {
      setFormData(initialMeetingData);
    }
  };

  // Get selected members for display
  const selectedMembers = membersData.filter((member) =>
    formData.participants.includes(member.id)
  );

  return (
    <div className="p-4">
      <div className="">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white text-black mb-2">
            Create New Meeting
          </h1>
          <p className="text-gray-400">
            Buat meeting baru untuk tim PT. Pupuk Kujang
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Information Card */}
          <BasicInfoCard
            formData={formData}
            handleInputChange={handleInputChange}
            handleAgendaChange={handleAgendaChange}
          />

          {/* Location & Format Card */}
          <LocationFormatCard
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleMeetingLinkGenerate={handleMeetingLinkGenerate}
          />

          {/* Participants Card */}
          <ParticipantsCard
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleParticipantsChange={handleParticipantsChange}
          />

          {/* Meeting Settings Card */}
          <MeetingSettingsCard
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleSwitchChange={handleSwitchChange}
            handleInputChange={handleInputChange}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>

        {/* Enhanced Form Summary */}
        {(formData.title || formData.date) && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-white font-semibold mb-3">Meeting Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {formData.title && (
                <div>
                  <span className="text-gray-400">Judul: </span>
                  <span className="text-white">{formData.title}</span>
                </div>
              )}
              {formData.date && (
                <div>
                  <span className="text-gray-400">Tanggal: </span>
                  <span className="text-white">
                    {new Date(formData.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {formData.startTime && formData.endTime && (
                <div>
                  <span className="text-gray-400">Waktu: </span>
                  <span className="text-white">
                    {formData.startTime} - {formData.endTime}
                  </span>
                </div>
              )}
              <div>
                <span className="text-gray-400">Tipe: </span>
                <span className="text-white capitalize">
                  {formData.meetingType} Meeting
                </span>
              </div>
              {formData.organizer && (
                <div>
                  <span className="text-gray-400">Organizer: </span>
                  <span className="text-white">{formData.organizer}</span>
                </div>
              )}
              {selectedMembers.length > 0 && (
                <div>
                  <span className="text-gray-400">Peserta: </span>
                  <span className="text-white">
                    {selectedMembers.length} orang terpilih
                  </span>
                </div>
              )}
              {formData.agenda.length > 0 && (
                <div>
                  <span className="text-gray-400">Agenda Items: </span>
                  <span className="text-white">
                    {formData.agenda.length} item
                  </span>
                </div>
              )}
              {formData.meetingLink && formData.meetingType === "online" && (
                <div className="md:col-span-2">
                  <span className="text-gray-400">Meeting Link: </span>
                  <span className="text-blue-300 break-all">
                    {formData.meetingLink}
                  </span>
                </div>
              )}
            </div>

            {/* Show description if available */}
            {formData.description && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <span className="text-gray-400">Deskripsi: </span>
                <p className="text-white mt-1">{formData.description}</p>
              </div>
            )}

            {/* Show agenda items */}
            {formData.agenda.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <h4 className="text-white font-medium mb-2">Agenda Meeting:</h4>
                <div className="space-y-2">
                  {formData.agenda.map((item: AgendaItem, index: number) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-blue-300 font-medium">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <span className="text-white">{item.title}</span>
                        {(item.duration || item.presenter) && (
                          <div className="text-gray-400 text-xs mt-1">
                            {item.duration && `Durasi: ${item.duration}`}
                            {item.duration && item.presenter && " | "}
                            {item.presenter && `Presenter: ${item.presenter}`}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show selected members */}
            {selectedMembers.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <h4 className="text-white font-medium mb-2">
                  Peserta Terpilih:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map((member: Member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {member.avatar}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
