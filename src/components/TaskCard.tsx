import {
  CalendarDays,
  Ellipsis,
  Pen,
  PlusCircle,
  SquareCheck,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function TaskCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Task Update</CardTitle>
          <Button variant={"outline"}>
            <PlusCircle className=" h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Laporan Budgeting</CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <Badge
                  variant={"secondary"}
                  className="bg-yellow-500/30  text-yellow-500"
                >
                  on progress
                </Badge>
                <div className="flex flex-row items-center gap-1.5">
                  <User className="h-4 w-4 " />
                  <p className="text-sm text-gray-500">Azmi</p>
                  <CalendarDays className="h-4 w-4 " />
                  <p className="text-sm text-gray-500">8/8/2025</p>
                </div>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <SquareCheck className=" h-4 w-4" />
                      Mark as done
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pen className=" h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className=" h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Review Proposal</CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <Badge
                  variant={"secondary"}
                  className="bg-red-500/30  text-red-500"
                >
                  pending
                </Badge>
                <div className="flex flex-row items-center gap-1.5">
                  <User className="h-4 w-4 " />
                  <p className="text-sm text-gray-500">Radya</p>
                  <CalendarDays className="h-4 w-4 " />
                  <p className="text-sm text-gray-500">6/8/2025</p>
                </div>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <SquareCheck className=" h-4 w-4" />
                      Mark as done
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pen className=" h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className=" h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Meeting Client</CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <Badge
                  variant={"secondary"}
                  className="bg-green-500/30  text-green-500"
                >
                  completed
                </Badge>
                <div className="flex flex-row items-center gap-1.5">
                  <User className="h-4 w-4 " />
                  <p className="text-sm text-gray-500">Raihan</p>
                  <CalendarDays className="h-4 w-4 " />
                  <p className="text-sm text-gray-500">7/8/2025</p>
                </div>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <SquareCheck className=" h-4 w-4" />
                      Mark as done
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pen className=" h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className=" h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  );
}
