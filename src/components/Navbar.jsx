"use client";

import Link from 'next/link';
import { Menu, Radical, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path 
    ? "text-primary font-bold" 
    : "text-muted-foreground hover:text-foreground transition-colors";

  return (
    <nav className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container-custom h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all duration-300">
             <Radical size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">Root to Nahid</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className={isActive('/')}>Home</Link>
          <Link href="/about" className={isActive('/about')}>About</Link>
          {user?.role !== 'admin' && (
             <Link href="/my-classes" className={isActive('/my-classes')}>My Classes</Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          
          {user ? (
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-background hover:ring-primary/20 transition-all overflow-hidden"
              >
                <img 
                  alt="Profile" 
                  src={user.photoURL || "https://ui-avatars.com/api/?name=" + (user.displayName || "User") + "&background=random"} 
                  className="w-full h-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 p-2 bg-card border border-border rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-2 border-b border-border/50 mb-2">
                    <p className="font-bold text-sm truncate">{user.displayName || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    {user?.role === 'admin' && (
                      <Link 
                        href="/dashboard/manage-courses" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                    )}
                    <Link 
                      href="/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors ${pathname === '/profile' ? 'bg-primary/10 text-primary' : ''}`}
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <button 
                      onClick={logout} 
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-red-50 text-red-600 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 text-sm font-bold hover:bg-surface rounded-lg transition-colors">
                Login
              </Link>
              <Link href="/signup" className="bg-primary text-black font-bold px-5 py-2 text-sm rounded-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background border-l border-border p-6 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6">
                 <div className="flex flex-col space-y-2">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-surface font-medium text-lg">Home</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-surface font-medium text-lg">About</Link>
                    {user?.role !== 'admin' && (
                        <Link href="/my-classes" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-surface font-medium text-lg">My Classes</Link>
                    )}
                 </div>

                 <div className="border-t border-border pt-6">
                    {user ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 px-4">
                                <img 
                                    src={user.photoURL || "https://ui-avatars.com/api/?name=" + (user.displayName || "User")} 
                                    className="w-10 h-10 rounded-full object-cover" 
                                />
                                <div>
                                    <p className="font-bold">{user.displayName || "User"}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {user?.role === 'admin' && (
                                    <Link href="/dashboard/manage-courses" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface font-medium">Dashboard</Link>
                                )}
                                <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface font-medium">Profile</Link>
                                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 dark:text-red-400 font-medium text-left">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center font-bold hover:bg-surface rounded-xl border border-border">Login</Link>
                            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center font-bold bg-primary text-black rounded-xl hover:bg-primary-hover">Sign Up</Link>
                        </div>
                    )}
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
