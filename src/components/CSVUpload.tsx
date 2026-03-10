import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CSVUploadProps {
  onDataUpload: (data: any[]) => void;
}

export const CSVUpload = ({ onDataUpload }: CSVUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFile = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith('.csv')) {
      setFileName(file.name);
      setIsUploaded(true);
      
      // Parse CSV and create mock data for demo
      const base = new Date();
      const weeksAgo = (w: number) => {
        const d = new Date(base);
        d.setDate(base.getDate() - w * 7);
        return d.toISOString();
      };
      const mockData = [
        { id: 1, product: "iPhone 15 Pro", review: "Amazing camera quality and performance!", sentiment: "positive", rating: 5, date: weeksAgo(7) },
        { id: 2, product: "Samsung Galaxy S24", review: "Battery life could be better", sentiment: "neutral", rating: 3, date: weeksAgo(6) },
        { id: 3, product: "MacBook Air M3", review: "Overpriced for what it offers", sentiment: "negative", rating: 2, date: weeksAgo(5) },
        { id: 4, product: "Sony WH-1000XM5", review: "Best noise cancelling headphones ever!", sentiment: "positive", rating: 5, date: weeksAgo(4) },
        { id: 5, product: "iPad Pro", review: "Perfect for creative work", sentiment: "positive", rating: 4, date: weeksAgo(3) },
        { id: 6, product: "Dell XPS 13", review: "Great laptop but gets hot quickly", sentiment: "neutral", rating: 3, date: weeksAgo(2) },
        { id: 7, product: "AirPods Pro", review: "Terrible sound quality for the price", sentiment: "negative", rating: 1, date: weeksAgo(1) },
        { id: 8, product: "Nintendo Switch", review: "Fun gaming experience for the family", sentiment: "positive", rating: 4, date: weeksAgo(0) },
      ];
      
      onDataUpload(mockData);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 bg-gradient-primary bg-clip-text text-transparent">
          <Upload className="h-5 w-5 text-primary" />
          Upload Review Data
        </CardTitle>
        <CardDescription>
          Upload your CSV file containing Amazon product reviews for sentiment analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
            isDragOver 
              ? "border-primary bg-primary/10 shadow-glow" 
              : "border-border hover:border-primary/50",
            isUploaded && "border-success bg-success/10"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          {isUploaded ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-success" />
              <p className="text-success font-medium">{fileName}</p>
              <p className="text-muted-foreground text-sm">File uploaded successfully!</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium mb-2">Drop your CSV file here</p>
                <p className="text-muted-foreground mb-4">or click to browse</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileInput}
                  className="hidden"
                  id="csv-upload"
                />
                <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-200">
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};