import React from "react";
import Evolution from "./evolution";

const Popup = (props) => {
  const pokemon = props.pokemon;
  console.log(pokemon);
  return (
    <div className="  bg-rose-800 w-full p-4">
      <div
        className="inline-block bg-white text-end	"
        onClick={() => {
          props.setPopup(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div className=" flex justify-around items-center">
        {pokemon.map((el) => {
          return <Evolution {...el} key={el.name}></Evolution>;
        })}
      </div>
    </div>
  );
};

export default Popup;
