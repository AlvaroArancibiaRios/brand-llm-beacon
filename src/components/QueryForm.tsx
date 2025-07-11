import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search, Sparkles } from "lucide-react";

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

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-primary" />
          LLM Brand Query
        </CardTitle>
        <CardDescription>
          Track how your brand appears across different AI models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand Name</Label>
            <Input
              id="brand"
              placeholder="e.g. Tesla, Apple, OpenAI"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="bg-background/50 border-border/60"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="query">Query</Label>
            <Textarea
              id="query"
              placeholder="e.g. What are the best electric car companies?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-background/50 border-border/60 min-h-[100px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={!query.trim() || !brand.trim() || isLoading}
          >
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? "Analyzing..." : "Analyze Brand Presence"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};