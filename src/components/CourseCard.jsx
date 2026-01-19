import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <div className="group relative bg-card rounded-3xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col h-full overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100 duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-1">{course.shortDescription}</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-8 p-4 bg-surface rounded-2xl flex items-center justify-between border border-border group-hover:border-primary/20 transition-colors">
           <div>
             <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-primary">৳{course.offerPrice}</span>
                <span className="text-sm text-muted-foreground/50 line-through font-bold">৳{course.price}</span>
             </div>
           </div>
           {/* Discount Badge */}
           <div className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded">
              {Math.round(((course.price - course.offerPrice) / course.price) * 100)}% OFF
           </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8 flex-grow">
          {course.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary stroke-[3]" />
              </div>
              <span className="text-sm text-muted-foreground font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action */}
        <Link 
          href={`/course/${course.id}`}
          className="relative w-full py-4 bg-foreground text-background font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-primary/30 mt-auto flex items-center justify-center gap-2 group/btn overflow-hidden"
        >
          <span className="relative z-10">Enroll Now</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
