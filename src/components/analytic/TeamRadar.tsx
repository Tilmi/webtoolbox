"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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
import { Badge } from "@/components/ui/badge";

const chartData = [
  { subject: "Productivity", teamA: 120, teamB: 110 },
  { subject: "Quality", teamA: 98, teamB: 130 },
  { subject: "Attendance", teamA: 86, teamB: 130 },
  { subject: "Collaboration", teamA: 99, teamB: 100 },
  { subject: "Innovation", teamA: 85, teamB: 90 },
  { subject: "Leadership", teamA: 65, teamB: 85 },
];

const chartConfig = {
  teamA: {
    label: "Team A",
    color: "var(--chart-1)",
  },
  teamB: {
    label: "Team B",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const TeamRadarChart = () => {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Team Performance Radar</CardTitle>
        <CardDescription>
          Performance comparison Team A vs Team B
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="subject" />
            <PolarGrid />
            <Radar
              dataKey="teamA"
              fill="var(--color-teamA)"
              fillOpacity={0.3}
              stroke="var(--color-teamA)"
              strokeWidth={2}
            />
            <Radar
              dataKey="teamB"
              fill="var(--color-teamB)"
              fillOpacity={0.3}
              stroke="var(--color-teamB)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
        <div className=" grid grid-cols-2 gap-4">
          <div className="text-center">
            <Badge
              variant="outline"
              className="border-[var(--chart-1)] text-[var(--chart-1)]"
            >
              Team A
            </Badge>
            <p className="text-sm mt-1">Strong in Productivity & Quality</p>
          </div>
          <div className="text-center">
            <Badge
              variant="outline"
              className="border-[var(--chart-2)] text-[var(--chart-2)]"
            >
              Team B
            </Badge>
            <p className="text-sm mt-1">Balanced across all metrics</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Overall performance trending up by 8.5%{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Comparing 6 key performance metrics
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamRadarChart;
