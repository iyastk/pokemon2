import React from "react";

const List = (props) => {
  const { types, Title } = props;
  const colorClass = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-400	",
    "bg-blue-500",
    "bg-fuchsia-300	",
    "bg-teal-500	",
  ];
  return (
    <div>
      <h1 className="text-xl my-4	 text-white">{Title}</h1>
      <div className="flex gap-4 ">
        {types.map((el, i) => {
          // eslint-disable-next-line react/jsx-key
          return (
            <div className={`px-2 py-1 rounded ${colorClass[i]} `} key={i}>
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
