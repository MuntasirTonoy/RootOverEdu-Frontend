'use client';
import { use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { courses } from '@/lib/dummy-data';
import Link from 'next/link';

export default function CheckoutPage({ searchParams }) {
  // Await searchParams in Next.js 15
  return <CheckoutContent searchParams={searchParams} />;
}

function CheckoutContent({ searchParams }) {
  const sp = use(searchParams);
  const courseId = sp?.courseId;
  const subjectIds = sp?.subjects ? sp.subjects.split(',') : [];
  
  const course = courses.find(c => c.id === courseId);
  
  // Calculate totals
  const selectedSubjects = course?.subjects.filter(s => subjectIds.includes(s.id)) || [];
  const subtotal = selectedSubjects.reduce((acc, curr) => acc + curr.price, 0);
  const total = subtotal; // + fees if any

  if (!course) {
      return <div>Invalid Course</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
       <div className="bg-background py-6">
         <div className="container-custom flex justify-between items-center">
            <Link href="/" className="text-sm rounded-full bg-red-500 p-2 text-white absolute right-10 top-30 font-bold text-gray-400 hover:text-foreground">close</Link>
         </div>
       </div>

       <main className="flex-1 container-custom py-12">
          <div className="mb-8">
             <h1 className="text-4xl font-extrabold text-foreground mb-2">Checkout</h1>
             <p className="text-gray-500">Complete your information to enroll in the selected courses.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
             {/* Left Column: Forms */}
             <div className="flex-1 space-y-12">
                
                {/* Billing Info */}
                <section>
                   <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="text-primary">person</span> Billing Information
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-bold text-muted-foreground mb-2">Full Name</label>
                         <input type="text" placeholder="John Doe" className="w-full text-lg p-4 rounded-xl border border-transparent bg-gray-50 dark:bg-surface dark:text-foreground outline-none focus:bg-white dark:focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-muted-foreground mb-2">Email Address</label>
                         <input type="email" placeholder="john@example.com" className="w-full text-lg p-4 rounded-xl border border-transparent bg-gray-50 dark:bg-surface dark:text-foreground outline-none focus:bg-white dark:focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-sm font-bold text-muted-foreground mb-2">Phone Number</label>
                         <div className="flex">
                            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-transparent bg-gray-50 dark:bg-surface text-gray-600 dark:text-muted-foreground font-bold">+880</span>
                            <input type="tel" placeholder="1XXXXXXXXX" className="flex-1 text-lg p-4 rounded-r-xl border border-transparent bg-gray-50 dark:bg-surface dark:text-foreground outline-none focus:bg-white dark:focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                         </div>
                      </div>
                   </div>
                </section>

                {/* Payment Method */}
                <section>
                   <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="text-primary">account_balance_wallet</span> Payment Method
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* bKash */}
                      <label className="cursor-pointer">
                         <input type="radio" name="payment" className="peer sr-only" defaultChecked />
                          <div className="p-4 rounded-xl border-2 border-border dark:border-border peer-checked:border-primary peer-checked:bg-green-50/50 dark:peer-checked:bg-primary/10 transition-all h-full relative">
                             <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-foreground">bKash</span>
                               <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary transition-all" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile Wallet</span>
                         </div>
                      </label>

                      {/* Nagad */}
                      <label className="cursor-pointer">
                         <input type="radio" name="payment" className="peer sr-only" />
                          <div className="p-4 rounded-xl border-2 border-border dark:border-border peer-checked:border-primary peer-checked:bg-green-50/50 dark:peer-checked:bg-primary/10 transition-all h-full relative">
                             <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-foreground">Nagad</span>
                               <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary transition-all" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile Wallet</span>
                         </div>
                      </label>

                       {/* Card */}
                       <label className="cursor-pointer">
                         <input type="radio" name="payment" className="peer sr-only" />
                          <div className="p-4 rounded-xl border-2 border-border dark:border-border peer-checked:border-primary peer-checked:bg-green-50/50 dark:peer-checked:bg-primary/10 transition-all h-full relative">
                             <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-foreground">Card</span>
                               <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary transition-all" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Visa / Master</span>
                         </div>
                      </label>
                   </div>
                </section>
             </div>

             {/* Right Column: Order Summary */}
             <div className="w-full bg-light lg:w-[400px]">
                <div className="bg-card rounded-3xl p-8 border border-border sticky top-24 shadow-sm">
                   <h2 className="text-xl font-bold text-foreground mb-1">Order Summary</h2>
                   <p className="text-sm text-muted-foreground mb-8">{course.title}</p>
                   
                   <div className="space-y-4 mb-8">
                      {selectedSubjects.map(subject => (
                        <div key={subject.id} className="flex justify-between items-start">
                           <div>
                              <p className="font-bold text-foreground">{subject.title}</p>
                              <p className="text-xs text-muted-foreground">Subject Course</p>
                           </div>
                           <div className="text-right">
                              <p className="font-bold text-primary">{subject.price} TK</p>
                              <p className="text-xs text-muted-foreground line-through">{subject.originalPrice} TK</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="border-t border-dashed border-border py-4 space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                         <span>Subtotal</span>
                         <span className="font-bold text-foreground">{subtotal} TK</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                         <span>Processing Fee</span>
                         <span className="font-bold text-foreground">0 TK</span>
                      </div>
                   </div>

                   <div className="flex justify-between items-center mb-8">
                      <span className="text-lg font-bold text-foreground">Total Amount</span>
                      <span className="text-3xl font-extrabold text-primary">{total} TK</span>
                   </div>

                   <button className="w-full py-4 bg-primary text-dark font-bold text-lg rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all flex justify-center items-center gap-2">
                      Pay Now 
                      <span className="material-icons">arrow_forward</span>
                   </button>
                   
                   <p className="text-[10px] text-gray-400 text-center mt-4 font-bold tracking-widest uppercase">
                      Secure payment powered by Root to Nahid
                   </p>
                </div>
             </div>
          </div>
       </main>
    </div>
  );
}
