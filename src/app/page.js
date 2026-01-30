"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Lottie from "lottie-react";
import heroAnimation from "../../public/hero-student.json";
import LoadingAnimation from "@/components/LoadingAnimation";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import FAQ from "@/components/FAQ";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState(null);
  const scrollContainerRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  // ... (checkScroll and scroll functions remain same, omitted for brevity if I could, but I'll validly retain structure if needed or just insert logic)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScroll(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [courses]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, bannerRes] = await Promise.allSettled([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/config/banner`),
        ]);

        // Handle Courses
        if (coursesRes.status === "fulfilled") {
          const mappedCourses = coursesRes.value.data.map((course) => ({
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
        }

        // Handle Banner
        if (
          bannerRes.status === "fulfilled" &&
          bannerRes.value.data &&
          Object.keys(bannerRes.value.data).length > 0
        ) {
          setBannerData(bannerRes.value.data);
        } else {
          setBannerData({
            title: `Learn Smarter<br/><span className="text-primary">with Root Over Education</span>`,
            subtitle:
              "A next-generation learning platform built to simplify science, strengthen core concepts, and help you achieve real academic excellence. Learn deeply with us.",
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-light dark:bg-gray-950 transition-colors duration-300">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-background pt-12 pb-20 overflow-hidden relative transition-colors duration-300">
          <div className="container-custom relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 max-w-2xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-6"
                >
                  {bannerData?.title ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: bannerData.title.replace(
                          /className="/g,
                          'class="',
                        ), // Simple fix if user types className
                      }}
                    />
                  ) : (
                    <>
                      Learn Smarter
                      <br />
                      <span className="text-primary">
                        with Root Over Education
                      </span>
                    </>
                  )}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed whitespace-pre-wrap"
                >
                  {bannerData?.subtitle ||
                    "A next-generation learning platform built to simplify science, strengthen core concepts, and help you achieve real academic excellence. Learn deeply with us."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <button
                    onClick={() =>
                      document
                        .getElementById("popular-courses")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="px-5 md:px-8 py-4 bg-primary text-primary-foreground font-bold text-md lg:text-lg rounded-md hover:bg-primary-hover transition-all flex items-center gap-2 hover:shadow-primary/25 hover:cursor-pointer hover:-translate-y-1"
                  >
                    Explore Courses
                    <span>↓</span>
                  </button>
                  <Link
                    href="/free-trial"
                    className="px-8 md:px-12 py-4 bg-surface hover:bg-surface-hover text-foreground font-bold text-md lg:text-lg rounded-md border border-border transition-colors flex items-center justify-center hover:-translate-y-1 hover:cursor-pointer"
                  >
                    Free Trial
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -20, 0],
                }}
                transition={{
                  opacity: { duration: 1.2 },
                  scale: { duration: 1.2 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="flex-1 relative w-full aspect-[4/3] max-w-2xl"
              >
                <Lottie animationData={heroAnimation} loop={true} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Courses */}
        <section
          id="popular-courses"
          className="py-12 md:py-20 bg-surface transition-colors duration-300"
        >
          <div className="container-custom">
            <div className="flex flex-col items-center text-center mb-12">
              {/* <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
                Top Rated
              </span> */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                Popular Courses
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl text-balance leading-relaxed">
                Select the right path for your academic success.
              </p>

              {canScroll && (
                <div className="hidden md:flex gap-4 mt-8">
                  <button
                    onClick={() => scroll("left")}
                    className="w-12 h-12 flex items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:shadow-lg active:scale-95 group"
                    aria-label="Scroll left"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="w-12 h-12 flex items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:shadow-lg active:scale-95 group"
                    aria-label="Scroll right"
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            <div
              ref={scrollContainerRef}
              className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 ${!canScroll ? "md:justify-center" : ""}`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {loading ? (
                <div className="w-full flex justify-center py-20">
                  <LoadingAnimation />
                </div>
              ) : courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className="min-w-[300px] md:min-w-[350px] snap-start"
                  >
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-20 text-muted-foreground">
                  No courses available at the moment.
                </div>
              )}
            </div>
          </div>
        </section>

        <FAQ />

        {/* Stats Section */}
        <section className="py-12 md:py-20 bg-background transition-colors duration-300">
          <div className="container-custom">
            <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 transition-colors duration-300">
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                  <CountUp to={5} suffix="000" />
                </h3>
                <p className="font-bold text-muted-foreground text-[10px] md:text-xs tracking-widest uppercase">
                  Students
                </p>
              </div>
              <div className="text-center border-l border-border/50">
                <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                  <CountUp to={48} suffix="00" />
                </h3>
                <p className="font-bold text-muted-foreground text-[10px] md:text-xs tracking-widest uppercase">
                  videos
                </p>
              </div>
              <div className="text-center lg:border-l border-border/50">
                <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                  <CountUp to={99} suffix="%" />
                </h3>
                <p className="font-bold text-muted-foreground text-[10px] md:text-xs tracking-widest uppercase">
                  Success Rate
                </p>
              </div>
              <div className="text-center border-l border-border/50">
                <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                  <CountUp to={24} suffix="/7" />
                </h3>
                <p className="font-bold text-muted-foreground text-[10px] md:text-xs tracking-widest uppercase">
                  Support
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
