import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchState {
  query: string;
  brand: string;
  isAnalyzing: boolean;
  showResults: boolean;
  hasSearched: boolean;
}

interface SearchContextType extends SearchState {
  setQuery: (query: string) => void;
  setBrand: (brand: string) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setShowResults: (showResults: boolean) => void;
  resetSearch: () => void;
  startNewSearch: (query: string, brand: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const initialState: SearchState = {
  query: '',
  brand: '',
  isAnalyzing: false,
  showResults: false,
  hasSearched: false,
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchState, setSearchState] = useState<SearchState>(initialState);

  const setQuery = (query: string) => {
    setSearchState(prev => ({ ...prev, query }));
  };

  const setBrand = (brand: string) => {
    setSearchState(prev => ({ ...prev, brand }));
  };

  const setIsAnalyzing = (isAnalyzing: boolean) => {
    setSearchState(prev => ({ ...prev, isAnalyzing }));
  };

  const setShowResults = (showResults: boolean) => {
    setSearchState(prev => ({ ...prev, showResults }));
  };

  const resetSearch = () => {
    setSearchState(initialState);
  };

  const startNewSearch = (query: string, brand: string) => {
    setSearchState({
      query,
      brand,
      isAnalyzing: true,
      showResults: false,
      hasSearched: true,
    });
  };

  return (
    <SearchContext.Provider
      value={{
        ...searchState,
        setQuery,
        setBrand,
        setIsAnalyzing,
        setShowResults,
        resetSearch,
        startNewSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};