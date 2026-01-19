'use client';
import { use } from 'react';
import LessonSidebar from '@/components/LessonSidebar';
import { courses } from '@/lib/dummy-data';
import { useRouter } from 'next/navigation';

export default function LearnPage({ params, searchParams }) {
  const { courseId, subjectId } = use(params);
  const router = useRouter();
  
  // Handling searchParams for active video state
  // In a real app we might use useSearchParams(), 
  // but to keep consistent with previous server component logic we can use the prop wrapper
  // OR just rely on state if we want SPA feel. Let's use URL for shareability.
  
  // *Wait*, 'use(searchParams)' hook is not standard for converting server searchParams to client.
  // We need to grab them from window or use `useSearchParams`.
  // Since we are in a Client Component (marked 'use client' for interactivity), we should use `useSearchParams`.
  
  return <LearnPageContent courseId={courseId} subjectId={subjectId} />;
}

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowDownToLine, Bookmark, CircleCheckBig } from 'lucide-react';

function LearnPageContent({ courseId, subjectId }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const course = courses.find(c => c.id === courseId);
  const subject = course?.subjects.find(s => s.id === subjectId);

  const chapterId = searchParams.get('chapter') || (subject?.chapters[0]?.id);
  const partId = searchParams.get('part') || (subject?.chapters[0]?.parts[0]?.id);
  
  if (!course || !subject) return <div>Not Found</div>;

  const currentChapter = subject.chapters.find(c => c.id === chapterId);
  const currentPart = currentChapter?.parts.find(p => p.id === partId);

  const handleLessonSelect = (cid, pid) => {
     router.push(`/learn/${courseId}/${subjectId}?chapter=${cid}&part=${pid}`);
  };

  return (
    <div className="h-screen flex flex-col bg-base-300">
       
       <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <LessonSidebar 
                chapters={subject.chapters}
                currentChapterId={chapterId}
                currentPartId={partId}
                onSelect={handleLessonSelect}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
             <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                   <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                         <span>{subject.title}</span>
                         <span>/</span>
                         <span>{currentChapter?.title}</span>
                      </div>
                      <h1 className="text-2xl font-bold text-dark">{currentPart?.title || 'Select a lesson'}</h1>
                   </div>
                </div>

                {/* Video Player Area */}
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white/50 ring-1 ring-gray-100 relative group">
                   {currentPart?.videoUrl ? (
                      <iframe 
                        src={currentPart.videoUrl} 
                        className="w-full h-full" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">No Video Available</div>
                   )}
                </div>

                {/* Mobile Sidebar - Below Video */}
                <div className="lg:hidden h-[500px] mb-8 border border-base-200 rounded-xl overflow-hidden">
                   <LessonSidebar 
                      chapters={subject.chapters}
                      currentChapterId={chapterId}
                      currentPartId={partId}
                      onSelect={handleLessonSelect}
                   />
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap gap-4 mb-12">
                   <button className="flex-1 py-3 px-6 bg-green-50 text-green-700 font-bold rounded-xl hover:bg-base-content hover:text-base-100 hover:border-base-content flex items-center justify-center gap-2 border border-green-200 transition-colors">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs"><CircleCheckBig /></div>
                      Mark as Completed
                   </button>
                   <button className="flex-1 py-3 px-6 bg-base-300 text-base-content font-bold rounded-xl border border-gray-200 hover:bg-base-content hover:text-base-100 hover:border-base-content flex items-center justify-center gap-2 transition-colors">
                      <span>    <Bookmark /></span> Save Lesson
                   </button>
                   <button className="flex-1 py-3 px-6 bg-base-300 text-base-content font-bold rounded-xl border border-gray-200 hover:bg-base-content hover:text-base-100 hover:border-base-content flex items-center justify-center gap-2 transition-colors">
                      <span> <ArrowDownToLine /></span> Download Notes
                   </button>
                </div>

                {/* Description and Quiz Area */}
                <div className="grid md:grid-cols-3 gap-8">
                   <div className="md:col-span-2">
                      <div className="bg-base-100 p-8 rounded-3xl shadow-sm">
                         <h3 className="text-xl font-bold text-dark mb-4">About this Lesson</h3>
                         <p className="text-gray-500 leading-relaxed mb-6">
                            In this lesson, we will explore the fundamental concepts of {currentPart?.title}. 
                            Understanding this is crucial for mastering the advanced topics in {subject.title}.
                            Make sure to take notes and complete the practice quiz below.
                         </p>
                        
                      </div>
                   </div>

                   <div>
                      <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100">
                         <div className="w-10 h-10 bg-yellow-100 rounded-xl mb-4 flex items-center justify-center text-yellow-600 font-bold text-xl">
                            ?
                         </div>
                         <h4 className="text-lg font-bold text-dark mb-2">Upcoming Quiz</h4>
                         <p className="text-sm text-gray-600 mb-4">
                            Test your knowledge on {currentChapter?.title} basics. Available after completing Part 3.
                         </p>
                      </div>
                   </div>
                </div>

             </div>
          </main>
       </div>
    </div>
  );
}
