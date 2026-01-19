'use client';
import { useState } from 'react';
import { courses } from '@/lib/dummy-data';
import SubjectCard from '@/components/SubjectCard';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CoursePage({ params }) {
  // Unwrapping params for Next.js 15+ compatibility (normally would be async in server component, but we need client state)
  // Converting to Client Component means we can't easily async await params props directly in the same way without `use`.
  // However, simpler to just map data for now. In Next 15, we might need `use(params)`.
  // Let's assume standard behavior for now or standard prop passing. 
  // *Wait*, params is a Promise in Next 15.
  // We can make a wrapper or just use `use` hook if available, or simpler: just use `use` from React.
  
  // Actually, easiest fix for Client Component taking async params:
  // Render a Server Component wrapper that awaits params and passes to this Client Component.
  // But to keep it simple and as I am editing the page file:
  return <CourseDetailContent params={params} />;
}

// Sub-component to handle the logic
import { use } from 'react';

function CourseDetailContent({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const course = courses.find((c) => c.id === id);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  if (!course) {
    notFound();
  }

  const toggleSubject = (subjectId) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const totalAmount = selectedSubjects.reduce((total, subjectId) => {
    const subject = course.subjects.find(s => s.id === subjectId);
    return total + (subject ? subject.price : 0);
  }, 0);

  const handleProceed = () => {
     if (selectedSubjects.length === 0) return;
     const query = selectedSubjects.join(',');
     router.push(`/checkout?courseId=${id}&subjects=${query}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-300">
      
      <main className="flex-1 py-12">
        <div className="container-custom relative">
          <Link href="/" className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 text-gray-400">
             ✕
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-dark mb-3">{course.title}</h1>
            <p className="text-lg text-gray-500">
              Build your personalized mathematics curriculum. Choose the subjects you wish to master.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {course.subjects.map((subject) => (
              <SubjectCard 
                key={subject.id} 
                courseId={id}
                subject={subject} 
                isSelected={selectedSubjects.includes(subject.id)}
                onClick={() => toggleSubject(subject.id)}
              />
            ))}
          </div>

        </div>
      </main>

      {/* Bottom Sticky Payment Bar */}
      <div className="fixed bottom-20 bg-primary-foreground left-0 right-0 bg-base-100  p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <div className="container-custom flex justify-between items-center">
            <div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Total Amount</p>
              <h3 className="text-3xl font-extrabold text-primary">{totalAmount} TK</h3>
            </div>

            <button 
              onClick={handleProceed}
              disabled={selectedSubjects.length === 0}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all
                ${selectedSubjects.length > 0 
                  ? 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              Proceed to Pay
            </button>
         </div>
      </div>
    </div>
  );
}
