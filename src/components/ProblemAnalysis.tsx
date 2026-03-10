import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AlertTriangle, Lightbulb, TrendingDown, Target } from "lucide-react";
import { ReviewData } from "@/types/review";

interface ProblemAnalysisProps {
  data: ReviewData[];
}

export const ProblemAnalysis = ({ data }: ProblemAnalysisProps) => {
  const [solutionStatus, setSolutionStatus] = useState<Record<string, {
    implemented?: string;
    reviewDate?: string;
  }>>({});
  const [expandedProblems, setExpandedProblems] = useState<Record<string, boolean>>({});

  // Analyze common problems from negative reviews
  const negativeReviews = useMemo(
    () => data.filter(item => item.sentiment === "negative"),
    [data]
  );
  const neutralReviews = useMemo(
    () => data.filter(item => item.sentiment === "neutral"),
    [data]
  );
  const lowRatedProducts = useMemo(
    () => data.filter(item => item.rating <= 2),
    [data]
  );

  const problems = [
    {
      title: "Battery Life Issues",
      severity: "high",
      affectedProducts: ["Samsung Galaxy S24", "Dell XPS 13"],
      count: 2,
      description: "Multiple reviews mention poor battery performance",
      solution: "Consider battery optimization updates or hardware improvements"
    },
    {
      title: "Price vs Value Concerns",
      severity: "medium",
      affectedProducts: ["MacBook Air M3", "AirPods Pro"],
      count: 2,
      description: "Customers feel products are overpriced for features offered",
      solution: "Review pricing strategy or enhance product features"
    },
    {
      title: "Audio Quality Complaints",
      severity: "high",
      affectedProducts: ["AirPods Pro"],
      count: 1,
      description: "Sound quality not meeting customer expectations",
      solution: "Investigate audio drivers and implement quality improvements"
    },
    {
      title: "Heat Management",
      severity: "medium",
      affectedProducts: ["Dell XPS 13"],
      count: 1,
      description: "Device overheating during regular use",
      solution: "Improve thermal design and cooling system"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleImplementSolution = (title: string) => {
    const timestamp = new Date().toISOString();
    setSolutionStatus(prev => ({
      ...prev,
      [title]: {
        ...prev[title],
        implemented: timestamp
      }
    }));

    toast({
      title: "Implementation started",
      description: `${title} has been marked for implementation.`
    });
  };

  const handleScheduleReview = (title: string) => {
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + 14);

    setSolutionStatus(prev => ({
      ...prev,
      [title]: {
        ...prev[title],
        reviewDate: nextReview.toISOString()
      }
    }));

    toast({
      title: "Review scheduled",
      description: `Next review for ${title} is set for ${formatDate(nextReview.toISOString())}.`
    });
  };

  const handleToggleSolution = (title: string) => {
    setExpandedProblems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const marketInsights = [
    {
      metric: "Customer Satisfaction",
      value: "67%",
      trend: "down",
      insight: "Overall satisfaction has room for improvement"
    },
    {
      metric: "Repeat Purchase Intent",
      value: "45%",
      trend: "down",
      insight: "Low repeat purchase intention indicates loyalty issues"
    },
    {
      metric: "Recommendation Score",
      value: "3.2/5",
      trend: "neutral",
      insight: "Average recommendation score suggests moderate advocacy"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Problem Identification */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-primary bg-clip-text text-transparent">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Problem Identification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {problems.map((problem, index) => (
            <div key={index} className="p-4 rounded-lg border border-border/50 bg-muted/20">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{problem.title}</h3>
                <Badge variant={getSeverityColor(problem.severity) as any}>
                  {problem.severity} priority
                </Badge>
              </div>
              <p className="text-muted-foreground mb-3">{problem.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {problem.affectedProducts.map((product, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Affects {problem.count} product{problem.count > 1 ? 's' : ''}
                </span>
                <Button
                  size="sm"
                  variant={expandedProblems[problem.title] ? "secondary" : "outline"}
                  className="gap-2"
                  onClick={() => handleToggleSolution(problem.title)}
                >
                  <Lightbulb className="h-4 w-4" />
                  {expandedProblems[problem.title] ? "Hide Solution" : "View Solution"}
                </Button>
              </div>
              {expandedProblems[problem.title] && (
                <div className="mt-3 rounded-md bg-muted/30 p-3 text-sm">
                  <p className="font-medium text-primary mb-1">Suggested Solution</p>
                  <p className="text-muted-foreground">{problem.solution}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Solutions & Recommendations */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-secondary bg-clip-text text-transparent">
            <Target className="h-5 w-5 text-accent" />
            Recommended Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {problems.map((problem, index) => {
            const status = solutionStatus[problem.title] ?? {};

            return (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent">{problem.title} - Action Plan</h4>
              <p className="text-sm mb-3">{problem.solution}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-gradient-secondary"
                  onClick={() => handleImplementSolution(problem.title)}
                  disabled={!!status.implemented}
                >
                  {status.implemented ? "Implementation Started" : "Implement Solution"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleScheduleReview(problem.title)}
                  disabled={!!status.reviewDate}
                >
                  {status.reviewDate ? "Review Scheduled" : "Schedule Review"}
                </Button>
              </div>
              <div className="mt-3 space-y-1 text-xs">
                {status.implemented && (
                  <p className="text-success">
                    Implementation started {formatDate(status.implemented)}
                  </p>
                )}
                {status.reviewDate && (
                  <p className="text-primary">
                    Next review scheduled for {formatDate(status.reviewDate)}
                  </p>
                )}
                {!status.implemented && !status.reviewDate && (
                  <p className="text-muted-foreground">
                    Track implementation progress and schedule follow-up reviews from here.
                  </p>
                )}
              </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Market Value Insights */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-primary bg-clip-text text-transparent">
            <TrendingDown className="h-5 w-5 text-primary" />
            Market Value Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border border-border/50 bg-muted/10">
                <h4 className="font-semibold mb-2">{insight.metric}</h4>
                <p className="text-2xl font-bold mb-2 text-primary">{insight.value}</p>
                <p className="text-xs text-muted-foreground">{insight.insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};