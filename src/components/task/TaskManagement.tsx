"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  MessageCircle,
  Link2,
  FileText,
  X,
  SquarePen,
  Trash2,
  ChevronDown,
  CirclePlus,
} from "lucide-react";

// Import shadcn/ui components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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

// Types and data
interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: "To do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  comments: number;
  links: number;
  attachments: number;
  label: string;
  labelColor: "orange" | "blue" | "green" | "pink";
}

interface Column {
  id: string;
  title: string;
  color: "orange" | "blue" | "purple";
}

interface TaskCardProps {
  task: TodoItem;
  onDragStart: (e: React.DragEvent, task: TodoItem) => void;
  onEditTask: (task: TodoItem) => void;
  onDeleteTask: (taskId: number) => void;
}

interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    task: Omit<TodoItem, "id" | "comments" | "links" | "attachments">
  ) => void;
  defaultStatus?: string;
}

interface EditTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TodoItem) => void;
  task: TodoItem | null;
}

// Month mapping with proper typing
const monthMap: { [key: string]: string } = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

// Label options for the form
const labelOptions = [
  { label: "To do", color: "blue" as const },
  { label: "On Progress", color: "orange" as const },
  { label: "Complete", color: "green" as const },
];

const mockTodoData: TodoItem[] = [
  {
    id: 1,
    title: "Analisis Kualitas Pupuk Urea Produksi Oktober",
    description:
      "Melakukan analisis laboratorium terhadap sampel pupuk urea produksi bulan Oktober untuk memastikan standar kualitas sesuai SNI.",
    status: "To do",
    priority: "Low",
    dueDate: "25 Okt 2025",
    comments: 5,
    links: 2,
    attachments: 3,
    label: "To do",
    labelColor: "blue",
  },
  {
    id: 2,
    title: "Pemeliharaan Rutin Pabrik Ammonia Unit II",
    description:
      "Melaksanakan jadwal pemeliharaan preventif pada unit ammonia II meliputi pengecekan kompressor dan sistem perpipaan.",
    status: "To do",
    priority: "Medium",
    dueDate: "28 Sept 2025",
    comments: 12,
    links: 1,
    attachments: 2,
    label: "To do",
    labelColor: "blue",
  },
  {
    id: 3,
    title: "Implementasi Sistem K3 di Area Produksi",
    description:
      "Menerapkan prosedur keselamatan dan kesehatan kerja terbaru di seluruh area produksi pupuk untuk mencegah kecelakaan kerja.",
    status: "In Progress",
    priority: "High",
    dueDate: "20 Sep 2025",
    comments: 8,
    links: 1,
    attachments: 2,
    label: "On Progress",
    labelColor: "orange",
  },
  {
    id: 4,
    title: "Optimalisasi Distribusi Pupuk ke Wilayah Jawa Barat",
    description:
      "Menyusun strategi distribusi pupuk yang lebih efisien untuk wilayah Jawa Barat dengan fokus pada ketepatan waktu pengiriman.",
    status: "In Progress",
    priority: "Low",
    dueDate: "17 Aug 2025",
    comments: 3,
    links: 0,
    attachments: 2,
    label: "On Progress",
    labelColor: "orange",
  },
  {
    id: 5,
    title: "Evaluasi Kepuasan Petani Pengguna Pupuk NPK",
    description:
      "Menganalisis data survei kepuasan petani terhadap kualitas dan efektivitas pupuk NPK yang telah didistribusikan.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "5 Sep 2025",
    comments: 0,
    links: 0,
    attachments: 0,
    label: "On Progress",
    labelColor: "orange",
  },
  {
    id: 6,
    title: "Perbaikan Sistem Kontrol Otomatis Pabrik",
    description:
      "Mengatasi gangguan pada sistem kontrol otomatis di unit produksi untuk memastikan proses produksi berjalan optimal.",
    status: "Done",
    priority: "High",
    dueDate: "20 Sep 2025",
    comments: 6,
    links: 0,
    attachments: 1,
    label: "Complete",
    labelColor: "green",
  },
  {
    id: 7,
    title: "Penyusunan Laporan Produksi Kuartal I",
    description:
      "Membuat laporan komprehensif mengenai capaian produksi pupuk selama kuartal pertama tahun 2023 untuk disampaikan ke manajemen.",
    status: "Done",
    priority: "Low",
    dueDate: "10 Aug 2025",
    comments: 4,
    links: 2,
    attachments: 0,
    label: "Complete",
    labelColor: "green",
  },
  {
    id: 8,
    title: "Presentasi Program CSR untuk Komunitas Petani",
    description:
      "Menyiapkan materi presentasi program tanggung jawab sosial perusahaan yang akan diberikan kepada komunitas petani lokal.",
    status: "Done",
    priority: "Medium",
    dueDate: "12 Aug 2025",
    comments: 0,
    links: 0,
    attachments: 0,
    label: "Complete",
    labelColor: "green",
  },
];

const columns: Column[] = [
  { id: "To do", title: "To do", color: "orange" },
  { id: "In Progress", title: "In Progress", color: "blue" },
  { id: "Done", title: "Done", color: "purple" },
];

const views = ["Board", "List"];

// Task Card Component with shadcn/ui dropdown
const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDragStart,
  onEditTask,
  onDeleteTask,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getLabelColor = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "green":
        return "bg-green-100 text-green-800";
      case "pink":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-move mb-3"
      draggable
      onDragStart={(e) => onDragStart(e, task)}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(
            task.labelColor
          )}`}
        >
          {task.label}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditTask(task)}>
              <SquarePen className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDeleteTask(task.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm md:text-base line-clamp-2">
        {task.title}
      </h3>

      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">{task.dueDate}</span>
          <span className="sm:hidden">
            {task.dueDate.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
        <span className={`font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 md:space-x-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <MessageCircle className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">{task.comments} Comments</span>
            <span className="sm:hidden">{task.comments}</span>
          </div>
          <div className="flex items-center">
            <Link2 className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">{task.links} Links</span>
            <span className="sm:hidden">{task.links}</span>
          </div>
          <div className="flex items-center">
            <FileText className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">
              {task.attachments}/{task.attachments + 1}
            </span>
            <span className="sm:hidden">
              {task.attachments}/{task.attachments + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// List View Component
const ListView: React.FC<{
  tasks: TodoItem[];
  onEditTask: (task: TodoItem) => void;
  onDeleteTask: (taskId: number) => void;
}> = ({ tasks, onEditTask, onDeleteTask }) => {
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "status">(
    "dueDate"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "Medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "Low":
        return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To do":
        return "text-orange-600 bg-orange-50 dark:bg-orange-900/20";
      case "In Progress":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      case "Done":
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const getLabelColor = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "blue":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "green":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "dueDate":
        comparison =
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case "priority":
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
        break;
      case "status":
        const statusOrder = { "To do": 1, "In Progress": 2, Done: 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            All Tasks ({tasks.length})
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Sort by:
            </span>
            <Select
              value={sortBy}
              onValueChange={(value: "dueDate" | "priority" | "status") =>
                setSortBy(value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  sortOrder === "desc" ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(
                      task.labelColor
                    )}`}
                  >
                    {task.label}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {task.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {task.dueDate}
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {task.comments}
                      </div>
                      <div className="flex items-center">
                        <Link2 className="w-4 h-4 mr-1" />
                        {task.links}
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {task.attachments}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditTask(task)}
                      className="h-8 w-8 p-0"
                    >
                      <SquarePen className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteTask(task.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
        </div>
      )}
    </div>
  );
};

// Edit Task Dialog Component using shadcn/ui
const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To do" as TodoItem["status"],
    priority: "Medium" as TodoItem["priority"],
    dueDate: "",
    label: "Not Started",
    labelColor: "blue" as TodoItem["labelColor"],
  });

  // Update form data when task changes
  React.useEffect(() => {
    if (task) {
      // Convert date back to input format
      let inputDate = "";
      if (task.dueDate) {
        try {
          // Parse "25 Mar 2023" format to "2023-03-25"
          const parts = task.dueDate.split(" ");
          if (parts.length === 3) {
            const day = parts[0];
            const monthStr = parts[1];
            const year = parts[2];

            const month = monthMap[monthStr] || "01";
            inputDate = `${year}-${month}-${day.padStart(2, "0")}`;
          }
        } catch (error) {
          console.log("Date parsing error:", error);
        }
      }

      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: inputDate,
        label: task.label,
        labelColor: task.labelColor,
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !task) return;

    let formattedDate = formData.dueDate;
    if (formData.dueDate) {
      const date = new Date(formData.dueDate);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      formattedDate = `${date.getDate().toString().padStart(2, "0")} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }

    const updatedTask: TodoItem = {
      ...task,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formattedDate,
      label: formData.label,
      labelColor: formData.labelColor,
    };

    onSubmit(updatedTask);
    onClose();
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: "",
        label: task.label,
        labelColor: task.labelColor,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Task Title *</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: TodoItem["status"]) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To do">To do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: TodoItem["priority"]) =>
                setFormData((prev) => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-dueDate">Due Date</Label>
            <Input
              id="edit-dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Label</Label>
            <div className="grid grid-cols-1 gap-2">
              {labelOptions.map((item) => (
                <Button
                  key={item.label}
                  type="button"
                  variant={
                    formData.label === item.label ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      label: item.label,
                      labelColor: item.color,
                    }))
                  }
                  className="text-sm"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Update Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Add Task Dialog Component using shadcn/ui
const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultStatus = "To do",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: defaultStatus as TodoItem["status"],
    priority: "Medium" as TodoItem["priority"],
    dueDate: "",
    label: "Not Started",
    labelColor: "blue" as TodoItem["labelColor"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    let formattedDate = formData.dueDate;
    if (formData.dueDate) {
      const date = new Date(formData.dueDate);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      formattedDate = `${date.getDate().toString().padStart(2, "0")} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    } else {
      const today = new Date();
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      formattedDate = `${today.getDate().toString().padStart(2, "0")} ${
        months[today.getMonth()]
      } ${today.getFullYear()}`;
    }

    onSubmit({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formattedDate,
      label: formData.label,
      labelColor: formData.labelColor,
    });

    setFormData({
      title: "",
      description: "",
      status: defaultStatus as TodoItem["status"],
      priority: "Medium",
      dueDate: "",
      label: "Not Started",
      labelColor: "blue",
    });
    onClose();
  };

  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      status: defaultStatus as TodoItem["status"],
    }));
  }, [defaultStatus]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: TodoItem["status"]) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To do">To do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: TodoItem["priority"]) =>
                setFormData((prev) => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Label</Label>
            <div className="grid grid-cols-1 gap-2">
              {labelOptions.map((item) => (
                <Button
                  key={item.label}
                  type="button"
                  variant={
                    formData.label === item.label ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      label: item.label,
                      labelColor: item.color,
                    }))
                  }
                  className="text-sm"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main TaskManager Component
const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TodoItem[]>(mockTodoData);
  const [draggedTask, setDraggedTask] = useState<TodoItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("Board");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TodoItem | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<string>("To do");

  const handleDragStart = (e: React.DragEvent, task: TodoItem) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === draggedTask.id
            ? { ...task, status: newStatus as TodoItem["status"] }
            : task
        )
      );
      setDraggedTask(null);
    }
  };

  const handleAddTask = (
    newTaskData: Omit<TodoItem, "id" | "comments" | "links" | "attachments">
  ) => {
    const newTask: TodoItem = {
      ...newTaskData,
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      comments: 0,
      links: 0,
      attachments: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task: TodoItem) => {
    setEditingTask(task);
    setIsEditTaskDialogOpen(true);
  };

  const handleUpdateTask = (updatedTask: TodoItem) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    setIsEditTaskDialogOpen(false);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const openAddTaskDialog = (status: string = "To do") => {
    setDefaultStatus(status);
    setIsAddTaskDialogOpen(true);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColumnTasks = (columnId: string) => {
    return filteredTasks.filter((task) => task.status === columnId);
  };

  const getColumnColor = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-500";
      case "blue":
        return "bg-blue-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Tasks
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Keep track of your team's tasks all in one place.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 md:space-x-6 overflow-x-auto">
            {views.map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`pb-2 font-medium whitespace-nowrap ${
                  activeView === view
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end">
              <Button
                variant="outline"
                className="sm:hidden"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div className="hidden sm:flex items-center space-x-3">
                <Button
                  onClick={() => openAddTaskDialog()}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <CirclePlus className="w-4 h-4" />
                  Add Task
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {isMobileFiltersOpen && (
          <div className="mt-4 p-4 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-700 md:hidden">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Filters & Sort
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Group by
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Sort
              </Button>
              <Button onClick={() => openAddTaskDialog()} className="w-full">
                <CirclePlus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 md:px-6 pb-6">
        {activeView === "Board" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-gray-100 dark:bg-black rounded-lg p-3 md:p-4 min-h-[400px] border border-gray-200 dark:border-gray-700"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getColumnColor(
                        column.color
                      )}`}
                    ></div>
                    <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                      {column.title}
                    </h2>
                    <span className="bg-red-600 dark:bg-red-600 text-white dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                      {getColumnTasks(column.id).length}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openAddTaskDialog(column.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {getColumnTasks(column.id).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDragStart={handleDragStart}
                      onEditTask={handleEditTask}
                      onDeleteTask={handleDeleteTask}
                    />
                  ))}
                </div>

                {column.id !== "Done" && (
                  <Button
                    variant="outline"
                    onClick={() => openAddTaskDialog(column.id)}
                    className="w-full border-dashed mt-3"
                  >
                    <CirclePlus className="w-4 h-4" />
                    Add Task
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ListView
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>

      <AddTaskDialog
        isOpen={isAddTaskDialogOpen}
        onClose={() => setIsAddTaskDialogOpen(false)}
        onSubmit={handleAddTask}
        defaultStatus={defaultStatus}
      />

      <EditTaskDialog
        isOpen={isEditTaskDialogOpen}
        onClose={() => {
          setIsEditTaskDialogOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleUpdateTask}
        task={editingTask}
      />
    </div>
  );
};

export default TaskManager;
