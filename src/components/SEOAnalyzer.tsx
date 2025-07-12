
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileSearch, Search, AlertTriangle, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SEOMetric {
  name: string;
  score: number;
  status: 'good' | 'warning' | 'error';
  description: string;
  llmImpact: string;
}

export const SEOAnalyzer = () => {
  const { toast } = useToast();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seoMetrics, setSeoMetrics] = useState<SEOMetric[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  const analyzeSEO = async () => {
    if (!websiteUrl) {
      toast({
        title: "Error",
        description: "Por favor ingresa una URL válida",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate SEO analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockMetrics: SEOMetric[] = [
      {
        name: "Título Meta",
        score: 85,
        status: 'good',
        description: "Título optimizado con palabras clave principales",
        llmImpact: "Los LLMs pueden identificar fácilmente el tema principal"
      },
      {
        name: "Meta Descripción",
        score: 65,
        status: 'warning',
        description: "Descripción presente pero podría ser más descriptiva",
        llmImpact: "Mejorar para ayudar a LLMs a entender el contexto"
      },
      {
        name: "Estructura H1-H6",
        score: 90,
        status: 'good',
        description: "Jerarquía de encabezados bien estructurada",
        llmImpact: "Excelente para comprensión jerárquica de LLMs"
      },
      {
        name: "Schema Markup",
        score: 30,
        status: 'error',
        description: "Falta implementación de datos estructurados",
        llmImpact: "Crítico: Los LLMs no pueden entender la estructura semántica"
      },
      {
        name: "Velocidad de Carga",
        score: 75,
        status: 'warning',
        description: "Tiempo de carga moderado (2.1s)",
        llmImpact: "Puede afectar la indexación por parte de crawlers de IA"
      },
      {
        name: "Contenido Único",
        score: 95,
        status: 'good',
        description: "Alto porcentaje de contenido original",
        llmImpact: "Excelente para ser considerado fuente autoritativa por LLMs"
      },
      {
        name: "Alt Text de Imágenes",
        score: 45,
        status: 'error',
        description: "60% de imágenes sin texto alternativo",
        llmImpact: "Los LLMs no pueden procesar información visual importante"
      },
      {
        name: "Enlaces Internos",
        score: 80,
        status: 'good',
        description: "Buena estructura de enlaces internos",
        llmImpact: "Ayuda a LLMs a entender relaciones entre contenidos"
      }
    ];

    setSeoMetrics(mockMetrics);
    const avgScore = Math.round(mockMetrics.reduce((sum, metric) => sum + metric.score, 0) / mockMetrics.length);
    setOverallScore(avgScore);
    setIsAnalyzing(false);
    
    toast({
      title: "Análisis SEO Completado",
      description: `Puntuación general: ${avgScore}/100`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input */}
      <div className="lg:col-span-1">
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-5 w-5 text-primary" />
              Análisis SEO para LLMs
            </CardTitle>
            <CardDescription>
              Analiza tu sitio web para optimización en motores de IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seo-url">URL del Sitio Web</Label>
              <Input
                id="seo-url"
                placeholder="https://tusitio.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="bg-background/50 border-border/60"
              />
            </div>
            
            <Button 
              onClick={analyzeSEO}
              disabled={!websiteUrl || isAnalyzing}
              className="w-full"
            >
              <Search className="h-4 w-4 mr-2" />
              {isAnalyzing ? "Analizando..." : "Analizar SEO"}
            </Button>

            {overallScore > 0 && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Puntuación General</span>
                  <span className="text-2xl font-bold text-primary">{overallScore}/100</span>
                </div>
                <Progress value={overallScore} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Optimización para comprensión de LLMs
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2">
        {isAnalyzing && (
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <FileSearch className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analizando SEO</h3>
                <p className="text-muted-foreground">
                  Evaluando optimización para motores de respuestas de IA...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {seoMetrics.length > 0 && !isAnalyzing && (
          <div className="space-y-4">
            {seoMetrics.map((metric, index) => (
              <Card key={index} className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(metric.status)}
                      <h3 className="font-medium">{metric.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{metric.score}/100</span>
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${getStatusColor(metric.status)}`}
                          style={{ width: `${metric.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {metric.description}
                  </p>
                  
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-primary mb-1">Impacto en LLMs:</p>
                        <p className="text-xs text-muted-foreground">{metric.llmImpact}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {seoMetrics.length === 0 && !isAnalyzing && (
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <FileSearch className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Listo para Analizar</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Ingresa la URL de tu sitio web para obtener un análisis detallado de SEO optimizado para LLMs.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
