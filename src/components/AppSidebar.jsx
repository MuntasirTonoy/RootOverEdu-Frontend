"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Video, Users, LayoutDashboard } from 'lucide-react';

const AppSidebar = () => {
    const pathname = usePathname();

    const links = [
        { name: 'Overview', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Courses', href: '/dashboard/manage-courses', icon: <BookOpen size={20} /> },
        { name: 'Manage Videos', href: '/dashboard/upload', icon: <Video size={20} /> },
        { name: 'Students', href: '/dashboard/students', icon: <Users size={20} /> },
    ];

    return (
        <aside className="w-64 bg-background border-r border-border h-[calc(100vh-5rem)] sticky top-20 hidden lg:block overflow-y-auto">
            <div className="p-4 space-y-2">
                {links.map((link, index) => {
                    const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                    return (
                        <div key={index}>
                            <Link 
                                href={link.href} 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                    isActive 
                                    ? "bg-primary/10 text-primary hover:bg-primary/20 border-l-4 border-primary" 
                                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                                }`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default AppSidebar;
