import React from "react";

function PagenationComponent({
  currentPage,
  totalPages,
  handelNext,
  handelPrevious,
  onPageChange,
}) {
  const handlePageClick = (page) => {
    if (page >= 0 && page < totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className={"pagination flex items-center justify-center gap-3"}>
      <div
        className={`text-sm w-3 cursor-pointer ${
          currentPage === 0 ? "text-gray-400" : ""
        }`}
        onClick={currentPage > 0 ? handelPrevious : null}
      >
        <i className="fas fa-chevron-right"></i>
      </div>

      {Array.from({ length: totalPages }, (_, index) => (
        <div
          key={index}
          className={`text-lg w-5 justify-center text-center cursor-pointer ${
            currentPage === index
              ? "bg-primary-500 text-white"
              : "text-gray-500"
          }`}
          onClick={() => handlePageClick(index)}
        >
          {index + 1}
        </div>
      ))}

      <div
        className={`text-sm w-3 cursor-pointer ${
          currentPage === totalPages - 1 ? "text-gray-400" : ""
        }`}
        onClick={currentPage < totalPages - 1 ? handelNext : null}
      >
        <i className="fas fa-chevron-left"></i>
      </div>
    </div>
  );
}

export default PagenationComponent;
