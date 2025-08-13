// app/teams/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Member, MemberFormData, FilterOptions } from "@/lib/teams/types";
import { mockMembers } from "@/lib/teams/data";
import { filterMembers, generateId } from "@/lib/teams/utils";

// Components
import { MemberFilters } from "@/components/teams/member-filters";
import { ViewToggle } from "@/components/teams/view-toggle";
import { MemberCard } from "@/components/teams/member-card";
import { MemberTable } from "@/components/teams/member-table";
import { MemberFormModal } from "@/components/teams/member-form-modal";
import { MemberDetailModal } from "@/components/teams/member-detail-modal";
import { DeleteConfirmationModal } from "@/components/teams/delete-confirmation-modal";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, TrendingUp, CirclePlus, User } from "lucide-react";

type ViewMode = "card" | "table";

export default function TeamsPage() {
  // State management
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    posisi: "",
    status: "",
    department: "",
  });

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filtered members
  const filteredMembers = useMemo(() => {
    return filterMembers(members, filters);
  }, [members, filters]);

  // Stats
  const stats = useMemo(() => {
    const total = members.length;
    const aktif = members.filter((m) => m.status === "Aktif").length;
    const vp = members.filter((m) => m.posisi === "VP").length;
    const officer = members.filter((m) => m.posisi === "Officer").length;
    const staff = members.filter((m) => m.posisi === "Staff").length;

    return { total, aktif, vp, officer, staff };
  }, [members]);

  // Handlers
  const handleAddMember = async (data: MemberFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newMember: Member = {
        id: generateId(),
        ...data,
      };

      setMembers((prev) => [...prev, newMember]);
      setIsFormModalOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = async (data: MemberFormData) => {
    if (!editingMember) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMembers((prev) =>
        prev.map((member) =>
          member.id === editingMember.id ? { ...member, ...data } : member
        )
      );

      setIsFormModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error("Error updating member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMembers((prev) =>
        prev.filter((member) => member.id !== memberToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error("Error deleting member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setIsDetailModalOpen(true);
  };

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingMember(null);
    setIsFormModalOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormModalOpen(false);
    setEditingMember(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">
            Team Management
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            PT. Pupuk Kujang - Technology Information
          </p>
        </div>
        <Button
          onClick={handleAddClick}
          className="flex items-center gap-2 w-full sm:w-auto"
          size="default"
        >
          <CirclePlus className="w-4 h-4" />
          Tambah Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Users
              size={45}
              className="rounded-lg bg-blue-500/30 border-1 border-blue-500/50 p-2 text-blue-500 shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <CardTitle>Total Member</CardTitle>
              <div className="flex flex-row items-center gap-2">
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Member</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-4">
            <TrendingUp
              size={45}
              className="rounded-lg bg-green-500/30 border-1 border-green-500/50 p-2 text-green-500 shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <CardTitle>Status</CardTitle>
              <div className="flex flex-row items-center gap-2">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Aktif</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-4">
            <User
              size={45}
              className="rounded-lg bg-purple-500/30 border-1 border-purple-500/50 p-2 text-purple-500 shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <CardTitle>VP</CardTitle>
              <div className="flex flex-row items-center gap-2">
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Member</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-4">
            <User
              size={45}
              className="rounded-lg bg-pink-500/30 border-1 border-pink-500/50 p-2 text-pink-500 shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <CardTitle>Officer</CardTitle>
              <div className="flex flex-row items-center gap-2">
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Member</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-4">
            <User
              size={45}
              className="rounded-lg bg-yellow-500/30 border-1 border-yellow-500/50 p-2 text-yellow-500 shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <CardTitle>Staf</CardTitle>
              <div className="flex flex-row items-center gap-2">
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Member</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <MemberFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalMembers={members.length}
        filteredMembers={filteredMembers.length}
      />

      {/* View Toggle & Member List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-md text-muted-foreground">
            Menampilkan {filteredMembers.length} member
          </div>
          <ViewToggle view={viewMode} onViewChange={setViewMode} />
        </div>

        {filteredMembers.length === 0 ? (
          <Card>
            <CardContent className="py-8 sm:py-12 text-center px-4">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium dark:text-white mb-2">
                Tidak ada member ditemukan
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Coba ubah filter pencarian atau tambah member baru.
              </p>
              <Button onClick={handleAddClick} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Member
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === "card" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onView={handleViewMember}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <MemberTable
            members={filteredMembers}
            onView={handleViewMember}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      {/* Modals */}
      <MemberFormModal
        member={editingMember}
        isOpen={isFormModalOpen}
        onClose={handleCloseForm}
        onSubmit={editingMember ? handleEditMember : handleAddMember}
        isLoading={isLoading}
      />

      <MemberDetailModal
        member={selectedMember}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmationModal
        member={memberToDelete}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteMember}
        isLoading={isLoading}
      />
    </div>
  );
}
