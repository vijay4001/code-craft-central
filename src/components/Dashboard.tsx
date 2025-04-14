import React from 'react';
import ProjectCard, { Project } from './ProjectCard';
import { PlusSquare, Workflow, Clock, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

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

const categoryData = [
  { name: 'Web Dev', count: 12 },
  { name: 'AI/ML', count: 8 },
  { name: 'Mobile', count: 6 },
  { name: 'Data', count: 5 },
  { name: 'DevOps', count: 3 },
  { name: 'Other', count: 2 },
];

const recentActivity = [
  { id: 1, action: 'Added new project', project: 'E-Commerce Platform', time: '2 hours ago' },
  { id: 2, action: 'Updated', project: 'AI Image Generator', time: '1 day ago' },
  { id: 3, action: 'Received 5 likes on', project: 'Food Delivery App', time: '2 days ago' },
  { id: 4, action: 'Shared', project: 'Data Visualization', time: '3 days ago' },
];

interface DashboardProps {
  onNewProject: () => void;
  onProjectClick: (project: Project) => void;
  userProjects: Project[];
  onDeleteProject: (projectId: string) => void;
  onPageChange: (page: string) => void;
}

const Dashboard = ({ 
  onNewProject, 
  onProjectClick, 
  userProjects, 
  onDeleteProject,
  onPageChange
}: DashboardProps) => {
  const allProjects = [...userProjects, ...mockProjects];
  
  const totalProjects = allProjects.length;
  
  const totalViews = allProjects.reduce((sum, project) => sum + project.views, 0);
  const totalLikes = allProjects.reduce((sum, project) => sum + project.likes, 0);
  
  const featuredProjects = allProjects.filter(project => project.featured);
  
  const mostPopularProject = [...allProjects].sort((a, b) => b.likes - a.likes)[0];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Your project metrics and activity at a glance</p>
        </div>
        <button 
          onClick={onNewProject}
          className="flex items-center gap-2 mt-4 sm:mt-0 px-4 py-2 bg-codepurple hover:bg-codepurple-dark text-white rounded-lg transition-colors"
        >
          <PlusSquare size={18} />
          <span>New Project</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card shadow-md rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Projects</p>
              <h3 className="text-2xl font-bold">{totalProjects}</h3>
            </div>
            <div className="bg-codepurple/10 p-3 rounded-full">
              <Workflow className="w-6 h-6 text-codepurple" />
            </div>
          </div>
        </div>
        
        <div className="bg-card shadow-md rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Featured Projects</p>
              <h3 className="text-2xl font-bold">{featuredProjects.length}</h3>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-full">
              <Star className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-card shadow-md rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Views</p>
              <h3 className="text-2xl font-bold">{totalViews.toLocaleString()}</h3>
            </div>
            <div className="bg-codeblue/10 p-3 rounded-full">
              <Clock className="w-6 h-6 text-codeblue" />
            </div>
          </div>
        </div>
        
        <div className="bg-card shadow-md rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Likes</p>
              <h3 className="text-2xl font-bold">{totalLikes.toLocaleString()}</h3>
            </div>
            <div className="bg-green-500/10 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card shadow-md rounded-lg p-4 border border-border">
          <h3 className="text-lg font-semibold mb-4">Project Categories</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-card shadow-md rounded-lg p-4 border border-border">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start border-b border-border pb-3 last:border-0">
                <div className="bg-muted rounded-full p-2 mr-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="text-muted-foreground">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.project}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card shadow-md rounded-lg p-4 border border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Featured Projects</h3>
            <button 
              onClick={() => onPageChange('projects')}
              className="text-sm text-codeblue flex items-center"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {featuredProjects.slice(0, 3).map((project) => (
              <div 
                key={project.id} 
                className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                onClick={() => onProjectClick(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{project.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
            {featuredProjects.length === 0 && (
              <p className="text-center py-6 text-muted-foreground">No featured projects yet</p>
            )}
          </div>
        </div>
        
        <div className="bg-card shadow-md rounded-lg p-4 border border-border">
          <h3 className="text-lg font-semibold mb-4">Most Popular Project</h3>
          {mostPopularProject ? (
            <div 
              className="rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onProjectClick(mostPopularProject)}
            >
              <img 
                src={mostPopularProject.image} 
                alt={mostPopularProject.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold mb-1">{mostPopularProject.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{mostPopularProject.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {mostPopularProject.techStack.slice(0, 2).map((tech) => (
                      <span key={tech} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} />
                      <span>{mostPopularProject.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center py-12 text-muted-foreground">No projects available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
