import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Search, 
  Scan, 
  FileSearch, 
  Users, 
  FileText, 
  Brain,
  Zap,
  X
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
}

interface BurgerMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BurgerMenu = ({ activeTab, onTabChange }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: "consulta",
      label: "Consulta LLM",
      icon: Search,
      description: "Analiza tu marca en múltiples modelos de IA",
      badge: "Principal"
    },
    {
      id: "ocr",
      label: "OCR Análisis",
      icon: Scan,
      description: "Extrae y optimiza texto de imágenes",
      badge: "Nuevo"
    },
    {
      id: "seo",
      label: "SEO Análisis",
      icon: FileSearch,
      description: "Optimización para motores de búsqueda",
    },
    {
      id: "competidores",
      label: "Competidores",
      icon: Users,
      description: "Análisis comparativo de la competencia",
    },
    {
      id: "documentos",
      label: "Documentos",
      icon: FileText,
      description: "Genera robots.txt y llm.txt automáticamente",
      badge: "IA"
    }
  ];

  const handleMenuItemClick = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative h-10 w-10 border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="w-80 p-0 bg-gradient-to-br from-background via-background to-background/80 border-border/50"
      >
        {/* Header del menú */}
        <div className="p-6 border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Menú Principal</h2>
                <p className="text-sm text-muted-foreground">Rastreador LLM AEO</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Items del menú */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full h-auto p-4 justify-start text-left transition-all duration-200 ${
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                    : "hover:bg-card/50 hover:scale-[1.02]"
                }`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? "bg-primary/20" 
                      : "bg-muted/50"
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium text-sm ${
                        isActive ? "text-primary" : "text-foreground"
                      }`}>
                        {item.label}
                      </h3>
                      {item.badge && (
                        <Badge 
                          variant={item.badge === "Principal" ? "default" : "secondary"}
                          className={`text-xs px-2 py-0 h-5 ${
                            item.badge === "Nuevo" ? "bg-green-500/10 text-green-600 border-green-500/20" :
                            item.badge === "IA" ? "bg-purple-500/10 text-purple-600 border-purple-500/20" :
                            "bg-primary/10 text-primary border-primary/20"
                          }`}
                        >
                          {item.badge === "IA" && <Zap className="h-3 w-3 mr-1" />}
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Footer del menú */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium">Versión Avanzada</p>
              <p className="text-xs text-muted-foreground">Optimización AEO</p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Zap className="h-3 w-3 mr-1" />
              Pro
            </Badge>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};