import React from "react";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";

interface PaginationProps {
   totalItems: number;
   perPage: number;
   currentPage: number;
   onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, perPage, currentPage, onChange }) => {
   const totalPages: number = Math.ceil(totalItems / perPage);
   // const [currentPage, setCurrentPage] = useState<number>(1);

   const visiblePageRange: number = 1; // Number of visible page numbers excluding ellipsis

   const generatePageNumbers = (): (number | string)[] => {
      const pageNumbers: (number | string)[] = [];

      if (totalPages <= visiblePageRange * 2 + 1) {
         // Display all pages if total pages are less than or equal to visiblePageRange
         for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
         }
      } else {
         // Display a subset of pages with ellipsis

         // Helper function to add dots
         const addEllipsis = (): void => {
            pageNumbers.push("...");
         };

         let startPage: number = Math.max(1, currentPage - visiblePageRange);
         let endPage: number = Math.min(totalPages, startPage + visiblePageRange * 2);

         if (currentPage < visiblePageRange + 1) {
            endPage = visiblePageRange * 2 + 1;
         } else if (currentPage > totalPages - visiblePageRange) {
            startPage = totalPages - visiblePageRange * 2;
         }

         if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
               addEllipsis();
            }
         }

         for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
         }

         if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
               addEllipsis();
            }
            pageNumbers.push(totalPages);
         }
      }

      return pageNumbers;
   };
   const handlePageChange = (page: number): void => {
      // setCurrentPage(page);
      onChange(page);
   };
   if (totalPages === 0) {
      return null;
   }
   if (totalPages === 1) {
      return null;
   }
   return (
      <div className="flex flex-nowrap items-center gap-3">
         {currentPage > 1 && (
            <button
               disabled={currentPage === 1}
               onClick={() => handlePageChange(currentPage - 1)}
               className={` w-7 h-7 hover:bg-slate-200 border-0 hover:border border-slate-400 flex justify-center items-center rounded`}>
               <HiOutlineChevronLeft size={20} />
            </button>
         )}
         <ul className="flex nowrap items-center gap-1 m-0">
            {generatePageNumbers().map((page, index) => {
               if (page === '...') {
                  return <li
                     role="button"
                     key={index}
                     className={`min-w-[28px] h-7 flex items-center justify-center rounded`}>
                     {page}
                  </li>
               } else {
                  return <li
                     role="button"
                     key={index}
                     onClick={() => handlePageChange(page as number)}
                     className={`min-w-[28px] h-7 flex items-center justify-center border border-slate-400 rounded ${currentPage === page ? "bg-slate-200" : ""} `}>
                     {page}
                  </li>
               }
            })}
         </ul>
         {currentPage < totalPages && (
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="w-7 h-7 hover:bg-slate-200 border-0 hover:border border-slate-400 flex justify-center items-center rounded">
               <HiOutlineChevronRight size={20} />
            </button>
         )}
      </div>
   );
};

export default Pagination;
