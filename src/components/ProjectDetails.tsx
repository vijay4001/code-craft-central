
import React from 'react';
import { Project } from './ProjectCard';
import { ArrowLeft, ExternalLink, Heart, Eye, Calendar, Code } from 'lucide-react';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetails = ({ project, onBack }: ProjectDetailsProps) => {
  return (
    <div className="p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-sm mb-6 hover:text-codepurple transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to projects
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="mb-4">
              This is a detailed view of the project. In a complete implementation, 
              this would show a comprehensive description, project goals, challenges, 
              and outcomes.
            </p>
            
            {project.link && (
              <a 
                href={project.link}
                className="flex items-center text-codeblue hover:text-codeblue-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} className="mr-1" />
                View live project
              </a>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-medium mb-4">Project Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Category</p>
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm inline-block">
                  {project.category}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <div key={tech} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Heart size={18} />
                  <span>{project.likes} likes</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye size={18} />
                  <span>{project.views} views</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Additional Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2 text-codepurple" />
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">April 1, 2025</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Code size={18} className="mr-2 text-codepurple" />
                <div>
                  <p className="text-sm text-muted-foreground">Lines of Code</p>
                  <p className="font-medium">4,328</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
