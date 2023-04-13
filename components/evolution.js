import React from "react";
import Image from "next/image";
import List from "./List";

const Evolution = (props) => {
  const { image, name, number, types } = props;
  return (
    <div className="flex  justify-center items-center gap-10">
      <div className="rounded-full bg-white h-40 w-40 flex  justify-center items-center">
        <Image src={image} alt="" width={100} height={100} />
      </div>
      <div>
        <div className="text-xl  text-white">
          {name} {number}
        </div>
        <List types={types} Title={"Type"}></List>
      </div>
    </div>
  );
};

export default Evolution;
