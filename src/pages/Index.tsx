import { useState } from "react";
import { QueryForm } from "@/components/QueryForm";
import { MetricsCard } from "@/components/MetricsCard";
import { LLMComparisonChart } from "@/components/LLMComparisonChart";
import { RecommendationsPanel } from "@/components/RecommendationsPanel";
import { OCRAnalyzer } from "@/components/OCRAnalyzer";
import { SEOAnalyzer } from "@/components/SEOAnalyzer";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { DocumentGenerator } from "@/components/DocumentGenerator";
import { BurgerMenu } from "@/components/BurgerMenu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Search, Target, TrendingUp, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
  const {
    toast
  } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("consulta");

  // Mock data for demonstration
  const mockLLMData = [{
    model: 'ChatGPT',
    mentions: 3,
    position: 2,
    sentiment: 'positive' as const
  }, {
    model: 'Perplexity',
    mentions: 1,
    position: 5,
    sentiment: 'neutral' as const
  }, {
    model: 'Claude',
    mentions: 2,
    position: 3,
    sentiment: 'positive' as const
  }, {
    model: 'Gemini',
    mentions: 4,
    position: 1,
    sentiment: 'positive' as const
  }, {
    model: 'DeepSeek',
    mentions: 1,
    position: 4,
    sentiment: 'neutral' as const
  }];
  const mockRecommendations = [{
    id: '1',
    title: 'Mejorar Autoridad del Contenido',
    description: 'Crear contenido más autoritativo que los LLMs puedan referenciar al discutir tu industria.',
    priority: 'high' as const,
    category: 'content' as const,
    impact: '+25% tasa de menciones'
  }, {
    id: '2',
    title: 'Optimizar Descripciones de Marca',
    description: 'Mejora tus descripciones públicas para incluir términos clave que mejoren la comprensión de los modelos de IA.',
    priority: 'medium' as const,
    category: 'seo' as const,
    impact: '+15% mejora de posición'
  }, {
    id: '3',
    title: 'Aumentar Presencia Digital',
    description: 'Expandir tu presencia en plataformas que los modelos de IA frecuentemente rastrean para obtener información.',
    priority: 'medium' as const,
    category: 'presence' as const,
    impact: '+30% visibilidad'
  }];
  const handleQuerySubmit = async (query: string, brand: string) => {
    setIsAnalyzing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    setShowResults(true);
    toast({
      title: "¡Análisis Completado!",
      description: `Se analizó exitosamente "${brand}" en 5 modelos LLM.`
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Header */}
      <header className="border-b border-border/20 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Rastreador LLM AEO</h1>
                <p className="text-sm text-muted-foreground">Optimización de Motores de Respuestas de IA</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 py-1">
                <Zap className="h-3 w-3 mr-1" />
                Versión Avanzada
              </Badge>
              <BurgerMenu activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="w-full">
          {/* Sección actual según activeTab */}

          {activeTab === "consulta" && <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
              {/* Query Form Centered */}
              <div className="w-full max-w-4xl">
                <QueryForm onSubmit={handleQuerySubmit} isLoading={isAnalyzing} />
              </div>

              {/* Results Section */}
              {!showResults && !isAnalyzing && <div className="w-full max-w-4xl">
                  
                </div>}

              {isAnalyzing && <div className="w-full max-w-4xl">
                  <div className="border border-border/20 bg-background/50 backdrop-blur-xl rounded-3xl p-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Analizando Presencia de Marca</h3>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto mb-6">
                      Consultando múltiples modelos de IA y analizando respuestas...
                    </p>
                    <div className="w-64 mx-auto bg-muted/30 rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{
                  width: '60%'
                }}></div>
                    </div>
                  </div>
                </div>}

              {showResults && <div className="w-full space-y-8">
                  {/* Metrics Cards */}
                  <div className="grid md:grid-cols-4 gap-6">
                    <MetricsCard title="Menciones Totales" value="11" description="En todos los modelos" icon={<Target className="h-4 w-4 text-primary" />} trend="up" />
                    <MetricsCard title="Posición Promedio" value="3.0" description="Cuando se menciona" icon={<TrendingUp className="h-4 w-4 text-blue-500" />} color="secondary" />
                    <MetricsCard title="Mejor Modelo" value="Gemini" description="Mayor menciones" icon={<BarChart3 className="h-4 w-4 text-green-500" />} color="success" />
                    <MetricsCard title="Puntuación AEO" value="7.2/10" description="Visibilidad general" icon={<Brain className="h-4 w-4 text-yellow-500" />} color="warning" />
                  </div>

                  {/* Chart */}
                  <LLMComparisonChart data={mockLLMData} />

                  {/* Recommendations and Results in Grid */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recommendations */}
                    <RecommendationsPanel recommendations={mockRecommendations} />

                    {/* Query Results */}
                    <div className="border border-border/20 bg-background/50 backdrop-blur-xl rounded-3xl p-8">
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Últimos Resultados de Consulta</h3>
                        <p className="text-muted-foreground">
                          Desglose detallado de menciones de marca y contexto
                        </p>
                      </div>
                      <div className="space-y-4">
                        {mockLLMData.map(model => <div key={model.model} className="p-4 rounded-2xl border border-border/20 bg-background/30 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{model.model}</h4>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs rounded-full">
                                  #{model.position}
                                </Badge>
                                <Badge variant="secondary" className="text-xs rounded-full">
                                  {model.mentions} menciones
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Tu marca apareció {model.mentions} vez/veces en la posición {model.position} con contexto {model.sentiment === 'positive' ? 'positivo' : model.sentiment === 'neutral' ? 'neutral' : 'negativo'}.
                            </p>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </div>}
            </div>}

          {activeTab === "ocr" && <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <OCRAnalyzer />
              </div>
            </div>}
          {activeTab === "seo" && <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <SEOAnalyzer />
              </div>
            </div>}
          {activeTab === "competidores" && <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <CompetitorAnalysis />
              </div>
            </div>}
          {activeTab === "documentos" && <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <DocumentGenerator />
              </div>
            </div>}
        </div>
      </main>
    </div>;
};
export default Index;