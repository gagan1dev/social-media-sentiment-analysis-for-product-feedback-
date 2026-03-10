import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

interface SentimentMeterProps {
  data: SentimentData;
}

export const SentimentMeter = ({ data }: SentimentMeterProps) => {
  const getPercentage = (value: number) => Math.round((value / data.total) * 100);

  const sentiments = [
    {
      type: "Positive",
      emoji: "😊",
      count: data.positive,
      percentage: getPercentage(data.positive),
      color: "sentiment-positive",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      type: "Neutral",
      emoji: "😐",
      count: data.neutral,
      percentage: getPercentage(data.neutral),
      color: "sentiment-neutral",
      gradient: "from-yellow-500 to-orange-400"
    },
    {
      type: "Negative",
      emoji: "😞",
      count: data.negative,
      percentage: getPercentage(data.negative),
      color: "sentiment-negative",
      gradient: "from-red-500 to-pink-400"
    }
  ];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="bg-gradient-primary bg-clip-text text-transparent">
          Sentiment Analysis Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sentiments.map((sentiment) => (
          <div key={sentiment.type} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{sentiment.emoji}</span>
                <span className="font-medium">{sentiment.type}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold">{sentiment.percentage}%</span>
                <p className="text-xs text-muted-foreground">({sentiment.count} reviews)</p>
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={sentiment.percentage} 
                className="h-3"
              />
              <div 
                className={`absolute inset-0 h-3 rounded-full bg-gradient-to-r ${sentiment.gradient} opacity-80`}
                style={{ width: `${sentiment.percentage}%` }}
              />
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Overall Sentiment Score</p>
            <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {Math.round(((data.positive * 5 + data.neutral * 3 + data.negative * 1) / data.total) * 20)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};