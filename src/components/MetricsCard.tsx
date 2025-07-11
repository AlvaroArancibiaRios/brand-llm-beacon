import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: "up" | "down" | "neutral";
  color?: "primary" | "secondary" | "success" | "warning";
  icon?: React.ReactNode;
}

export const MetricsCard = ({ 
  title, 
  value, 
  description, 
  trend = "neutral",
  color = "primary",
  icon
}: MetricsCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "success":
        return "border-green-500/30 bg-green-500/5";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5";
      case "secondary":
        return "border-blue-500/30 bg-blue-500/5";
      default:
        return "border-primary/30 bg-primary/5";
    }
  };

  return (
    <Card className={`border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm ${getColorClasses()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon || <Target className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {getTrendIcon()}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};