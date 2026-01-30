import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  // Simple logic to show a range of pages, e.g., 1 2 ... 5 6 7 ... 9 10
  // For now, let's keep it simple: Show all if <= 7, otherwise condensed

  const generatePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Complex pagination logic can be added here if needed
    // For now returning a simplified view
    // Always show 1, current-1, current, current+1, last
    const p = [1];
    if (currentPage > 3) p.push("...");
    if (currentPage > 2) p.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages) p.push(currentPage);
    if (currentPage < totalPages - 1) p.push(currentPage + 1);
    if (currentPage < totalPages - 2) p.push("...");
    if (totalPages !== 1) p.push(totalPages);

    // Remove duplicates just in case logic overlaps
    return [...new Set(p)];
  };

  const pageList = generatePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} />
      </button>

      {pageList.map((page, index) => (
        <button
          key={`${page}-${index}`}
          onClick={() => (typeof page === "number" ? onPageChange(page) : null)}
          disabled={page === "..." || isLoading}
          className={`min-w-[32px] h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-primary text-primary-foreground shadow-md"
              : page === "..."
                ? "cursor-default text-muted-foreground"
                : "border border-border hover:bg-muted text-foreground"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next Page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
