"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import Link from 'next/link';
import { Users, BookOpen, Video, Activity } from 'lucide-react';
import { auth } from '@/lib/firebase';

const DashboardOverview = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        totalVideos: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = await auth.currentUser.getIdToken();
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    if (loading) {
        return <div className="p-8 text-center">Loading stats...</div>;
    }

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dashboard/students">
                    <div className="stats shadow w-full bg-base-100 hover:bg-base-200 transition-colors cursor-pointer border border-base-200">
                        <div className="stat p-3">
                            <div className="stat-figure text-primary">
                                <Users size={32} />
                            </div>
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value text-primary">{stats.totalUsers}</div>
                            <div className="stat-desc">Registered students</div>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/manage-courses">
                    <div className="stats shadow w-full bg-base-100 hover:bg-base-200 transition-colors cursor-pointer border border-base-200">
                        <div className="stat p-3">
                            <div className="stat-figure text-secondary">
                                <BookOpen size={32} />
                            </div>
                            <div className="stat-title">Total Courses</div>
                            <div className="stat-value text-secondary">{stats.totalCourses}</div>
                            <div className="stat-desc">Active courses</div>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/upload">
                    <div className="stats shadow w-full bg-base-100 hover:bg-base-200 transition-colors cursor-pointer border border-base-200">
                        <div className="stat p-3">
                            <div className="stat-figure text-accent">
                                <Video size={32} />
                            </div>
                            <div className="stat-title">Total Videos</div>
                            <div className="stat-value text-accent">{stats.totalVideos}</div>
                            <div className="stat-desc">Uploaded content</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardOverview;
