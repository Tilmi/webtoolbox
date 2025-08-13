"use client";
import React from "react";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { day: "Monday", week1: 8, week2: 6, week3: 9, week4: 7 },
  { day: "Tuesday", week1: 7, week2: 8, week3: 6, week4: 9 },
  { day: "Wednesday", week1: 9, week2: 7, week3: 8, week4: 6 },
  { day: "Thursday", week1: 6, week2: 9, week3: 7, week4: 8 },
  { day: "Friday", week1: 8, week2: 5, week3: 9, week4: 7 },
];

const chartConfig = {
  week1: {
    label: "Week 1",
    color: "var(--chart-1)",
  },
  week2: {
    label: "Week 2",
    color: "var(--chart-2)",
  },
  week3: {
    label: "Week 3",
    color: "var(--chart-3)",
  },
  week4: {
    label: "Week 4",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const Productivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Productivity Heat Map</CardTitle>
        <CardDescription>
          Task completion pattern per hari dalam 4 minggu terakhir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="week1" fill="var(--color-week1)" radius={4} />
            <Bar dataKey="week2" fill="var(--color-week2)" radius={4} />
            <Bar dataKey="week3" fill="var(--color-week3)" radius={4} />
            <Bar dataKey="week4" fill="var(--color-week4)" radius={4} />
          </BarChart>
        </ChartContainer>
        <div className="mt-9 flex items-center justify-center gap-2">
          <Badge variant="secondary">Peak: Wednesday (8.5 avg)</Badge>
          <Badge variant="secondary">Low: Friday afternoon</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Productivity trending up by 12%{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing daily task completion for the last 4 weeks
        </div>
      </CardFooter>
    </Card>
  );
};

export default Productivity;
