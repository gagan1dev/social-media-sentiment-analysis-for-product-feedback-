import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut as LogOutIcon } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { CSVUpload } from "@/components/CSVUpload";
import { SentimentMeter } from "@/components/SentimentMeter";
import { ChartsSection } from "@/components/ChartsSection";
import { ProblemAnalysis } from "@/components/ProblemAnalysis";
import { ReportExport } from "@/components/ReportExport";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Star } from "lucide-react";
import socialBg from "@/assets/social-sentiment-bg.jpg";
import { ReviewData } from "@/types/review";

const Index = () => {
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const { logout, user, isAdmin } = useAuth();
  const displayName = user?.email ? user.email.split("@")[0] : "";

  const handleDataUpload = (data: ReviewData[]) => {
    setReviewData(data);
  };

  const sentimentData = {
    positive: reviewData.filter(item => item.sentiment === "positive").length,
    neutral: reviewData.filter(item => item.sentiment === "neutral").length,
    negative: reviewData.filter(item => item.sentiment === "negative").length,
    total: reviewData.length,
  };

  const averageRating = reviewData.length > 0 
    ? (reviewData.reduce((sum, item) => sum + item.rating, 0) / reviewData.length).toFixed(1)
    : "0";

  const stats = [
    {
      title: "Total Reviews",
      value: reviewData.length.toString(),
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Average Rating",
      value: `${averageRating} ⭐`,
      icon: Star,
      color: "text-accent"
    },
    {
      title: "Positive Sentiment",
      value: `${sentimentData.total > 0 ? Math.round((sentimentData.positive / sentimentData.total) * 100) : 0}%`,
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Products Analyzed",
      value: new Set(reviewData.map(item => item.product)).size.toString(),
      icon: BarChart3,
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Top Bar */}
      <div className="w-full border-b border-border/50 bg-background/30 backdrop-blur supports-[backdrop-filter]:bg-background/30">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4" />
            <span className="">Welcome, <span className="font-medium">{displayName}</span></span>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link to="/admin" className="hidden sm:block">
                <Button size="sm" variant="outline" className="rounded-xl">Admin</Button>
              </Link>
            )}
            <Button
            size="sm"
            onClick={logout}
            className="rounded-xl bg-black text-white hover:bg-black/80"
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Sign out
          </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${socialBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/30">
              AI-Powered Analytics
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Amazon Review
              </span>
              <br />
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Sentiment Analysis
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Transform customer feedback into actionable insights with AI-powered sentiment analysis, 
              problem identification, and market value assessment.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Stats Overview */}
        {reviewData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upload Section */}
        <CSVUpload onDataUpload={handleDataUpload} />

        {/* Analysis Results */}
        {reviewData.length > 0 && (
          <>
            {/* Sentiment Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SentimentMeter data={sentimentData} />
              </div>
              <div className="lg:col-span-2">
                <ChartsSection data={reviewData} />
              </div>
            </div>

            {/* Problem Analysis & Solutions */}
            <ProblemAnalysis data={reviewData} />

            {/* Report Export */}
            <ReportExport data={reviewData} />
          </>
        )}

        {/* Empty State */}
        {reviewData.length === 0 && (
          <Card className="bg-card/30 backdrop-blur-sm border-border/50 shadow-card">
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ready to Analyze Reviews</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload your CSV file with Amazon product reviews to get started with 
                comprehensive sentiment analysis and insights.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;