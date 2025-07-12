import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Sparkles, ArrowRight } from "lucide-react";

interface QueryFormProps {
  onSubmit: (query: string, brand: string) => void;
  isLoading?: boolean;
}

export const QueryForm = ({ onSubmit, isLoading = false }: QueryFormProps) => {
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

  return (
    <div className="w-full max-w-4xl mx-auto">
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
        <p className="text-muted-foreground text-lg">
          Ingresa el nombre de tu marca y una consulta para ver cómo funciona tu marca en diferentes modelos de IA.
        </p>
      </div>

      {/* Modern Search Interface */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Input */}
        <div className="relative">
          <Input
            id="brand"
            placeholder="Nombre de la marca (ej. Tesla, Apple, OpenAI)"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-14 text-lg pl-6 pr-6 rounded-2xl border-2 border-border/40 bg-background/50 backdrop-blur-sm hover:border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Query Input */}
        <div className="relative">
          <Textarea
            id="query"
            placeholder="Escribe tu consulta aquí... (ej. ¿Cuáles son las mejores empresas de autos eléctricos?)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[120px] text-lg p-6 rounded-2xl border-2 border-border/40 bg-background/50 backdrop-blur-sm hover:border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60 resize-none"
            rows={4}
          />
          
          {/* Submit Button - Floating */}
          <div className="absolute bottom-4 right-4">
            <Button 
              type="submit" 
              size="sm"
              disabled={!query.trim() || !brand.trim() || isLoading}
              className="h-10 w-10 p-0 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <ArrowRight className="h-4 w-4 text-primary-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Keyboard Shortcut Hint */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Presiona</span>
          <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">⌘</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Enter</kbd>
          <span>para enviar</span>
        </div>
      </form>
    </div>
  );
};