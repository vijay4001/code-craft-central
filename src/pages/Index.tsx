
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProjectForm from '@/components/ProjectForm';
import CombinedProjects from '@/components/CombinedProjects';
import ProjectDetails from '@/components/ProjectDetails';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Project } from '@/components/ProjectCard';

const Index = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // When returning from settings, ensure proper page display
  useEffect(() => {
    // Reset to dashboard if coming from another route
    if (location.state?.returnTo) {
      setActivePage(location.state.returnTo);
    }
    
    // Load saved projects from localStorage
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, [location]);
  
  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  const handleNewProject = () => {
    setShowNewProjectForm(true);
    setActivePage('newProject');
  };

  const handleCloseForm = (newProject?: Project) => {
    setShowNewProjectForm(false);
    
    if (newProject) {
      // Add the new project to the list
      const updatedProjects = [newProject, ...projects];
      setProjects(updatedProjects);
      
      toast({
        title: "Project Created!",
        description: "Your new project has been successfully added.",
        className: "border-green-500 border-2 bg-green-50 dark:bg-green-950/30 shadow-lg shadow-green-500/20",
        duration: 3000,
      });
      
      setActivePage('dashboard');
    } else {
      toast({
        title: "Cancelled",
        description: "Project creation was cancelled.",
        className: "border-yellow-500 border-2 bg-yellow-50 dark:bg-yellow-950/30 shadow-lg shadow-yellow-500/20",
        duration: 3000,
      });
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setActivePage('projectDetails');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActivePage('dashboard');
  };
  
  const handleDeleteProject = (projectId: string) => {
    // Remove the project from the list
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    
    // If the deleted project was selected, clear the selection
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
      setActivePage('dashboard');
    }
    
    toast({
      title: "Project Deleted",
      description: "The project has been removed from your list.",
      className: "border-red-500 border-2 bg-red-50 dark:bg-red-950/30 shadow-lg shadow-red-500/20",
      duration: 3000,
    });
  };

  const handlePageChange = (page: string) => {
    if (page === 'newProject') {
      handleNewProject();
    } else if (page === 'settings') {
      // Store current page before navigating to settings
      navigate('/settings', { state: { returnTo: activePage } });
    } else {
      setActivePage(page);
      setShowNewProjectForm(false); // Close form if open
      setSelectedProject(null); // Clear selected project when changing pages
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />
      
      <div className="flex-1 overflow-y-auto">
        {showNewProjectForm ? (
          <ProjectForm onClose={handleCloseForm} />
        ) : selectedProject ? (
          <ProjectDetails 
            project={selectedProject} 
            onBack={handleBackToProjects} 
            onDelete={handleDeleteProject}
          />
        ) : (
          renderContent(activePage, handleNewProject, handleProjectClick, projects, handleDeleteProject)
        )}
      </div>
    </div>
  );
};

const renderContent = (
  page: string, 
  onNewProject: () => void, 
  onProjectClick: (project: Project) => void,
  userProjects: Project[],
  onDeleteProject: (projectId: string) => void
) => {
  switch (page) {
    case 'dashboard':
      return <Dashboard 
        onNewProject={onNewProject} 
        onProjectClick={onProjectClick} 
        userProjects={userProjects} 
        onDeleteProject={onDeleteProject}
      />;
    case 'projects':
      return <Dashboard 
        onNewProject={onNewProject} 
        onProjectClick={onProjectClick} 
        userProjects={userProjects} 
        onDeleteProject={onDeleteProject}
      />;
    case 'combined':
      return <CombinedProjects />;
    default:
      return <Dashboard 
        onNewProject={onNewProject} 
        onProjectClick={onProjectClick} 
        userProjects={userProjects} 
        onDeleteProject={onDeleteProject}
      />;
  }
};

export default Index;
