import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'content' | 'seo' | 'presence' | 'optimization';
  impact: string;
}

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
}

export const RecommendationsPanel = ({ recommendations }: RecommendationsPanelProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'content':
        return <Lightbulb className="h-4 w-4" />;
      case 'seo':
        return <TrendingUp className="h-4 w-4" />;
      case 'presence':
        return <CheckCircle className="h-4 w-4" />;
      case 'optimization':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AEO Recommendations
        </CardTitle>
        <CardDescription>
          Strategic insights to improve your brand's AI visibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id}
            className="p-4 rounded-lg border border-border/30 bg-background/30 hover:bg-background/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getCategoryIcon(rec.category)}
                <h4 className="font-medium text-sm">{rec.title}</h4>
              </div>
              <Badge variant={getPriorityColor(rec.priority)} className="text-xs">
                {rec.priority}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {rec.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-400 font-medium">
                Impact: {rec.impact}
              </span>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                Learn More
              </Button>
            </div>
          </div>
        ))}
        
        {recommendations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recommendations available yet.</p>
            <p className="text-sm">Run a brand analysis to get personalized insights.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};