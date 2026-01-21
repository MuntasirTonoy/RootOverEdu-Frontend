"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import FreeContentCard from "@/components/FreeContentCard";

export default function FreeTrialPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreeVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/free-videos`,
        );
        setVideos(res.data);
      } catch (error) {
        console.error("Failed to fetch free videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreeVideos();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="py-12 md:py-20">
        <div className="container-custom">
          {/* Header */}
          <header className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 animate-in fade-in slide-in-from-bottom-2">
              <Sparkles size={16} />
              <span>Free Content</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Experience Our Free Lessons
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Explore a selection of our premium content completely for free.
              Start learning today and see why students love our platform.
            </p>
          </header>

          {/* Content Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingAnimation />
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {videos.map((video) => (
                <FreeContentCard key={video._id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface rounded-3xl border border-border">
              <p className="text-xl text-muted-foreground mb-4">
                No free lessons available right now.
              </p>
              <Link href="/" className="text-primary font-bold hover:underline">
                Browse all courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
