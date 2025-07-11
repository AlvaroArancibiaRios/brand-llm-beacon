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
      title: 'Mejorar Autoridad del Contenido',
      description: 'Crear contenido más autoritativo que los LLMs puedan referenciar al discutir tu industria.',
      priority: 'high' as const,
      category: 'content' as const,
      impact: '+25% tasa de menciones'
    },
    {
      id: '2',
      title: 'Optimizar Descripciones de Marca',
      description: 'Mejora tus descripciones públicas para incluir términos clave que mejoren la comprensión de los modelos de IA.',
      priority: 'medium' as const,
      category: 'seo' as const,
      impact: '+15% mejora de posición'
    },
    {
      id: '3',
      title: 'Aumentar Presencia Digital',
      description: 'Expandir tu presencia en plataformas que los modelos de IA frecuentemente rastrean para obtener información.',
      priority: 'medium' as const,
      category: 'presence' as const,
      impact: '+30% visibilidad'
    }
  ];

  const handleQuerySubmit = async (query: string, brand: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    setShowResults(true);
    
    toast({
      title: "¡Análisis Completado!",
      description: `Se analizó exitosamente "${brand}" en 5 modelos LLM.`,
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
                <h1 className="text-xl font-bold">Rastreador LLM AEO</h1>
                <p className="text-sm text-muted-foreground">Optimización de Motores de Respuestas de IA</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Zap className="h-3 w-3 mr-1" />
              Versión MVP
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
                    <h3 className="text-lg font-semibold mb-2">Listo para Analizar</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Ingresa el nombre de tu marca y una consulta para ver cómo funciona tu marca en diferentes modelos de IA.
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
                    <h3 className="text-lg font-semibold mb-2">Analizando Presencia de Marca</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      Consultando múltiples modelos de IA y analizando respuestas...
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
                    title="Menciones Totales"
                    value="11"
                    description="En todos los modelos"
                    icon={<Target className="h-4 w-4 text-primary" />}
                    trend="up"
                  />
                  <MetricsCard
                    title="Posición Promedio"
                    value="3.0"
                    description="Cuando se menciona"
                    icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
                    color="secondary"
                  />
                  <MetricsCard
                    title="Mejor Modelo"
                    value="Gemini"
                    description="Mayor menciones"
                    icon={<BarChart3 className="h-4 w-4 text-green-500" />}
                    color="success"
                  />
                  <MetricsCard
                    title="Puntuación AEO"
                    value="7.2/10"
                    description="Visibilidad general"
                    icon={<Brain className="h-4 w-4 text-yellow-500" />}
                    color="warning"
                  />
                </div>

                {/* Chart */}
                <LLMComparisonChart data={mockLLMData} />

                {/* Query Results */}
                <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Últimos Resultados de Consulta</CardTitle>
                    <CardDescription>
                      Desglose detallado de menciones de marca y contexto
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
                                {model.mentions} menciones
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Tu marca apareció {model.mentions} vez/veces en la posición {model.position} con contexto {
                              model.sentiment === 'positive' ? 'positivo' : 
                              model.sentiment === 'neutral' ? 'neutral' : 'negativo'
                            }.
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
