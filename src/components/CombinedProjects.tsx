
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, MessageSquare, X } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'pending' | 'completed' | 'rejected';
  comments: Comment[];
  dueDate: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface TeamProject {
  id: string;
  title: string;
  description: string;
  image: string;
  members: TeamMember[];
  tasks: Task[];
  progress: number;
}

// Mock data for team projects
const mockTeamProjects: TeamProject[] = [
  {
    id: '1',
    title: 'Marketing Website Redesign',
    description: 'Collaborative project to redesign the company marketing website',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    members: [
      { id: '1', name: 'Alex Johnson', avatar: 'A', role: 'Project Lead' },
      { id: '2', name: 'Taylor Swift', avatar: 'T', role: 'Designer' },
      { id: '3', name: 'Sam Lee', avatar: 'S', role: 'Developer' }
    ],
    tasks: [
      {
        id: '1',
        title: 'Create wireframes',
        description: 'Design initial wireframes for homepage and product pages',
        assignedTo: '2',
        status: 'completed',
        comments: [
          { id: '1', author: '1', text: 'Looking good! Can you add more details to the hero section?', timestamp: '2025-03-30T14:30:00' }
        ],
        dueDate: '2025-04-02'
      },
      {
        id: '2',
        title: 'Implement responsive design',
        description: 'Make sure the website works well on all devices',
        assignedTo: '3',
        status: 'pending',
        comments: [],
        dueDate: '2025-04-10'
      }
    ],
    progress: 35
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'Team project to build an e-commerce platform with inventory management',
    image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?q=80&w=2070&auto=format&fit=crop',
    members: [
      { id: '1', name: 'Alex Johnson', avatar: 'A', role: 'Backend Developer' },
      { id: '4', name: 'Jamie Davis', avatar: 'J', role: 'Frontend Developer' },
      { id: '5', name: 'Morgan Chen', avatar: 'M', role: 'UX Designer' }
    ],
    tasks: [
      {
        id: '3',
        title: 'Set up payment gateway',
        description: 'Integrate Stripe for payment processing',
        assignedTo: '1',
        status: 'pending',
        comments: [],
        dueDate: '2025-04-15'
      },
      {
        id: '4',
        title: 'Design checkout flow',
        description: 'Create a seamless checkout experience',
        assignedTo: '5',
        status: 'rejected',
        comments: [
          { id: '2', author: '4', text: 'This needs more work, the user flow is confusing', timestamp: '2025-04-01T09:15:00' }
        ],
        dueDate: '2025-04-05'
      }
    ],
    progress: 42
  }
];

const CombinedProjects = () => {
  const [projects] = useState<TeamProject[]>(mockTeamProjects);
  const [selectedProject, setSelectedProject] = useState<TeamProject | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleProjectSelect = (project: TeamProject) => {
    setSelectedProject(project);
    setSelectedTask(null);
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleStatusChange = (taskId: string, status: 'pending' | 'completed' | 'rejected') => {
    if (!selectedProject) return;
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status };
          }
          return task;
        });
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    
    // In a real app, this would update the state and backend
    console.log('Updated projects:', updatedProjects);
    
    // Update the selected project
    const updatedProject = updatedProjects.find(p => p.id === selectedProject.id);
    if (updatedProject) {
      setSelectedProject(updatedProject);
      setSelectedTask(updatedProject.tasks.find(t => t.id === taskId) || null);
    }
  };
  
  const handleAddComment = () => {
    if (!selectedProject || !selectedTask || !commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: '1', // Current user ID (would be dynamic in a real app)
      text: commentText,
      timestamp: new Date().toISOString()
    };
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === selectedTask.id) {
            return { 
              ...task, 
              comments: [...task.comments, newComment] 
            };
          }
          return task;
        });
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    
    // In a real app, this would update the state and backend
    console.log('Updated projects with comment:', updatedProjects);
    
    // Update the selected project and task
    const updatedProject = updatedProjects.find(p => p.id === selectedProject.id);
    if (updatedProject) {
      setSelectedProject(updatedProject);
      setSelectedTask(updatedProject.tasks.find(t => t.id === selectedTask.id) || null);
      setCommentText('');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Combined Projects</h1>
        <p className="text-muted-foreground">Collaborate with team members on shared projects</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Team Projects</h2>
          {projects.map(project => (
            <Card 
              key={project.id} 
              className={`mb-4 cursor-pointer transition-all hover:shadow-md ${selectedProject?.id === project.id ? 'ring-2 ring-codepurple' : ''}`}
              onClick={() => handleProjectSelect(project)}
            >
              <CardHeader className="pb-2">
                <div className="relative h-32 -mx-6 -mt-6 mb-2 overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-codepurple h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{project.progress}%</span>
                </div>
                <div className="flex -space-x-2 overflow-hidden mt-3">
                  {project.members.map(member => (
                    <div 
                      key={member.id}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-background bg-codeblue text-white font-medium"
                      title={member.name}
                    >
                      {member.avatar}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Project Details */}
        <div className="lg:col-span-2">
          {selectedProject ? (
            <Tabs defaultValue="tasks">
              <TabsList className="mb-4">
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="members">Team Members</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Clock size={16} className="mr-1" /> Pending
                    </h3>
                    {selectedProject.tasks
                      .filter(task => task.status === 'pending')
                      .map(task => (
                        <Card 
                          key={task.id} 
                          className={`mb-3 cursor-pointer ${selectedTask?.id === task.id ? 'ring-2 ring-codepurple' : ''}`}
                          onClick={() => handleTaskSelect(task)}
                        >
                          <CardHeader className="p-3 pb-1">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 pt-1 pb-0">
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </CardContent>
                          <CardFooter className="p-3 flex justify-between items-center text-xs text-muted-foreground">
                            <div>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            <div className="flex">
                              <MessageSquare size={14} className="mr-1" />
                              {task.comments.length}
                            </div>
                          </CardFooter>
                        </Card>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <Check size={16} className="mr-1" /> Completed
                    </h3>
                    {selectedProject.tasks
                      .filter(task => task.status === 'completed')
                      .map(task => (
                        <Card 
                          key={task.id} 
                          className={`mb-3 cursor-pointer ${selectedTask?.id === task.id ? 'ring-2 ring-codepurple' : ''}`}
                          onClick={() => handleTaskSelect(task)}
                        >
                          <CardHeader className="p-3 pb-1">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 pt-1 pb-0">
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </CardContent>
                          <CardFooter className="p-3 flex justify-between items-center text-xs text-muted-foreground">
                            <div>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            <div className="flex">
                              <MessageSquare size={14} className="mr-1" />
                              {task.comments.length}
                            </div>
                          </CardFooter>
                        </Card>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <X size={16} className="mr-1" /> Rejected
                    </h3>
                    {selectedProject.tasks
                      .filter(task => task.status === 'rejected')
                      .map(task => (
                        <Card 
                          key={task.id} 
                          className={`mb-3 cursor-pointer ${selectedTask?.id === task.id ? 'ring-2 ring-codepurple' : ''}`}
                          onClick={() => handleTaskSelect(task)}
                        >
                          <CardHeader className="p-3 pb-1">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 pt-1 pb-0">
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </CardContent>
                          <CardFooter className="p-3 flex justify-between items-center text-xs text-muted-foreground">
                            <div>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            <div className="flex">
                              <MessageSquare size={14} className="mr-1" />
                              {task.comments.length}
                            </div>
                          </CardFooter>
                        </Card>
                    ))}
                  </div>
                </div>
                
                {selectedTask && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>{selectedTask.title}</CardTitle>
                      <CardDescription>{selectedTask.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Assigned To</p>
                          <div className="flex items-center gap-2">
                            {(() => {
                              const member = selectedProject.members.find(m => m.id === selectedTask.assignedTo);
                              return member ? (
                                <>
                                  <div className="w-8 h-8 rounded-full bg-codeblue flex items-center justify-center text-white font-medium">
                                    {member.avatar}
                                  </div>
                                  <span>{member.name}</span>
                                </>
                              ) : <span>Unassigned</span>;
                            })()}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Due Date</p>
                          <p>{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Status</p>
                          <div className="flex gap-2">
                            <button 
                              className={`px-3 py-1 text-sm rounded-full ${selectedTask.status === 'pending' ? 'bg-amber-500 text-white' : 'bg-secondary text-secondary-foreground'}`}
                              onClick={() => handleStatusChange(selectedTask.id, 'pending')}
                            >
                              Pending
                            </button>
                            <button 
                              className={`px-3 py-1 text-sm rounded-full ${selectedTask.status === 'completed' ? 'bg-green-500 text-white' : 'bg-secondary text-secondary-foreground'}`}
                              onClick={() => handleStatusChange(selectedTask.id, 'completed')}
                            >
                              Completed
                            </button>
                            <button 
                              className={`px-3 py-1 text-sm rounded-full ${selectedTask.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-secondary text-secondary-foreground'}`}
                              onClick={() => handleStatusChange(selectedTask.id, 'rejected')}
                            >
                              Rejected
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Comments ({selectedTask.comments.length})</p>
                          <div className="space-y-3 mt-2">
                            {selectedTask.comments.map(comment => {
                              const author = selectedProject.members.find(m => m.id === comment.author);
                              return (
                                <div key={comment.id} className="flex gap-3">
                                  <div className="w-8 h-8 rounded-full bg-codeblue flex items-center justify-center text-white font-medium shrink-0">
                                    {author?.avatar || '?'}
                                  </div>
                                  <div className="bg-secondary p-3 rounded-lg w-full">
                                    <div className="flex justify-between mb-1">
                                      <span className="font-medium">{author?.name || 'Unknown'}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(comment.timestamp).toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-sm">{comment.text}</p>
                                  </div>
                                </div>
                              );
                            })}
                            
                            <div className="flex gap-3 mt-4">
                              <div className="w-8 h-8 rounded-full bg-codeblue flex items-center justify-center text-white font-medium shrink-0">
                                {selectedProject.members[0].avatar}
                              </div>
                              <div className="w-full">
                                <Textarea 
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  placeholder="Add a comment..."
                                  className="mb-2"
                                />
                                <button 
                                  onClick={handleAddComment}
                                  className="px-4 py-2 bg-codepurple hover:bg-codepurple-dark text-white rounded-md transition-colors"
                                  disabled={!commentText.trim()}
                                >
                                  Add Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="members">
                <h3 className="text-xl font-semibold mb-4">Team Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.members.map(member => (
                    <Card key={member.id} className="flex items-center p-4">
                      <div className="w-12 h-12 rounded-full bg-codeblue flex items-center justify-center text-white font-medium mr-4">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted/20 rounded-lg border border-dashed">
              <p className="text-muted-foreground">Select a project to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinedProjects;
