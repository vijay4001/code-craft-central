
import React, { useState } from 'react';
import ProjectCard, { Project } from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import { PlusSquare } from 'lucide-react';

interface ProjectsListProps {
  onNewProject: () => void;
  onProjectClick: (project: Project) => void;
  userProjects: Project[];
  onDeleteProject: (projectId: string) => void;
}

// Sample project data to show alongside user projects
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

const ProjectsList = ({ 
  onNewProject, 
  onProjectClick, 
  userProjects, 
  onDeleteProject 
}: ProjectsListProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Combine user projects and mock projects
  const allProjects = [...userProjects, ...mockProjects];
  
  // Filter projects based on category and search term
  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = !category || project.category === category;
    const matchesSearch = !searchTerm || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Projects</h1>
          <p className="text-muted-foreground">Browse and manage your projects</p>
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
        onCategoryChange={setCategory} 
        onSearchChange={setSearchTerm}
        selectedCategory={category}
        searchTerm={searchTerm}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => onProjectClick(project)}
          />
        ))}
        
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No projects found. Try adjusting your filters or create a new project.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
