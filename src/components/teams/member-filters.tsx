// components/teams/member-filters.tsx
"use client";

import {
  FilterOptions,
  POSISI_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/teams/types";
import { departmentOptions } from "@/lib/teams/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, X, Funnel, BrushCleaning } from "lucide-react";

interface MemberFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalMembers: number;
  filteredMembers: number;
}

export function MemberFilters({
  filters,
  onFiltersChange,
  totalMembers,
  filteredMembers,
}: MemberFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handlePosisiChange = (value: string) => {
    onFiltersChange({ ...filters, posisi: value === "all" ? "" : value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value === "all" ? "" : value });
  };

  const handleDepartmentChange = (value: string) => {
    onFiltersChange({ ...filters, department: value === "all" ? "" : value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      posisi: "",
      status: "",
      department: "",
    });
  };

  const hasActiveFilters =
    filters.search || filters.posisi || filters.status || filters.department;

  return (
    <Card className="shadow-sm border">
      <CardContent className="p-2 sm:p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <Funnel className="w-5 h-5 dark:text-white" />
              <h3 className="text-base sm:text-lg font-semibold dark:text-white">
                Filter & Search
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-white dark:text-black dark:bg-white bg-black px-3 py-1.5 rounded-lg">
              <span className="font-medium">{filteredMembers}</span>
              <span>dari</span>
              <span className="font-medium">{totalMembers}</span>
              <span>member</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari berdasarkan nama..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-11 border"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Posisi Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-white block">
                Posisi/Jabatan
              </label>
              <Select
                value={filters.posisi || undefined}
                onValueChange={handlePosisiChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Semua Posisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Posisi</SelectItem>
                  {POSISI_OPTIONS.map((posisi) => (
                    <SelectItem key={posisi} value={posisi}>
                      {posisi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-white block">
                Status
              </label>
              <Select
                value={filters.status || undefined}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium dark:text-white block">
                Department
              </label>
              <Select
                value={filters.department || undefined}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Semua Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Department</SelectItem>
                  {departmentOptions.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex justify-center sm:justify-end pt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <BrushCleaning className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
