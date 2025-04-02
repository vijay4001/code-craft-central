
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProjectForm from '@/components/ProjectForm';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const Index = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // When returning from settings, ensure proper page display
  useEffect(() => {
    // Reset to dashboard if coming from another route
    if (location.state?.returnTo) {
      setActivePage(location.state.returnTo);
    }
  }, [location]);

  const handleNewProject = () => {
    setShowNewProjectForm(true);
  };

  const handleCloseForm = () => {
    setShowNewProjectForm(false);
    toast({
      title: "Success!",
      description: "Project form closed. In a real app, this would save the project.",
      className: "border-green-500 border-2 bg-green-50 dark:bg-green-950/30 shadow-lg shadow-green-500/20",
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
    default:
      return <Dashboard onNewProject={onNewProject} />;
  }
};

export default Index;
