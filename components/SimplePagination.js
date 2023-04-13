import React from "react";
export const SimplePagination = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
  fetchNewOutPut
}) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className=" p-4 bg-white">
      <ul className="flex justify-center items-center transition-all	">
        {pages.map((page, i) => (
          <li key={page} className="ml-3 first:ml-0">
            <a
              onClick={() => onPageChange(page)}
              href="#0"
              className={`flex items-center justify-center btn block w-10  p-2 	 ${
                page === currentPage
                  ? "bg-blue-600 text-white	"
                  : "bg-white  text-gray-600"
              } shadow-md rounded-sm border-gray-200 	 cursor-not-allowed  active:bg-blue-200`}
            >
              {page}
            </a>
          </li>
        ))}
        <li className="ml-3 first:ml-0">
          <a
            onClick={() => fetchNewOutPut()}
            href="#0"
            className={`flex items-center justify-center btn block w-10  p-2 bg-white  text-gray-600 shadow-md rounded-sm border-gray-200 	 cursor-not-allowed  active:bg-blue-200`}
          >
            ...
          </a>
        </li>
      </ul>
    </div>
  );
};

export const paginate = (
  items,
  pageNumber,
  pageSize
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items?.slice(startIndex, startIndex + pageSize);
};
