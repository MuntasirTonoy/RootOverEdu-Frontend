import { courses } from '@/lib/dummy-data';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import EnrolledSubjectCard from '@/components/EnrolledSubjectCard';

export default function MyClasses() {
  // Mock logic: Assume "Math 1st Year" and "Math 2nd Year" are purchased courses.
  const purchasedCourseIds = ['math-1st', 'math-2nd'];
  
  // Find the purchased course(s)
  const myCourses = courses.filter(course => purchasedCourseIds.includes(course.id));

  return (
    <div className="min-h-screen flex flex-col bg-base-300 transition-colors duration-300">
      
      <div className="flex-1 py-12">
        <div className="container-custom">
           <div className="mb-12">
             <h1 className="text-4xl font-bold mb-4 text-base-content">My Classes</h1>
             <p className="text-base-content/70">Manage and access your enrolled subjects</p>
           </div>
           
           {myCourses.length > 0 ? (
             <div className="space-y-16">
               {myCourses.map((course) => (
                 <div key={course.id}>
                    {/* Course Title Section */}
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b-3 border-b-base-content/20">
                        <div className="w-2 h-10 bg-primary rounded-full"></div>
                        <h2 className="text-3xl font-bold text-base-content">{course.title}</h2>
                        <span className="ml-auto px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase tracking-wider">
                            {course.subjects?.length || 0} Subjects
                        </span>
                    </div>
                    
                    {/* Subjects Grid with NEW Card Design */}
                    {course.subjects && course.subjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {course.subjects.map((subject) => (
                                <EnrolledSubjectCard 
                                    key={subject.id} 
                                    subject={subject} 
                                    courseId={course.id} 
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-base-content/70 italic">No specific subjects listed for this course yet.</p>
                    )}
                 </div>
               ))}
             </div>
           ) : (
             <div className="text-center py-20 bg-base-200 rounded-3xl">
               <h3 className="text-2xl font-bold mb-4 text-base-content">No classes enrolled</h3>
               <p className="mb-8 text-base-content/70">You haven't purchased any courses yet.</p>
               <Link href="/" className="btn btn-primary rounded-xl px-8">Browse Courses</Link>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
