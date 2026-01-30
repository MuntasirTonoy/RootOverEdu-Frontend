"use client";
import Lottie from "lottie-react";
import animationData from "../../public/empty.json";

export default function EmptyState({ message, description }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="w-48 h-48 md:w-64 md:h-64 mb-4">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">
        {message || "No Data Found"}
      </h3>
      {description && (
        <p className="text-muted-foreground max-w-sm mx-auto">{description}</p>
      )}
    </div>
  );
}
