
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProjectForm from '@/components/ProjectForm';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const { toast } = useToast();

  const handleNewProject = () => {
    setShowNewProjectForm(true);
  };

  const handleCloseForm = () => {
    setShowNewProjectForm(false);
    toast({
      title: "Success!",
      description: "Project form closed. In a real app, this would save the project.",
    });
  };

  const handlePageChange = (page: string) => {
    if (page === 'newProject') {
      handleNewProject();
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />
      
      <div className="flex-1 overflow-y-auto">
        {showNewProjectForm ? (
          <ProjectForm onClose={handleCloseForm} />
        ) : (
          renderContent(activePage, handleNewProject)
        )}
      </div>
    </div>
  );
};

const renderContent = (page: string, onNewProject: () => void) => {
  switch (page) {
    case 'dashboard':
      return <Dashboard onNewProject={onNewProject} />;
    case 'projects':
      return <Dashboard onNewProject={onNewProject} />;
    case 'search':
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold">Search Projects</h1>
          <p className="text-muted-foreground">
            This is a placeholder for the search page. In a full implementation, 
            you would have a more advanced search here.
          </p>
        </div>
      );
    case 'settings':
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            This is a placeholder for the settings page. In a full implementation, 
            you would have user settings and preferences here.
          </p>
        </div>
      );
    default:
      return <Dashboard onNewProject={onNewProject} />;
  }
};

export default Index;
