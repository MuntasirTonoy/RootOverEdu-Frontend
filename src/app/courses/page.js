"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "@/components/CourseCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import EmptyState from "@/components/EmptyState";
import { BookOpen } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
        );
        const mappedCourses = res.data.map((course) => ({
          id: course._id,
          title: course.title,
          shortDescription: `${course.department} - ${course.yearLevel}`,
          price: 0,
          offerPrice: 0,
          coverImage: course.thumbnail,
          tags: [course.yearLevel],
          features: [],
          subjects: course.subjects || [],
        }));
        setCourses(mappedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="py-12 md:py-20">
        <div className="container-custom">
          {/* Header */}
          <header className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 animate-in fade-in slide-in-from-bottom-2">
              <BookOpen size={16} />
              <span>All Courses</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Explore Our Courses
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Discover comprehensive learning paths designed to help you master
              science subjects and excel in your academic journey.
            </p>
          </header>

          {/* Courses Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingAnimation />
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <EmptyState
              message="No Courses Available"
              description="We're working on adding new courses. Please check back soon!"
            />
          )}
        </div>
      </div>
    </div>
  );
}
