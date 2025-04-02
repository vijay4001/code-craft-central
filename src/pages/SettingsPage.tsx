
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const [username, setUsername] = useState('User Name');
  const [email, setEmail] = useState('user@example.com');
  const { toast } = useToast();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the settings to a database or API
    toast({
      title: "Settings saved",
      description: "Your profile has been updated successfully.",
    });

    // Update the sidebar user info would happen with context in a real app
    // For now, we'll just show a toast
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
                    className="w-full"
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
                    className="w-full"
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-codepurple hover:bg-codepurple-dark text-white rounded-md flex items-center gap-2 transition-colors"
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
