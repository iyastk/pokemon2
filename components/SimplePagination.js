import React, { useEffect, useState } from "react";
export const displayPage = (page, multiplayer, direction = "front") => {
  let displayPages = [];
  let currentActive = 0;
  if (page > 1 && multiplayer === false) {
    const nextPage = page + 1;
    const previousPage = page - 1;
    displayPages = [previousPage, page, nextPage];
  } else if (page === 1 && multiplayer === false) {
    const nextPage = page + 1;
    const second = page + 2;
    displayPages = [page, nextPage, second];
  } else if (multiplayer === true && direction === "front") {
    const currentPage = page + 3;
    const nextPage = currentPage + 1;
    currentActive = currentPage - 1;
    displayPages = [currentActive, currentPage, nextPage];
  } else if (multiplayer === true && direction === "back") {
    const currentPage = page - 3;
    const nextPage = currentPage + 1;
    currentActive = currentPage - 1;
    displayPages = [currentActive, currentPage, nextPage];
  }

  return { displayPages, currentActive };
};

export const SimplePagination = (props) => {
  const { productItem, currentPage, pageSize, onPageChange } = props;
  const pagesCount = Math.ceil(productItem.length / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  useEffect(() => {
    if (pages) {
      const currentPages = displayPage(1, false);
      props.setInitialPages(currentPages.displayPages);
    }
  }, []);

  const previousPage = () => {
    const firstPageOfArray = props.initialPages.shift();
    onPageChange(firstPageOfArray);
  };
  const skipForward = () => {
    const lastPageOfArray = props.initialPages.pop();
    props.fetchNewOutPut();
    const { displayPages, currentActive } = displayPage(
      lastPageOfArray,
      true,
      "front"
    );
    props.setInitialPages(displayPages);
    props.setCurrentPage(currentActive);
  };
  const skipBackward = () => {
    const firstPageOfArray = props.initialPages.shift();
    const { displayPages, currentActive } = displayPage(
      firstPageOfArray,
      true,
      "back"
    );

    props.setInitialPages(displayPages);
    props.setCurrentPage(currentActive);
  };
  return (
    <div className=" p-2">
      <ul className="flex justify-center items-center transition-all	">
        {currentPage >= 6 ? (
          <li className="ml-3 first:ml-0">
            <a
              className="btn flex items-center justify-center btn block w-10 h-10 p-2	 bg-white shadow-md border-gray-200 hover:border-gray-300 text-indigo-500 p-1"
              href="#0"
              onClick={skipBackward}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </a>
          </li>
        ) : (
          ""
        )}
        {currentPage > 2 ? (
          <li className="ml-3 first:ml-0">
            <a
              className="btn flex items-center justify-center btn block w-10 h-10 p-2	 bg-white shadow-md border-gray-200 hover:border-gray-300 text-indigo-500 p-1"
              href="#0"
              onClick={previousPage}
            >
              ...
            </a>
          </li>
        ) : (
          ""
        )}
        {props.initialPages.map((page, i) => (
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
            className="btn flex items-center justify-center btn block w-10 h-10 p-2	 bg-white shadow-md border-gray-200 hover:border-gray-300 text-indigo-500 p-1"
            href="#0"
            onClick={skipForward}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
};

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items?.slice(startIndex, startIndex + pageSize);
};
