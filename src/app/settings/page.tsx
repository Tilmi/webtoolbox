"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  Shield,
  Users,
  Database,
  Globe,
  BarChart3,
  Wrench,
  Server,
  Mail,
  FileText,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Cpu,
  Activity,
  Key,
  Lock,
  Eye,
  UserCheck,
  Calendar,
  Hash,
  KeyRound,
  IdCardLanyard,
} from "lucide-react";

const AdminSettingsPage = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [userRegistration, setUserRegistration] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [analyticsTracking, setAnalyticsTracking] = useState(true);
  const [cacheEnabled, setCacheEnabled] = useState(true);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-2 py-4 sm:px-4 sm:py-6 lg:px-4">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <Settings className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl">
                Admin Settings
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Kelola konfigurasi sistem dan pengaturan web toolbox
              </p>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid gap-4 sm:gap-4 lg:gap-6">
          {/* Admin Profile Section */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 transition-shadow hover:shadow-md">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-base font-semibold sm:text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/30 border-1  text-blue-500 ">
                  <UserCheck className="h-4 w-4" />
                </div>
                Profil Admin
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Informasi akun admin dan hak akses sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-4">
              {/* Admin Profile Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                <Avatar className="h-16 w-16 border-3 border-white shadow-md sm:h-20 sm:w-20">
                  <AvatarImage src="/kujang.svg" alt="Admin" />
                  <AvatarFallback className="bg-gradient-to-br from-red-400 to-orange-400 text-base font-semibold text-white sm:text-lg">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold dark:text-white sm:text-xl">
                      Admin User
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      admin@example.com
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-0 px-3 py-1 text-xs font-medium">
                      Super Administrator
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-muted-foreground" />

              {/* Admin Details */}
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium darK:text-white">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span>Email Admin</span>
                  </div>
                  <p className="text-sm text-muted-foreground break-all sm:text-base">
                    admin@example.com
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium dark:text-white">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>Login Terakhir</span>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    11 Agustus 2025, 15:30 WIB
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium dark:text-white">
                    <KeyRound className="h-4 w-4 flex-shrink-0" />
                    <span>Level Akses</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 px-3 py-1 text-xs font-medium w-fit"
                  >
                    Full Access
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium dark:text-white">
                    <IdCardLanyard className="h-5 w-5 flex-shrink-0" />
                    <span>Admin ID</span>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground sm:text-base">
                    #ADM001
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 transition-shadow hover:shadow-md">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold sm:text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Server className="h-4 w-4" />
                </div>
                Konfigurasi Sistem
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Pengaturan dasar sistem dan operasional website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Maintenance Mode */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-muted-foreground p-3 transition-colors sm:p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1 sm:gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                    <Wrench className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-medium dark:text-white truncate sm:text-base">
                      Mode Maintenance
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 sm:text-sm">
                      Aktifkan untuk melakukan maintenance sistem
                    </p>
                  </div>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                  className="data-[state=checked]:bg-blue-600 flex-shrink-0"
                />
              </div>

              {/* User Registration */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-muted-foreground p-3 transition-colors  sm:p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1 sm:gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-medium dark:text-white truncate sm:text-base">
                      Registrasi User
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 sm:text-sm">
                      Izinkan user baru mendaftar ke sistem
                    </p>
                  </div>
                </div>
                <Switch
                  checked={userRegistration}
                  onCheckedChange={setUserRegistration}
                  className="data-[state=checked]:bg-blue-600 flex-shrink-0"
                />
              </div>

              {/* Cache System */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-muted-foreground p-3 transition-colors  sm:p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1 sm:gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-medium dark:text-white truncate sm:text-base">
                      System Cache
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 sm:text-sm">
                      Cache untuk meningkatkan performa website
                    </p>
                  </div>
                </div>
                <Switch
                  checked={cacheEnabled}
                  onCheckedChange={setCacheEnabled}
                  className="data-[state=checked]:bg-blue-600 flex-shrink-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Database & Storage */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 transition-shadow hover:shadow-md">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-base font-semibold sm:text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Database className="h-4 w-4" />
                </div>
                Database & Storage
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Informasi database dan pengaturan backup sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Auto Backup */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-muted-foreground p-3 transition-colors sm:p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1 sm:gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                    <HardDrive className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-medium dark:text-white truncate sm:text-base">
                      Auto Backup
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 sm:text-sm">
                      Backup otomatis database setiap hari
                    </p>
                  </div>
                </div>
                <Switch
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                  className="data-[state=checked]:bg-blue-600 flex-shrink-0"
                />
              </div>

              <Separator className="bg-muted-foreground" />

              {/* Database Stats */}
              <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs font-medium dark:text-white sm:text-sm">
                    Database Size
                  </label>
                  <p className="text-base font-semibold text-muted-foreground sm:text-lg">
                    2.4 GB
                  </p>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs font-medium dark:text-white sm:text-sm">
                    Total Users
                  </label>
                  <p className="text-base font-semibold text-muted-foreground sm:text-lg">
                    100
                  </p>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs font-medium dark:text-white sm:text-sm">
                    Backup Terakhir
                  </label>
                  <p className="text-base font-semibold text-muted-foreground sm:text-lg">
                    11 Agu, 03:00
                  </p>
                </div>
              </div>

              <Separator className="bg-slate-200" />

              {/* Storage Usage */}
              <div className="space-y-3 sm:space-y-4">
                <label className="text-sm font-semibold text-slate-900">
                  Storage Usage
                </label>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between rounded-lg  px-3 py-2 sm:p-3">
                    <span className="text-xs dark:text-white sm:text-sm">
                      Database
                    </span>
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      2.4 GB
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg  px-3 py-2 sm:p-3">
                    <span className="text-xs dark:text-white sm:text-sm">
                      File Uploads
                    </span>
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      856 MB
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg  px-3 py-2 sm:p-3">
                    <span className="text-xs dark:text-white sm:text-sm">
                      Cache
                    </span>
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      324 MB
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg  px-3 py-2 sm:p-3">
                    <span className="text-xs dark:text-white sm:text-sm">
                      Logs
                    </span>
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      128 MB
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics & Monitoring */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 transition-shadow hover:shadow-md">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-base font-semibold sm:text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                  <BarChart3 className="h-4 w-4" />
                </div>
                Analytics & Monitoring
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Pengaturan analytics dan monitoring sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Analytics Tracking */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-muted-foreground p-3 transition-colors  sm:p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1 sm:gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-medium dark:text-white truncate sm:text-base">
                      Analytics Tracking
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 sm:text-sm">
                      Tracking penggunaan tools dan aktivitas user
                    </p>
                  </div>
                </div>
                <Switch
                  checked={analyticsTracking}
                  onCheckedChange={setAnalyticsTracking}
                  className="data-[state=checked]:bg-blue-600 flex-shrink-0"
                />
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-muted-foreground p-3 transition-colors  sm:p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1 sm:gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-100">
                    <Mail className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-medium dark:text-white truncate sm:text-base">
                      Email Alerts
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 sm:text-sm">
                      Notifikasi email untuk sistem monitoring
                    </p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-blue-600 flex-shrink-0"
                />
              </div>

              <Separator className="bg-muted-foreground" />

              {/* System Stats */}
              <div className="grid gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-muted-foreground p-3 text-center transition-colors  sm:p-4">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 sm:h-12 sm:w-12">
                    <CheckCircle className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
                  </div>
                  <h4 className="text-sm font-semibold dark:text-white sm:text-base">
                    System Status
                  </h4>
                  <p className="text-xs text-green-600 sm:text-sm">
                    All Systems Operational
                  </p>
                </div>

                <div className="rounded-lg border border-muted-foreground p-3 text-center transition-colors  sm:p-4">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 sm:h-12 sm:w-12">
                    <Cpu className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                  </div>
                  <h4 className="text-sm font-semibold dark:text-white sm:text-base">
                    Server Load
                  </h4>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    CPU: 34% | RAM: 62%
                  </p>
                </div>

                <div className="rounded-lg border border-muted-foreground p-3 text-center transition-colors  sm:p-4 sm:col-span-2 lg:col-span-1">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 sm:h-12 sm:w-12">
                    <Clock className="h-5 w-5 text-orange-600 sm:h-6 sm:w-6" />
                  </div>
                  <h4 className="text-sm font-semibold dark:text-white sm:text-base">
                    Uptime
                  </h4>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    99.9% (30 days)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 transition-shadow hover:shadow-md">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-base font-semibold sm:text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <Shield className="h-4 w-4" />
                </div>
                Security & Access Control
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Pengaturan keamanan dan kontrol akses sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Security Info */}
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium dark:text-white">
                    <Lock className="h-4 w-4 flex-shrink-0" />
                    <span>SSL Certificate</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-0 px-3 py-1 text-xs font-medium w-fit">
                    Valid & Secure
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium dark:text-white">
                    <Eye className="h-4 w-4 flex-shrink-0" />
                    <span>Two-Factor Auth</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-0 px-3 py-1 text-xs font-medium w-fit">
                    Enabled
                  </Badge>
                </div>
              </div>

              <Separator className="bg-muted-foreground" />

              {/* Recent Security Events */}
              <div className="space-y-3 sm:space-y-4">
                <label className="text-sm font-semibold dark:text-white">
                  Recent Security Events
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 rounded-lg  px-3 py-2 sm:p-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1 sm:gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs dark:text-white truncate sm:text-sm">
                        Admin login successful
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      2 min ago
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 sm:p-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1 sm:gap-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                      <span className="text-xs dark:text-white truncate sm:text-sm">
                        Failed login attempt blocked
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      1 hour ago
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg  px-3 py-2 sm:p-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1 sm:gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs dark:text-white truncate sm:text-sm">
                        Database backup completed
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      3 hours ago
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Tools */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 transition-shadow hover:shadow-md">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-3 text-base font-semibold sm:text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <Wrench className="h-4 w-4" />
                </div>
                System Tools & Utilities
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Tools dan utilities untuk maintenance dan debugging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Quick Actions */}
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                <button className="flex flex-col items-center justify-center rounded-lg border border-muted-foreground p-3 text-xs font-medium text-muted-foreground transition-colors  sm:p-4 sm:text-sm">
                  <Database className="mb-2 h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                  <span className="text-center">Clear Cache</span>
                </button>
                <button className="flex flex-col items-center justify-center rounded-lg border border-muted-foreground p-3 text-xs font-medium text-muted-foreground transition-colors  sm:p-4 sm:text-sm">
                  <HardDrive className="mb-2 h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
                  <span className="text-center">Run Backup</span>
                </button>
                <button className="flex flex-col items-center justify-center rounded-lg border border-muted-foreground p-3 text-xs font-medium text-muted-foreground transition-colors sm:p-4 sm:text-sm">
                  <FileText className="mb-2 h-5 w-5 text-purple-600 sm:h-6 sm:w-6" />
                  <span className="text-center">View Logs</span>
                </button>
                <button className="flex flex-col items-center justify-center rounded-lg border border-muted-foreground p-3 text-xs font-medium text-muted-foreground transition-colors  sm:p-4 sm:text-sm">
                  <Activity className="mb-2 h-5 w-5 text-red-600 sm:h-6 sm:w-6" />
                  <span className="text-center">System Health</span>
                </button>
                <button className="flex flex-col items-center justify-center rounded-lg border border-muted-foreground p-3 text-xs font-medium text-muted-foreground transition-colors  sm:p-4 sm:text-sm">
                  <Users className="mb-2 h-5 w-5 text-orange-600 sm:h-6 sm:w-6" />
                  <span className="text-center">User Management</span>
                </button>
                <button className="flex flex-col items-center justify-center rounded-lg border border-muted-foreground p-3 text-xs font-medium text-muted-foreground transition-colors  sm:p-4 sm:text-sm">
                  <Globe className="mb-2 h-5 w-5 text-indigo-600 sm:h-6 sm:w-6" />
                  <span className="text-center">SEO Tools</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
