
import React from 'react';
import { Heart, Eye, ExternalLink, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  likes: number;
  views: number;
  featured?: boolean;
  link?: string;
};

const ProjectCard = ({ 
  project,
  onClick
}: { 
  project: Project;
  onClick?: () => void;
}) => {
  return (
    <div 
      className="bg-card rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer hover:translate-y-[-5px] animate-fade-in"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.featured && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <Star size={12} />
              Featured
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-bold text-lg">{project.title}</h3>
          <p className="text-white/80 text-sm truncate">{project.description}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            categoryColors[project.category] || "bg-gray-200 text-gray-800"
          )}>
            {project.category}
          </span>
          {project.techStack.slice(0, 2).map((tech) => (
            <span key={tech} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
              {tech}
            </span>
          ))}
          {project.techStack.length > 2 && (
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
              +{project.techStack.length - 2}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Heart size={14} />
              <span>{project.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Eye size={14} />
              <span>{project.views}</span>
            </div>
          </div>
          
          {project.link && (
            <a 
              href={project.link}
              onClick={(e) => e.stopPropagation()}
              className="text-codeblue hover:text-codeblue-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Colors for different categories
const categoryColors = {
  'Web Development': 'bg-codeblue text-white',
  'App Development': 'bg-codepurple text-white',
  'AI/ML': 'bg-codeindigo text-white',
  'Data Science': 'bg-emerald-500 text-white',
  'DevOps': 'bg-amber-500 text-white',
  'Blockchain': 'bg-rose-500 text-white',
};

export default ProjectCard;
