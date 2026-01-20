"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoveRight, Loader2 } from "lucide-react";
import EnrolledSubjectCard from "@/components/EnrolledSubjectCard";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function MyClasses() {
  const { user, loading: authLoading } = useAuth();
  const [enrolledData, setEnrolledData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      if (
        !user ||
        !user.purchasedSubjects ||
        user.purchasedSubjects.length === 0
      ) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Fetch details for all purchased subjects
        const subjectPromises = user.purchasedSubjects.map(
          (subjectId) =>
            axios
              .get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/subjects/${subjectId}`,
              )
              .then((res) => res.data)
              .catch((err) => null), // Ignore failed fetches
        );

        const subjects = (await Promise.all(subjectPromises)).filter(Boolean);

        // 2. Identify unique Course IDs from the subjects
        const courseIds = [...new Set(subjects.map((s) => s.courseId))];

        // 3. Fetch Course details
        const coursePromises = courseIds.map((courseId) =>
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`)
            .then((res) => res.data)
            .catch((err) => null),
        );

        const courses = (await Promise.all(coursePromises)).filter(Boolean);

        // 4. Group groups by Course
        const grouped = courses.map((course) => {
          const courseSubjects = subjects.filter(
            (s) => s.courseId === course._id || s.courseId === course.id,
          );
          return {
            ...course,
            subjects: courseSubjects,
          };
        });

        setEnrolledData(grouped);
      } catch (error) {
        console.error("Failed to fetch enrolled classes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (user) {
        fetchEnrolledClasses();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  return (
    <AuthGuard forbiddenRoles={["admin"]}>
      <div className="min-h-screen flex flex-col bg-base-300 transition-colors duration-300">
        <div className="flex-1 py-12">
          <div className="container-custom">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4 text-base-content">
                My Classes
              </h1>
              <p className="text-base-content/70">
                Manage and access your enrolled subjects
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={40} />
              </div>
            ) : enrolledData.length > 0 ? (
              <div className="space-y-16">
                {enrolledData.map((course) => (
                  <div key={course.id || course._id}>
                    {/* Course Title Section */}
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b-3 border-b-base-content/20">
                      <div className="w-2 h-10 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-base-content">
                          {course.title}
                        </h2>
                        <p className="text-sm font-medium text-base-content/60 mt-1">
                          {course.department} • {course.yearLevel}
                        </p>
                      </div>
                      <span className="ml-auto px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase tracking-wider">
                        {course.subjects?.length || 0} Subjects
                      </span>
                    </div>

                    {/* Subjects Grid */}
                    {course.subjects && course.subjects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {course.subjects.map((subject) => (
                          <EnrolledSubjectCard
                            key={subject._id || subject.id}
                            subject={subject}
                            courseId={course._id || course.id}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-base-content/70 italic">
                        No specific subjects listed for this course yet.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-base-200 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4 text-base-content">
                  No classes enrolled
                </h3>
                <p className="mb-8 text-base-content/70">
                  You haven't purchased any courses yet.
                </p>
                <Link href="/" className="btn btn-primary rounded-xl px-8">
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
