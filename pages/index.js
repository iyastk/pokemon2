import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { PokemonQuery } from "../utils/queries/queries";
import Card from "../components/Card";
import { useState } from "react";
import { SimplePagination, paginate } from "../components/SimplePagination";

// query
const url = "https://graphql-pokemon2.vercel.app";
const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

export async function getStaticProps() {
  const queryString = PokemonQuery();
  const query = gql(queryString);
  const variables = { first: 60 };
  let data;
  try {
    data = await client.query({ query, variables });
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }

  const pokemon = data?.data?.pokemons;

  return {
    props: {
      pokemon,
    },
  };
}

export default function Home(props) {
  const pokemon = props.pokemon;

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [product, setProduct] = useState(pokemon);
  const pageSize = 20;

  const endOffset = itemOffset + pageSize;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = pokemon.slice(itemOffset, endOffset);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setItemOffset(page * 20);
  };
  const paginatedPosts = paginate(pokemon, currentPage, pageSize);

  const fetchNewOutPut = async () => {
    const variable = endOffset + 20;
    const queryString = PokemonQuery();
    const query = gql(queryString);
    const variables = { first: variable };
    let data;
    try {
      data = await client.query({ query, variables });
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
    }

    const pokemon = data?.data.pokemons;
    setProduct(pokemon);
    console.log("will fetch", pokemon);
  };

  return (
    <main className=" bg-blue-200 px-10">
      <div className="grid grid-cols-4  md:grid-cols-3 sm:grid-cols-2		 gap-2">
        {paginatedPosts.map((el) => {
          return <Card key={el.id} {...el}></Card>;
        })}
      </div>
      <SimplePagination
        items={pokemon.length} // 100
        currentPage={currentPage} // 1
        pageSize={pageSize} // 10
        onPageChange={onPageChange}
        fetchNewOutPut={fetchNewOutPut}
      ></SimplePagination>
    </main>
  );
}
