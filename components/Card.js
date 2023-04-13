import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = (props) => {
  const { id, number, name, types, image } = props;
  return (
    <div className="flex items-center justify-around  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="rounded-t-lg"
          src={image}
          alt=""
          width={100}
          height={100}
        />
      </a>
      <div className=" flex flex-col	 items-center p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <div className="flex flex-col w-52 items-center p-3 bg-gray-100 rounded mb-2">
          Types :
          <div className="flex gap-2 mt-1 ">
            {types.map((type, i) => {
              return (
                <div
                  className=" flex justify-center items-center p-1 w-20	 m-1 rounded bg-white"
                  key={i}
                >
                  {type}
                </div>
              );
            })}
          </div>
        </div>

        <Link
          href={`/${name}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
