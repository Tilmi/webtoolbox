"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Meeting attendance stacked bar chart with legend";

const chartData = [
  { meeting: "Board Meeting", hadir: 25, tidakHadir: 5 },
  { meeting: "Evaluasi Digitalisasi", hadir: 18, tidakHadir: 7 },
  { meeting: "Strategic Planning", hadir: 22, tidakHadir: 3 },
  { meeting: "K3 & Environmental", hadir: 20, tidakHadir: 8 },
  { meeting: "Koordinasi Produksi", hadir: 15, tidakHadir: 10 },
];

const chartConfig = {
  hadir: {
    label: "Hadir",
    color: "#2563eb",
  },
  tidakHadir: {
    label: "Tidak Hadir",
    color: "#10b981",
  },
} satisfies ChartConfig;

export function MeetingAttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Meeting - Stacked + Legend</CardTitle>
        <CardDescription>Q4 2024 Meeting Attendance Overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="meeting"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                if (value === "Board Meeting") return "Board";
                if (value === "Evaluasi Digitalisasi") return "Digital";
                if (value === "Strategic Planning") return "Strategic";
                if (value === "K3 & Environmental") return "K3";
                if (value === "Koordinasi Produksi") return "Produksi";
                return value;
              }}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="hadir"
              stackId="a"
              fill="#2563eb"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="tidakHadir"
              stackId="a"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Strategic Planning memiliki tingkat kehadiran tertinggi{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing attendance data for Q4 2024 meetings
        </div>
      </CardFooter>
    </Card>
  );
}
