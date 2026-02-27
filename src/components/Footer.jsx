// import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-4 md:py-6 mt-auto transition-colors duration-300">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6">
        {/* Logo + Title + Version badge (mobile only) */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">
            <span className="text-white">R</span>
          </div>
          <span className="font-bold text-foreground">Root Over Education</span>
          {/* Version badge — visible only on mobile, inline with title */}
          <span className="md:hidden text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 ml-1">
            v2A.26
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <span>In association with</span>
          <a
            href="https://antigravity.google/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full hover:border-primary/50 transition-colors group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 110 110"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:-translate-y-0.5 transition-transform duration-300 text-foreground"
            >
              <path
                d="M89.6992 93.695C94.3659 97.195 101.366 94.8617 94.9492 88.445C75.6992 69.7783 79.7825 18.445 55.8659 18.445C31.9492 18.445 36.0325 69.7783 16.7825 88.445C9.78251 95.445 17.3658 97.195 22.0325 93.695C40.1159 81.445 38.9492 59.8617 55.8659 59.8617C72.7825 59.8617 71.6159 81.445 89.6992 93.695Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-bold text-foreground">
              Google AntiGravity
            </span>
          </a>
        </div>

        {/* Copyright + Version badge (desktop only) */}
        <div className="hidden md:flex flex-col items-end gap-1">
          <p className="text-sm text-muted-foreground/80 text-right">
            &copy; 2026 Root Over Education. All rights reserved.
          </p>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
            v2A.26
          </span>
        </div>

        {/* Copyright text only (mobile — no version badge, it's with the title) */}
        <p className="md:hidden text-xs text-muted-foreground/70 text-center">
          &copy; 2026 Root Over Education. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
