import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { WeeklyTrend } from "@/components/WeeklyTrend";

const UserDashboard = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const loadSample = () => {
    // simple sample for the chart
    const base = new Date();
    const weeksAgo = (w: number) => {
      const d = new Date(base);
      d.setDate(base.getDate() - w * 7);
      return d.toISOString();
    };
    setData([
      { id: 1, product: "A", review: "Great", sentiment: "positive", rating: 5, date: weeksAgo(3) },
      { id: 2, product: "B", review: "Ok", sentiment: "neutral", rating: 3, date: weeksAgo(2) },
      { id: 3, product: "C", review: "Bad", sentiment: "negative", rating: 1, date: weeksAgo(1) },
      { id: 4, product: "D", review: "Wow", sentiment: "positive", rating: 4, date: weeksAgo(0) },
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <div className="text-sm text-muted-foreground">{user?.email}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <Button variant="outline" onClick={loadSample}>Load Sample Data</Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card md:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyTrend data={data as any} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;




