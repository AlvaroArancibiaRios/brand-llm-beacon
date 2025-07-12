
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Search, TrendingUp, TrendingDown, Minus, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Competitor {
  name: string;
  domain: string;
  llmMentions: number;
  averagePosition: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  marketShare: number;
  strengthAreas: string[];
  weaknesses: string[];
}

export const CompetitorAnalysis = () => {
  const { toast } = useToast();
  const [industry, setIndustry] = useState("");
  const [yourBrand, setYourBrand] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);

  const analyzeCompetitors = async () => {
    if (!industry || !yourBrand) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate competitor analysis
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const mockCompetitors: Competitor[] = [
      {
        name: "Competidor A",
        domain: "competidora.com",
        llmMentions: 45,
        averagePosition: 1.8,
        sentiment: 'positive',
        marketShare: 25,
        strengthAreas: ["Innovación tecnológica", "Presencia en redes sociales", "Contenido educativo"],
        weaknesses: ["Soporte al cliente", "Documentación técnica"]
      },
      {
        name: "Competidor B", 
        domain: "competidorb.com",
        llmMentions: 32,
        averagePosition: 2.3,
        sentiment: 'positive',
        marketShare: 18,
        strengthAreas: ["Precios competitivos", "Integración API", "Comunidad activa"],
        weaknesses: ["Interfaz de usuario", "Velocidad del producto"]
      },
      {
        name: "Tu Marca",
        domain: "tumarca.com",
        llmMentions: 28,
        averagePosition: 2.8,
        sentiment: 'neutral',
        marketShare: 15,
        strengthAreas: ["Calidad del producto", "Atención personalizada"],
        weaknesses: ["Visibilidad online", "Contenido SEO", "Presencia en LLMs"]
      },
      {
        name: "Competidor C",
        domain: "competidorc.com", 
        llmMentions: 22,
        averagePosition: 3.1,
        sentiment: 'neutral',
        marketShare: 12,
        strengthAreas: ["Especialización nicho", "Expertise técnico"],
        weaknesses: ["Marketing digital", "Escalabilidad"]
      },
      {
        name: "Competidor D",
        domain: "competidord.com",
        llmMentions: 18,
        averagePosition: 3.5,
        sentiment: 'negative',
        marketShare: 10,
        strengthAreas: ["Tradición en el mercado"],
        weaknesses: ["Innovación", "Presencia digital", "Satisfacción del cliente"]
      }
    ];

    setCompetitors(mockCompetitors);
    setIsAnalyzing(false);
    
    toast({
      title: "Análisis Completado",
      description: `Se analizaron ${mockCompetitors.length} competidores en ${industry}`,
    });
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-yellow-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'neutral':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'negative':
        return 'bg-red-500/10 text-red-700 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input */}
      <div className="lg:col-span-1">
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Análisis de Competidores
            </CardTitle>
            <CardDescription>
              Compara tu presencia en LLMs con la competencia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industria / Sector</Label>
              <Input
                id="industry"
                placeholder="ej. Tecnología, E-commerce, Salud"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="bg-background/50 border-border/60"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="your-brand">Tu Marca</Label>
              <Input
                id="your-brand"
                placeholder="ej. Mi Empresa"
                value={yourBrand}
                onChange={(e) => setYourBrand(e.target.value)}
                className="bg-background/50 border-border/60"
              />
            </div>
            
            <Button 
              onClick={analyzeCompetitors}
              disabled={!industry || !yourBrand || isAnalyzing}
              className="w-full"
            >
              <Search className="h-4 w-4 mr-2" />
              {isAnalyzing ? "Analizando..." : "Analizar Competencia"}
            </Button>
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
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analizando Competencia</h3>
                <p className="text-muted-foreground">
                  Comparando presencia en múltiples modelos de IA...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {competitors.length > 0 && !isAnalyzing && (
          <div className="space-y-4">
            <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Ranking de Competidores</CardTitle>
                <CardDescription>
                  Presencia y rendimiento en modelos de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitors.map((competitor, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border transition-all ${
                        competitor.name === yourBrand 
                          ? 'border-primary/50 bg-primary/5' 
                          : 'border-border/30 bg-background/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <div>
                            <h3 className="font-medium">{competitor.name}</h3>
                            <p className="text-xs text-muted-foreground">{competitor.domain}</p>
                          </div>
                          {competitor.name === yourBrand && (
                            <Badge className="bg-primary/20 text-primary">Tu Marca</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <p className="font-medium">{competitor.llmMentions}</p>
                            <p className="text-xs text-muted-foreground">Menciones</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{competitor.averagePosition}</p>
                            <p className="text-xs text-muted-foreground">Pos. Prom.</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {getSentimentIcon(competitor.sentiment)}
                            <Badge variant="outline" className={`text-xs ${getSentimentColor(competitor.sentiment)}`}>
                              {competitor.sentiment}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Cuota de Mercado</span>
                          <span>{competitor.marketShare}%</span>
                        </div>
                        <Progress value={competitor.marketShare} className="h-2" />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="font-medium text-green-600 mb-1">Fortalezas:</p>
                          <ul className="space-y-1">
                            {competitor.strengthAreas.map((strength, i) => (
                              <li key={i} className="text-muted-foreground">• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-red-600 mb-1">Oportunidades de Mejora:</p>
                          <ul className="space-y-1">
                            {competitor.weaknesses.map((weakness, i) => (
                              <li key={i} className="text-muted-foreground">• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {competitors.length === 0 && !isAnalyzing && (
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Listo para Analizar</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Completa la información de tu industria y marca para obtener un análisis competitivo detallado.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
