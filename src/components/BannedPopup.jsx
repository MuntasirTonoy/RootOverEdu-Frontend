"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Ban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BannedPopup() {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!loading && user?.isBanned) {
      // Show the popup if the user is banned and we haven't dismissed it this session
      const hasDismissed = sessionStorage.getItem("banned_popup_dismissed");
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }
  }, [user, loading]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("banned_popup_dismissed", "true");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-card w-full max-w-md rounded-2xl p-6 md:p-8 shadow-2xl relative border border-red-500/20 text-center"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:bg-surface p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex justify-center mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-full animate-in zoom-in duration-300">
              <Ban className="text-red-500" size={48} />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-3 text-foreground">
            Account Suspended
          </h2>
          <p className="text-muted-foreground mb-6">
            Your account has been restricted due to a violation of our terms of service. You will not be able to access premium content or your profile.
          </p>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
          >
            I Understand
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
