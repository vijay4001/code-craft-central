
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

// Create a simple context for user data that will be available across components
interface UserData {
  username: string;
  email: string;
}

// Create a global variable for user data (in a real app, this would use Context or Redux)
let globalUserData: UserData = {
  username: 'User Name',
  email: 'user@example.com'
};

// Export the function to get user data from other components
export const getUserData = (): UserData => {
  return globalUserData;
};

// Export function to update user data
export const updateUserData = (data: Partial<UserData>) => {
  globalUserData = { ...globalUserData, ...data };
};

const SettingsPage = () => {
  const [username, setUsername] = useState(globalUserData.username);
  const [email, setEmail] = useState(globalUserData.email);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || 'dashboard';

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update global user data
    updateUserData({ username, email });
    
    // Show success toast with green styling
    toast({
      title: "Settings saved",
      description: "Your profile has been updated successfully.",
      className: "border-green-500 border-2 bg-green-50 dark:bg-green-950/30 shadow-lg shadow-green-500/20",
    });

    // Navigate back to the previous page
    navigate('/', { state: { returnTo } });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activePage="settings" onPageChange={() => {}} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <div className="max-w-xl">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User size={24} />
                Personal Information
              </h2>
              
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-background dark:bg-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full bg-background dark:bg-gray-800"
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-codepurple hover:bg-codepurple-dark text-white rounded-md flex items-center gap-2 transition-colors border-2 border-transparent hover:border-green-400 shadow-md hover:shadow-green-400/20"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
