"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Task status breakdown donut chart";

const chartData = [
  { status: "completed", tasks: 5, fill: "#10b981" },
  { status: "inprogress", tasks: 3, fill: "#f59e0b" },
  { status: "todo", tasks: 2, fill: "#3b82f6" },
];

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "#10b981",
  },
  inprogress: {
    label: "In Progress",
    color: "#f59e0b",
  },
  todo: {
    label: "Todo",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

// Simple legend component
const TaskLegend = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="text-sm text-gray-700">Completed (5)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <span className="text-sm text-gray-700">In Progress (3)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500" />
        <span className="text-sm text-gray-700">Todo (2)</span>
      </div>
    </div>
  );
};

export function TaskChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Status Breakdown</CardTitle>
        <CardDescription>Total Task - Bulan ini</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tasks"
              nameKey="status"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <TaskLegend />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          5 tasks completed this month{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground">
          Breakdown dari 10 total task bulan ini
        </div>
      </CardFooter>
    </Card>
  );
}
