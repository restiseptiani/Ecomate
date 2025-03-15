import React from 'react';

const Pagination = ({ 
    currentPage, 
    totalPages,
    onPageChange 
}) => {
    // Generate page numbers to display
    const generatePageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            // If total pages are less or equal to max pages to show, show all
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        // Logic for showing pages around current page
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        
        // Adjust if we're near the end
        if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }
        
        // Generate page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    return (
        <div className="flex w-full p-6 h-[86px] items-center justify-between gap-[10px] rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] mb-20 mt-10">
            {/* Previous Button */}
            <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center text-white bg-primary hover:bg-green-600 transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Previous"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Page Number Buttons */}
            <div className="flex items-center gap-x-2">
                {generatePageNumbers().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        type="button"
                        className={`min-h-[38px] min-w-[38px] flex justify-center items-center hover:bg-primary hover:text-white transition-all duration-300 rounded-full focus:outline-none 
                            ${currentPage === pageNumber 
                                ? 'bg-primary text-white' 
                                : 'text-neutral-800 bg-white border border-neutral-300'}`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center text-white bg-primary hover:bg-green-600 transition-all duration-300 rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;