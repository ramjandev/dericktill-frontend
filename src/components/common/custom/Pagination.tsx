import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const left = Math.max(currentPage - 1, 2);
    const right = Math.min(currentPage + 1, totalPages - 1);

    pages.push(1);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push("...");

    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1 text-sm rounded-md disabled:opacity-40 hover:bg-gray-100 cursor-pointer text-[#09090B] bg-white"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-sm text-white">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page as number)}
            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
              currentPage === page
                ? "bg-white border border-[#E4E4E7] text-[#09090B]"
                : " text-white"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1 text-sm rounded-md disabled:opacity-40 hover:bg-gray-100 cursor-pointer text-[#09090B] bg-white"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
