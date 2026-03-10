import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

type Review = {
  id: number;
  product: string;
  review: string;
  sentiment: "positive" | "neutral" | "negative";
  rating: number;
  date?: string;
};

function startOfWeek(d: Date): string {
  const date = new Date(d);
  const day = date.getDay(); // 0 Sun .. 6 Sat
  const diff = (day + 6) % 7; // make Monday start
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function buildWeeklySeries(data: Review[]) {
  const map = new Map<string, { week: string; positive: number; neutral: number; negative: number }>();
  data.forEach((r, idx) => {
    const date = r.date ? new Date(r.date) : new Date(Date.now() - (data.length - idx) * 7 * 24 * 60 * 60 * 1000);
    const key = startOfWeek(date);
    if (!map.has(key)) {
      map.set(key, { week: key, positive: 0, neutral: 0, negative: 0 });
    }
    const bucket = map.get(key)!;
    bucket[r.sentiment] += 1;
  });
  const series = Array.from(map.values()).sort((a, b) => a.week.localeCompare(b.week));
  return series;
}

export function WeeklyTrend({ data }: { data: Review[] }) {
  const series = buildWeeklySeries(data);

  const chartConfig = {
    positive: { label: "Positive", color: "hsl(142.1 70.6% 45.3%)" },
    neutral: { label: "Neutral", color: "hsl(215 20.2% 65.1%)" },
    negative: { label: "Negative", color: "hsl(0 72.2% 50.6%)" },
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="bg-gradient-secondary bg-clip-text text-transparent">Weekly Sentiment Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px]">
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="week" tickFormatter={(v) => v.slice(5)} />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="positive" type="monotone" stroke="var(--color-positive)" dot={false} strokeWidth={2} />
            <Line dataKey="neutral" type="monotone" stroke="var(--color-neutral)" dot={false} strokeWidth={2} />
            <Line dataKey="negative" type="monotone" stroke="var(--color-negative)" dot={false} strokeWidth={2} />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}




