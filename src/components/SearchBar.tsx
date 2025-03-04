
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SearchBarProps {
  onSearch: (city: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    } else {
      toast.error('Please enter a city name');
    }
  };

  const clearSearch = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative group animate-fade-in ${className}`}
    >
      <div className={`
        flex items-center bg-white bg-opacity-70 border border-opacity-30 
        rounded-full px-4 py-2 transition-all duration-300 ease-in-out
        ${isFocused ? 'shadow-md bg-opacity-90 border-primary/30' : 'shadow border-white/30'}
      `}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a city..."
          className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
        />
        
        {query && (
          <Button
            type="button"
            variant="ghost"
            onClick={clearSearch}
            size="icon"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 ml-1 text-muted-foreground hover:text-primary"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
