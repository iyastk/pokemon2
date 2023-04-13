import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { DetailsQuery } from "../utils/queries/queries";
import DetailCard from "../components/DetailCard";

// query
const url = "https://graphql-pokemon2.vercel.app";
const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

export async function getStaticProps(context) {
  const variable = context.params.items[0];
  const queryString = DetailsQuery();
  const query = gql(queryString);
  const variables = {
    name: variable,
  };
  let data;
  try {
    data = await client.query({ query, variables });
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
  const pokemonDetails = data?.data?.pokemon;
  return {
    props: {
      pokemonDetails,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function Home(props) {
  const pokemonDetails = props?.pokemonDetails;
  return (
    <div className="px-10">
      <DetailCard pokemonDetails={pokemonDetails}></DetailCard>
    </div>
  );
}
