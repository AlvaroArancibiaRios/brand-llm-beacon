import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Sparkles, ArrowRight } from "lucide-react";
interface QueryFormProps {
  onSubmit: (query: string, brand: string) => void;
  isLoading?: boolean;
}
export const QueryForm = ({
  onSubmit,
  isLoading = false
}: QueryFormProps) => {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && brand.trim()) {
      onSubmit(query.trim(), brand.trim());
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (query.trim() && brand.trim()) {
        onSubmit(query.trim(), brand.trim());
      }
    }
  };
  return <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            Consulta de Marca LLM
          </h1>
        </div>
        <p className="text-muted-foreground text-lg px-[60px] py-[10px] mx-[168px]">
          Ingresa el nombre de tu marca y una consulta para ver cómo funciona tu marca en diferentes modelos de IA.
        </p>
      </div>

      {/* Modern Search Interface */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Input with CTA */}
        <div className="relative">
          <Input 
            id="brand" 
            placeholder="Nombre de la marca (ej. Tesla, Apple, OpenAI)" 
            value={brand} 
            onChange={e => setBrand(e.target.value)} 
            onKeyDown={handleKeyDown} 
            className="h-14 text-lg pl-6 pr-6 rounded-2xl border-2 border-border/40 bg-background/50 backdrop-blur-sm hover:border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60" 
          />
          
          {/* Call to Action inside brand input area */}
          {brand.trim() && (
            <div className="absolute -bottom-3 left-6 transform animate-fade-in">
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-sm">
                <Search className="h-3 w-3 text-primary" />
                <span className="text-primary font-medium">Listo para el análisis?</span>
              </div>
            </div>
          )}
        </div>

        {/* Query Input */}
        <div className="relative mt-8">
          <Textarea 
            id="query" 
            placeholder="Escribe tu consulta aquí... (ej. ¿Cuáles son las mejores empresas de autos eléctricos?)" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            onKeyDown={handleKeyDown} 
            className="min-h-[120px] text-lg p-6 rounded-2xl border-2 border-border/40 bg-background/50 backdrop-blur-sm hover:border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60 resize-none" 
            rows={4} 
          />
        </div>

        {/* Main CTA Button */}
        {query.trim() && brand.trim() && (
          <div className="flex justify-center animate-scale-in">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isLoading} 
              className="h-14 px-8 rounded-2xl bg-gradient-primary hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-3" />
                  Analizando...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-3" />
                  ¡Iniciar Análisis LLM!
                  <ArrowRight className="h-5 w-5 ml-3" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Keyboard Shortcut Hint */}
        {query.trim() && brand.trim() && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-in">
            <span>O presiona</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">⌘</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Enter</kbd>
          </div>
        )}
      </form>
    </div>;
};