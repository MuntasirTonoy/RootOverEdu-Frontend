"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, User, Mail, Lock, Camera, Save, X, ChevronDown } from 'lucide-react';

const AVATARS = [
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Zoe",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Bella",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Shadow",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Ginger",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Midnight"
];

export default function ProfilePage() {
  const { user, loading, updateUserProfile, updateUserPassword } = useAuth();
  const router = useRouter();
  
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState(AVATARS[0]);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || AVATARS[0]);
    }
  }, [user, loading, router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateUserProfile({ displayName, photoURL });
      
      if (newPassword) {
        await updateUserPassword(newPassword);
      }

      toast.success('Profile updated successfully!');
      setNewPassword(''); // Clear password field for security
      setShowPasswordChange(false);
    } catch (error) {
      toast.error('Failed to update profile: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSelectAvatar = (url) => {
    setPhotoURL(url);
    setShowAvatarModal(false);
  };

  if (loading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="container-custom pt-12 pb-24 min-h-[80vh]">
      <div className="max-w-4xl mx-auto my-10 space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="bg-card rounded-3xl shadow-sm border border-border h-fit p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative group mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 ring-offset-card">
                  <img 
                    src={photoURL || AVATARS[0]} 
                    alt="Profile" 
                    className="w-full h-full object-cover bg-surface"
                  />
                </div>
                <button 
                  onClick={() => setShowAvatarModal(true)}
                  className="absolute bottom-0 right-0 rounded-full p-2.5 bg-background border border-border text-primary hover:bg-primary hover:text-white transition-all shadow-lg"
                >
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-foreground mt-2">{user.displayName || 'User'}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 bg-card rounded-3xl shadow-sm border border-border p-8">
            <div className="">
              <h3 className="text-xl font-bold text-foreground mb-6">Account Details</h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" /> Display Name
                  </label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface border  border-border  focus:border-primary focus:bg-background outline-none transition-all placeholder:text-muted-foreground/50"
                    placeholder="Your Name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail size={16} className="text-muted-foreground" /> Email
                  </label>
                  <input 
                    type="email" 
                    value={user.email} 
                    disabled 
                    className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-border text-muted-foreground cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground pl-1">Email cannot be changed</p>
                </div>

                <div className="py-2">
                  <div className="border border-border rounded-xl overflow-hidden">
                    <button 
                      type="button"
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-surface transition-colors"
                    >
                      <div className="flex items-center gap-2 font-medium text-foreground">
                        <Lock size={16} className="text-muted-foreground" /> Change Password
                      </div>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${showPasswordChange ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showPasswordChange && (
                      <div className="p-4 bg-surface/30 border-t border-border animate-in slide-in-from-top-2">
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                          placeholder="New Password"
                        />
                        <p className="text-xs text-orange-500 mt-2 pl-1">Note: Requires recent login. If it fails, please logout and login again.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4 mb-10">
                  <button 
                    type="submit" 
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-foreground">Choose an Avatar</h3>
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {AVATARS.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAvatar(avatar)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${photoURL === avatar ? 'border-primary ring-2 ring-primary/20 scale-95' : 'border-transparent hover:border-border hover:scale-105'}`}
                >
                  <img 
                    src={avatar} 
                    alt={`Avatar ${index + 1}`} 
                    className="w-full h-full object-cover bg-surface"
                  />
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="px-6 py-2 rounded-xl font-medium text-foreground hover:bg-surface transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
