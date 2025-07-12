import { Search, Edit3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/contexts/SearchContext";

export const SearchHeader = () => {
  const { query, brand, hasSearched, resetSearch } = useSearch();

  if (!hasSearched) return null;

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Search Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex items-center gap-2 text-primary">
              <Search className="h-5 w-5" />
              <span className="font-medium">Análisis actual:</span>
            </div>
            
            <div className="flex items-center gap-2 min-w-0">
              <Badge variant="secondary" className="font-medium">
                {brand}
              </Badge>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm text-foreground truncate">
                {query}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetSearch}
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Nueva búsqueda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};