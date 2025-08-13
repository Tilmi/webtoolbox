"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

const chartData = [
  { meeting: "K3 Safety", duration: 45, efficiency: 90 },
  { meeting: "Digital Sprint", duration: 60, efficiency: 92 },
  { meeting: "Production", duration: 90, efficiency: 82 },
  { meeting: "Board Review", duration: 120, efficiency: 85 },
  { meeting: "Strategic Plan", duration: 180, efficiency: 75 },
];

const chartConfig = {
  efficiency: {
    label: "Efficiency",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const MeetingEfficiencyChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Efficiency Analysis</CardTitle>
        <CardDescription>
          Correlation antara durasi meeting dan efficiency rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="duration"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}m`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="efficiency"
              type="natural"
              stroke="var(--color-efficiency)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-efficiency)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Optimal efficiency at 60-90 minutes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Meeting 60-90 menit memiliki efficiency terbaik (85%+)
        </div>
      </CardFooter>
    </Card>
  );
};

export default MeetingEfficiencyChart;
