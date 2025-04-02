
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type FiltersProps = {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string | null) => void;
  onTechStackChange: (techStack: string | null) => void;
  onSortChange: (sort: string) => void;
};

const ProjectFilters = ({
  onSearchChange,
  onCategoryChange,
  onTechStackChange,
  onSortChange
}: FiltersProps) => {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTechStack, setSelectedTechStack] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('latest');

  const categories = [
    'All',
    'Web Development', 
    'App Development', 
    'AI/ML', 
    'Data Science', 
    'DevOps', 
    'Blockchain'
  ];

  const techStacks = [
    'All',
    'React',
    'Node.js',
    'Python',
    'Angular',
    'Vue.js',
    'MongoDB',
    'Firebase',
    'TypeScript',
    'Django',
    'Flutter'
  ];

  const sortOptions = [
    { id: 'latest', label: 'Latest' },
    { id: 'most-liked', label: 'Most Liked' },
    { id: 'most-viewed', label: 'Most Viewed' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    const newCategory = category === 'All' ? null : category;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
  };

  const handleTechStackSelect = (techStack: string) => {
    const newTechStack = techStack === 'All' ? null : techStack;
    setSelectedTechStack(newTechStack);
    onTechStackChange(newTechStack);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    onSortChange(sort);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && (
            <button 
              onClick={() => {
                setSearch('');
                onSearchChange('');
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <SlidersHorizontal size={18} />
          <span>Filters</span>
          {(selectedCategory || selectedTechStack || sortOption !== 'latest') && (
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs">
              {(selectedCategory ? 1 : 0) + (selectedTechStack ? 1 : 0) + (sortOption !== 'latest' ? 1 : 0)}
            </span>
          )}
        </button>
      </div>
      
      {showFilters && (
        <div className="p-4 bg-card rounded-lg border border-border animate-fade-in space-y-4">
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedCategory === category || (category === 'All' && selectedCategory === null)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStacks.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechStackSelect(tech)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedTechStack === tech || (tech === 'All' && selectedTechStack === null)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    sortOption === option.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;
