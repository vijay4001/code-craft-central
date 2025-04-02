
import React, { useState } from 'react';
import ProjectCard, { Project } from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import { PlusSquare } from 'lucide-react';

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with admin panel',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2080&auto=format&fit=crop',
    category: 'Web Development',
    techStack: ['React', 'Node.js', 'MongoDB'],
    likes: 47,
    views: 320,
    featured: true,
    link: 'https://example.com/project1'
  },
  {
    id: '2',
    title: 'AI Image Generator',
    description: 'Generate images using AI and machine learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    category: 'AI/ML',
    techStack: ['Python', 'TensorFlow', 'React'],
    likes: 89,
    views: 423
  },
  {
    id: '3',
    title: 'Food Delivery App',
    description: 'Mobile app for food ordering and delivery',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    category: 'App Development',
    techStack: ['React Native', 'Firebase'],
    likes: 36,
    views: 215
  },
  {
    id: '4',
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for data analysis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    category: 'Data Science',
    techStack: ['D3.js', 'React', 'Node.js'],
    likes: 28,
    views: 175
  },
  {
    id: '5',
    title: 'Smart Home IoT System',
    description: 'Control your home with voice commands and automation',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop',
    category: 'DevOps',
    techStack: ['Python', 'Arduino', 'MQTT'],
    likes: 52,
    views: 286
  },
  {
    id: '6',
    title: 'Cryptocurrency Tracker',
    description: 'Track and analyze cryptocurrency prices',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2071&auto=format&fit=crop',
    category: 'Blockchain',
    techStack: ['Vue.js', 'Node.js', 'Express'],
    likes: 47,
    views: 198,
    featured: true
  },
];

const Dashboard = ({ onNewProject }: { onNewProject: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTechStack, setSelectedTechStack] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('latest');
  
  // Filter projects based on search, category, and tech stack
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = !searchTerm || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    
    const matchesTechStack = !selectedTechStack || 
      project.techStack.includes(selectedTechStack);
    
    return matchesSearch && matchesCategory && matchesTechStack;
  });
  
  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === 'most-liked') {
      return b.likes - a.likes;
    } else if (sortOption === 'most-viewed') {
      return b.views - a.views;
    } else {
      // Default sort by latest (using id as proxy for timestamp)
      return parseInt(b.id) - parseInt(a.id);
    }
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Projects Dashboard</h1>
          <p className="text-muted-foreground">Manage and explore your coding projects</p>
        </div>
        <button 
          onClick={onNewProject}
          className="flex items-center gap-2 mt-4 sm:mt-0 px-4 py-2 bg-codepurple hover:bg-codepurple-dark text-white rounded-lg transition-colors"
        >
          <PlusSquare size={18} />
          <span>New Project</span>
        </button>
      </div>
      
      <ProjectFilters 
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onTechStackChange={setSelectedTechStack}
        onSortChange={setSortOption}
      />
      
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => console.log('Project clicked:', project.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or create a new project
          </p>
          <button 
            onClick={onNewProject}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-codepurple hover:bg-codepurple-dark text-white rounded-lg transition-colors"
          >
            <PlusSquare size={18} />
            <span>Create a New Project</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
