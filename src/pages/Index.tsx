import { useState } from "react";
import { QueryForm } from "@/components/QueryForm";
import { MetricsCard } from "@/components/MetricsCard";
import { LLMComparisonChart } from "@/components/LLMComparisonChart";
import { RecommendationsPanel } from "@/components/RecommendationsPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Search, Target, TrendingUp, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock data for demonstration
  const mockLLMData = [
    { model: 'ChatGPT', mentions: 3, position: 2, sentiment: 'positive' as const },
    { model: 'Perplexity', mentions: 1, position: 5, sentiment: 'neutral' as const },
    { model: 'Claude', mentions: 2, position: 3, sentiment: 'positive' as const },
    { model: 'Gemini', mentions: 4, position: 1, sentiment: 'positive' as const },
    { model: 'DeepSeek', mentions: 1, position: 4, sentiment: 'neutral' as const },
  ];

  const mockRecommendations = [
    {
      id: '1',
      title: 'Improve Content Authority',
      description: 'Create more authoritative content that LLMs are likely to reference when discussing your industry.',
      priority: 'high' as const,
      category: 'content' as const,
      impact: '+25% mention rate'
    },
    {
      id: '2',
      title: 'Optimize Brand Descriptions',
      description: 'Enhance your public-facing descriptions to include key terms that improve AI model understanding.',
      priority: 'medium' as const,
      category: 'seo' as const,
      impact: '+15% position improvement'
    },
    {
      id: '3',
      title: 'Increase Digital Presence',
      description: 'Expand your presence on platforms that AI models frequently crawl for information.',
      priority: 'medium' as const,
      category: 'presence' as const,
      impact: '+30% visibility'
    }
  ];

  const handleQuerySubmit = async (query: string, brand: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    setShowResults(true);
    
    toast({
      title: "Analysis Complete!",
      description: `Successfully analyzed "${brand}" across 5 LLM models.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">LLM AEO Tracker</h1>
                <p className="text-sm text-muted-foreground">AI Answer Engine Optimization</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Zap className="h-3 w-3 mr-1" />
              MVP Version
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Query Form */}
          <div className="lg:col-span-1">
            <QueryForm onSubmit={handleQuerySubmit} isLoading={isAnalyzing} />
            
            {showResults && (
              <div className="mt-6">
                <RecommendationsPanel recommendations={mockRecommendations} />
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {!showResults && !isAnalyzing && (
              <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Enter your brand name and a query to see how your brand performs across different AI models.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {isAnalyzing && (
              <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Analyzing Brand Presence</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      Querying multiple AI models and analyzing responses...
                    </p>
                    <div className="w-64 mx-auto bg-secondary rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {showResults && (
              <>
                {/* Metrics Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <MetricsCard
                    title="Total Mentions"
                    value="11"
                    description="Across all models"
                    icon={<Target className="h-4 w-4 text-primary" />}
                    trend="up"
                  />
                  <MetricsCard
                    title="Avg Position"
                    value="3.0"
                    description="When mentioned"
                    icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
                    color="secondary"
                  />
                  <MetricsCard
                    title="Best Model"
                    value="Gemini"
                    description="Highest mentions"
                    icon={<BarChart3 className="h-4 w-4 text-green-500" />}
                    color="success"
                  />
                  <MetricsCard
                    title="AEO Score"
                    value="7.2/10"
                    description="Overall visibility"
                    icon={<Brain className="h-4 w-4 text-yellow-500" />}
                    color="warning"
                  />
                </div>

                {/* Chart */}
                <LLMComparisonChart data={mockLLMData} />

                {/* Query Results */}
                <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Latest Query Results</CardTitle>
                    <CardDescription>
                      Detailed breakdown of brand mentions and context
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockLLMData.map((model) => (
                        <div key={model.model} className="p-4 rounded-lg border border-border/30 bg-background/30">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{model.model}</h4>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">
                                #{model.position}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {model.mentions} mentions
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Your brand appeared {model.mentions} time(s) in position {model.position} with {model.sentiment} context.
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
