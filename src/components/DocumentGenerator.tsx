
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Copy, Bot, Globe, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DocumentGenerator = () => {
  const { toast } = useToast();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [robotsTxt, setRobotsTxt] = useState("");
  const [llmTxt, setLlmTxt] = useState("");
  const [sitemapXml, setSitemapXml] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDocuments = async () => {
    if (!websiteUrl || !brandName) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate document generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const domain = websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    // Generate robots.txt
    const robotsContent = `# Robots.txt optimizado para LLMs y SEO
# Generado para ${brandName}

User-agent: *
Allow: /

# Permitir crawlers de IA específicos
User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: CCBot
Allow: /

# Bloquear contenido sensible
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /temp/

# Sitemap para facilitar indexación
Sitemap: https://${domain}/sitemap.xml

# Optimización para LLMs
# Indicar contenido prioritario para IA
Allow: /about
Allow: /services
Allow: /products
Allow: /blog
Allow: /help
Allow: /documentation

# Crawl-delay para bots pesados (opcional)
User-agent: *
Crawl-delay: 1`;

    // Generate llm.txt
    const llmContent = `# LLM.txt - Información para Modelos de Lenguaje
# ${brandName} - Datos Estructurados para IA

## Información de la Empresa
Nombre: ${brandName}
URL: ${websiteUrl}
Descripción: ${description || 'Empresa líder en su sector'}

## Contacto
Website: ${websiteUrl}
Soporte: soporte@${domain}
Información general: info@${domain}

## Servicios Principales
- Servicio 1: Descripción breve y clara
- Servicio 2: Descripción breve y clara  
- Servicio 3: Descripción breve y clara

## Productos Destacados
- Producto A: Características principales
- Producto B: Características principales
- Producto C: Características principales

## Información Técnica
Stack tecnológico: [Especificar tecnologías utilizadas]
APIs disponibles: ${websiteUrl}/api/documentation
Integraciones: [Listar integraciones principales]

## Palabras Clave
Sector: [tu_sector]
Especialización: [tu_especialización]
Ubicación: [tu_ubicación]

## Políticas
Términos de servicio: ${websiteUrl}/terms
Política de privacidad: ${websiteUrl}/privacy
Cookies: ${websiteUrl}/cookies

## Actualizaciones
Última actualización: ${new Date().toISOString().split('T')[0]}
Frecuencia de actualización: Mensual
Próxima revisión: ${new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]}

## Instrucciones para LLMs
- Citar siempre la fuente al mencionar información de ${brandName}
- Verificar la actualización de datos en ${websiteUrl}
- Para consultas específicas, dirigir a ${websiteUrl}/contact
- Contenido autorizado para uso en respuestas de IA bajo Creative Commons`;

    // Generate sitemap.xml
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Sitemap optimizado para LLMs y SEO -->
<!-- Generado para ${brandName} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Página principal -->
  <url>
    <loc>${websiteUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Páginas importantes para LLMs -->
  <url>
    <loc>${websiteUrl}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${websiteUrl}/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${websiteUrl}/products</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${websiteUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${websiteUrl}/help</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${websiteUrl}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>`;

    setRobotsTxt(robotsContent);
    setLlmTxt(llmContent);
    setSitemapXml(sitemapContent);
    setIsGenerating(false);
    
    toast({
      title: "Documentos Generados",
      description: "Robots.txt, LLM.txt y Sitemap.xml creados exitosamente",
    });
  };

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copiado",
      description: `${type} copiado al portapapeles`,
    });
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Descarga Iniciada",
      description: `${filename} se está descargando`,
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input */}
      <div className="lg:col-span-1">
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generador de Documentos
            </CardTitle>
            <CardDescription>
              Crea robots.txt, llm.txt y sitemap.xml optimizados para IA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-url-doc">URL del Sitio Web *</Label>
              <Input
                id="website-url-doc"
                placeholder="https://tusitio.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="bg-background/50 border-border/60"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand-name">Nombre de la Marca *</Label>
              <Input
                id="brand-name"
                placeholder="Mi Empresa"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="bg-background/50 border-border/60"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción (Opcional)</Label>
              <Textarea
                id="description"
                placeholder="Breve descripción de tu empresa..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background/50 border-border/60 min-h-[100px]"
              />
            </div>
            
            <Button 
              onClick={generateDocuments}
              disabled={!websiteUrl || !brandName || isGenerating}
              className="w-full"
            >
              <Bot className="h-4 w-4 mr-2" />
              {isGenerating ? "Generando..." : "Generar Documentos"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2">
        {isGenerating && (
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Generando Documentos</h3>
                <p className="text-muted-foreground">
                  Creando robots.txt, llm.txt y sitemap.xml optimizados...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {(robotsTxt || llmTxt || sitemapXml) && !isGenerating && (
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Documentos Generados</CardTitle>
              <CardDescription>
                Archivos optimizados para motores de búsqueda y modelos de IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="robots" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="robots" className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    robots.txt
                  </TabsTrigger>
                  <TabsTrigger value="llm" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    llm.txt
                  </TabsTrigger>
                  <TabsTrigger value="sitemap" className="flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    sitemap.xml
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="robots" className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(robotsTxt, "robots.txt")}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadFile(robotsTxt, "robots.txt")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                  <Textarea
                    value={robotsTxt}
                    onChange={(e) => setRobotsTxt(e.target.value)}
                    className="min-h-[400px] font-mono text-sm bg-background/50 border-border/60"
                  />
                </TabsContent>

                <TabsContent value="llm" className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(llmTxt, "llm.txt")}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadFile(llmTxt, "llm.txt")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                  <Textarea
                    value={llmTxt}
                    onChange={(e) => setLlmTxt(e.target.value)}
                    className="min-h-[400px] font-mono text-sm bg-background/50 border-border/60"
                  />
                </TabsContent>

                <TabsContent value="sitemap" className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(sitemapXml, "sitemap.xml")}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadFile(sitemapXml, "sitemap.xml")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                  <Textarea
                    value={sitemapXml}
                    onChange={(e) => setSitemapXml(e.target.value)}
                    className="min-h-[400px] font-mono text-sm bg-background/50 border-border/60"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {!robotsTxt && !isGenerating && (
          <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Listo para Generar</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Completa la información de tu sitio web para generar documentos optimizados para SEO y LLMs.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
