
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Scan, Upload, FileImage, Eye, Zap, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OCRAnalyzer = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [llmOptimizations, setLlmOptimizations] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const simulateOCRProcessing = async () => {
    setIsProcessing(true);
    
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockExtractedText = `
    Bienvenido a Nuestra Empresa
    
    Somos líderes en tecnología innovadora, ofreciendo soluciones de vanguardia para empresas modernas.
    
    Nuestros Servicios:
    - Desarrollo de software personalizado
    - Consultoría en transformación digital
    - Integración de sistemas empresariales
    - Soporte técnico 24/7
    
    Contacto: info@empresa.com | Tel: +34 900 123 456
    Dirección: Calle Principal 123, Madrid, España
    
    Certificaciones: ISO 9001, ISO 27001
    Años de experiencia: +15 años
    `;
    
    setExtractedText(mockExtractedText);
    
    // Mock LLM optimizations
    const optimizations = [
      "Agregar esquemas estructurados (Schema.org) para información de contacto",
      "Incluir metadatos semánticos para certificaciones",
      "Optimizar descripción de servicios con palabras clave específicas",
      "Añadir datos de ubicación para búsquedas locales",
      "Crear FAQ estructurada basada en servicios mencionados"
    ];
    
    setLlmOptimizations(optimizations);
    setIsProcessing(false);
    
    toast({
      title: "OCR Completado",
      description: "Texto extraído y optimizaciones LLM generadas exitosamente.",
    });
  };

  const analyzeWebsite = async () => {
    if (!websiteUrl) {
      toast({
        title: "Error",
        description: "Por favor ingresa una URL válida",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate website scraping and OCR
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockWebsiteText = `
    Homepage - Empresa de Tecnología
    
    Navegación: Inicio | Servicios | Sobre Nosotros | Contacto
    
    Contenido Principal:
    "Transformamos ideas en soluciones digitales innovadoras"
    
    Servicios destacados en imágenes:
    - Desarrollo Web
    - Aplicaciones Móviles  
    - Cloud Computing
    - Inteligencia Artificial
    
    Testimonios de clientes (texto en imágenes):
    "Excelente servicio, superaron nuestras expectativas" - Cliente A
    "Profesionales y eficientes" - Cliente B
    
    Footer: Copyright 2024 | Política de Privacidad | Términos de Uso
    `;
    
    setExtractedText(mockWebsiteText);
    
    const optimizations = [
      "Extraer testimonios de imágenes y convertir a texto indexable",
      "Optimizar títulos H1/H2 basados en contenido visual",
      "Crear alt-text descriptivo para imágenes de servicios",
      "Estructurar datos de navegación para mejores breadcrumbs",
      "Generar meta descripciones basadas en contenido visual"
    ];
    
    setLlmOptimizations(optimizations);
    setIsProcessing(false);
    
    toast({
      title: "Análisis Web Completado",
      description: "Contenido visual extraído y optimizado para LLMs.",
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Column - Input Methods */}
      <div className="space-y-6">
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5 text-primary" />
              Análisis OCR de Imagen
            </CardTitle>
            <CardDescription>
              Sube una imagen para extraer texto y optimizar para LLMs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Seleccionar Imagen</Label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="bg-background/50 border-border/60"
              />
            </div>
            
            {selectedFile && (
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">Archivo seleccionado:</p>
                <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
              </div>
            )}
            
            <Button 
              onClick={simulateOCRProcessing}
              disabled={!selectedFile || isProcessing}
              className="w-full"
            >
              <Scan className="h-4 w-4 mr-2" />
              {isProcessing ? "Procesando..." : "Analizar Imagen"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Análisis de Sitio Web
            </CardTitle>
            <CardDescription>
              Analiza contenido visual de un sitio web completo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-url">URL del Sitio Web</Label>
              <Input
                id="website-url"
                placeholder="https://ejemplo.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="bg-background/50 border-border/60"
              />
            </div>
            
            <Button 
              onClick={analyzeWebsite}
              disabled={!websiteUrl || isProcessing}
              className="w-full"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isProcessing ? "Analizando..." : "Analizar Sitio"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        {isProcessing && (
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Scan className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Procesando Contenido</h3>
                <p className="text-muted-foreground">
                  Extrayendo texto y generando optimizaciones LLM...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {extractedText && !isProcessing && (
          <>
            <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Texto Extraído</CardTitle>
                <CardDescription>
                  Contenido identificado mediante OCR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="min-h-[200px] bg-background/50 border-border/60"
                  placeholder="El texto extraído aparecerá aquí..."
                />
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Optimizaciones LLM
                </CardTitle>
                <CardDescription>
                  Recomendaciones para mejorar la comprensión de los modelos de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {llmOptimizations.map((optimization, index) => (
                    <div key={index} className="p-3 rounded-lg border border-border/30 bg-background/30">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="text-xs mt-0.5">
                          {index + 1}
                        </Badge>
                        <p className="text-sm">{optimization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {!extractedText && !isProcessing && (
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Listo para Analizar</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Sube una imagen o ingresa una URL para extraer contenido visual y optimizarlo para LLMs.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
