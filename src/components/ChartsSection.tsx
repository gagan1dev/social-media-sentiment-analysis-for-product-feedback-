import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ReviewData {
  id: number;
  product: string;
  review: string;
  sentiment: string;
  rating: number;
}

interface ChartsSectionProps {
  data: ReviewData[];
}

export const ChartsSection = ({ data }: ChartsSectionProps) => {
  // Prepare sentiment data for pie chart
  const sentimentCounts = data.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = [
    { name: "Positive", value: sentimentCounts.positive || 0, color: "#22c55e" },
    { name: "Neutral", value: sentimentCounts.neutral || 0, color: "#f59e0b" },
    { name: "Negative", value: sentimentCounts.negative || 0, color: "#ef4444" },
  ];

  // Prepare product ratings data for bar chart
  const productData = data.reduce((acc, item) => {
    const existing = acc.find(p => p.product === item.product);
    if (existing) {
      existing.totalRating += item.rating;
      existing.count += 1;
      existing.avgRating = existing.totalRating / existing.count;
    } else {
      acc.push({
        product: item.product.slice(0, 15) + (item.product.length > 15 ? '...' : ''),
        avgRating: item.rating,
        totalRating: item.rating,
        count: 1,
      });
    }
    return acc;
  }, [] as Array<{ product: string; avgRating: number; totalRating: number; count: number }>);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-primary">Average Rating: </span>
            {payload[0].value.toFixed(1)} ⭐
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            <span className="text-primary">Reviews: </span>
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sentiment Distribution Pie Chart */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="bg-gradient-primary bg-clip-text text-transparent">
            Sentiment Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Ratings Bar Chart */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="bg-gradient-primary bg-clip-text text-transparent">
            Product Ratings Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="product" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis domain={[0, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avgRating" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};