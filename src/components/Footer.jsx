export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-6 mt-auto transition-colors duration-300">
      <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">
            <span className="text-white">R</span>
          </div>
          <span className="font-bold text-foreground">Root to Nahid</span>
        </div>
        
        <div className="flex gap-8 text-sm text-muted-foreground font-medium">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        
        <p className="text-sm text-muted-foreground/80">
          © 2026 Munatasir Tonoy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
