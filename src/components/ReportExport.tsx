import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileDown, NotebookPen } from "lucide-react";
import { ReviewData } from "@/types/review";

interface ReportExportProps {
  data: ReviewData[];
}

const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const ReportExport = ({ data }: ReportExportProps) => {
  if (data.length === 0) return null;

  const positive = data.filter(item => item.sentiment === "positive").length;
  const negative = data.filter(item => item.sentiment === "negative").length;
  const neutral = data.filter(item => item.sentiment === "neutral").length;
  const total = data.length;

  const avgRating = total > 0
    ? (data.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1)
    : "0";

  const conclusion = negative === 0
    ? "Sentiment remains healthy with no critical negative trends detected."
    : `Identified ${negative} negative review${negative === 1 ? "" : "s"}; prioritize mitigation to lift average rating (${avgRating}/5).`;

  const csvHeader = "Product,Sentiment,Rating,Review\n";
  const csvRows = data.map(item =>
    `"${item.product.replace(/"/g, '""')}",${item.sentiment},${item.rating},"${item.review.replace(/"/g, '""')}"`,
  );

  const handleDownloadCsv = () => {
    downloadFile(csvHeader + csvRows.join("\n"), "review-report.csv", "text/csv");
  };

  const handleDownloadJson = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      totals: { total, positive, neutral, negative, avgRating },
      conclusion,
      records: data,
    };
    downloadFile(JSON.stringify(payload, null, 2), "review-report.json", "application/json");
  };

  return (
    <Card className="bg-card/50 border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <NotebookPen className="h-5 w-5 text-primary" />
          Report & Export
        </CardTitle>
        <CardDescription>
          Capture a snapshot of the current dashboard, including sentiment mix, average rating, and a short conclusion.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
            <p className="text-2xl font-semibold">{total}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Positive</p>
            <p className="text-2xl font-semibold text-success">{positive}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Neutral</p>
            <p className="text-2xl font-semibold text-warning">{neutral}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Negative</p>
            <p className="text-2xl font-semibold text-destructive">{negative}</p>
          </div>
        </div>

        <div className="rounded-lg bg-muted/30 p-4 text-sm leading-6">
          <p className="font-semibold text-primary mb-1">Dashboard Conclusion</p>
          <p className="text-muted-foreground">
            Average rating sits at <span className="font-medium text-foreground">{avgRating}/5</span>.
            {" "}
            {conclusion}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDownloadCsv} className="gap-2">
            <Download className="h-4 w-4" />
            Download CSV Snapshot
          </Button>
          <Button variant="outline" onClick={handleDownloadJson} className="gap-2">
            <FileDown className="h-4 w-4" />
            Download Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


