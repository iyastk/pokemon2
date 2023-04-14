"use client";
import React, { Fragment, useState } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { evolutionQuery } from "../utils/queries/queries";
import Popup from "./popup";

import Image from "next/image";
import List from "./List";
const url = process.env.BACKOFFICE_API || "https://graphql-pokemon2.vercel.app";
const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

const DetailCard = (props) => {
  if (props?.pokemonDetails === undefined) {
    return <div>page loading</div>;
  } else {
    const {
      image,
      name,
      classification,
      number,
      height,
      weight,
      types,
      resistant,
      weaknesses,
    } = props?.pokemonDetails;

    const [popup, setPopup] = useState(false);
    const [evolutions, SetEvolution] = useState([]);

    const getEvolution = async () => {
      setPopup(true);
      const queryString = evolutionQuery();
      const query = gql(queryString);
      const variables = {
        name: name,
      };
      let data;
      try {
        data = await client.query({ query, variables });
      } catch (e) {
        console.log(JSON.stringify(e, null, 2));
      }
      // data?.data.
      const pokemonEvolution = data?.data?.pokemon?.evolutions;
      SetEvolution(pokemonEvolution);
    };
    return (
      <Fragment>
        <div className="flex justify-center items-center gap-5 p-6">
          <h1 className="text-4xl		uppercase	text-lime-900	">{name}</h1>
          <h2 className="text-4xl	 text-lime-900	">#{number}</h2>
        </div>
        <div className="flex  w-full	h-5/6		 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col justify-center items-center gap-4 w-1/2		 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Image
              className="rounded-t-lg"
              src={image}
              alt=""
              width={300}
              height={300}
            />
          </div>
          <div className="flex   w-1/2		 bg-teal-600	 border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full px-10 py-4 ">
              <div className="flex  justify-center items-center gap-4 p-2">
                <h1 className="text-xl	 text-white">Category</h1>
                <span className="text-xl">{classification}</span>
              </div>
              <div className="flex justify-between px-2 py-4">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-xl	 text-white">Height</h1>
                  <span className="text-xl">Minimum : `{height.minimum}` </span>
                  <span className="text-xl">Maximum : `{height.maximum}`</span>
                </div>
                <div className="flex flex-col  justify-center items-center">
                  <h1 className="text-xl	 text-white">Weight</h1>
                  <span className="text-xl">Minimum : `{weight.minimum}` </span>
                  <span className="text-xl">Maximum : `{weight.maximum}`</span>
                </div>
              </div>
              <List Title={"Types"} types={types}></List>
              <List Title={"Resistant"} types={resistant}></List>
              <List Title={"Weaknesses"} types={weaknesses}></List>
              <div
                className="flex justify-center items-center bg-rose-800 mt-14	p-2 px-10 text-white "
                onClick={getEvolution}
              >
                Evolutions
              </div>
            </div>
          </div>
        </div>
        {popup ? <Popup pokemon={evolutions} setPopup={setPopup}></Popup> : ""}{" "}
      </Fragment>
    );
  }
};

export default DetailCard;
