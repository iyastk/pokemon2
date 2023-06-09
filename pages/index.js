import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { PokemonQuery } from "../utils/queries/queries";
import Card from "../components/Card";
import { useState } from "react";
import {
  SimplePagination,
  paginate,
  displayPage,
} from "../components/SimplePagination";

// query
const url = process.env.BACKOFFICE_API || "https://graphql-pokemon2.vercel.app";
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
  const [initialPages, setInitialPages] = useState([]);

  const pageSize = 20;

  const endOffset = itemOffset + pageSize;
  const currentItems = pokemon.slice(itemOffset, endOffset);

  const paginatedPosts = paginate(product, currentPage, pageSize);

  const fetchNewOutPut = async () => {
    const variable = endOffset + 60;
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
    console.log("will fetch", pokemon);

    setProduct(pokemon);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    setItemOffset(page * 20);
    const { displayPages, currentActive } = displayPage(page, false);
    const currentLastPage = initialPages.pop();
    if (currentLastPage === page) {
      console.log("here", endOffset);
      fetchNewOutPut();
    }
    setInitialPages(displayPages);
  };
  console.log();

  return (
    <main className=" bg-blue-200 px-10">
      <div className="grid  xl:grid-cols-4  lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1		 gap-2">
        {paginatedPosts.map((el) => {
          return <Card key={el.id} {...el}></Card>;
        })}
      </div>
      <SimplePagination
        productItem={pokemon.length} // 100
        currentPage={currentPage} // 1
        pageSize={pageSize} // 10
        setInitialPages={setInitialPages}
        initialPages={initialPages}
        setCurrentPage={setCurrentPage}
        onPageChange={onPageChange}
        fetchNewOutPut={fetchNewOutPut}
      ></SimplePagination>
    </main>
  );
}
