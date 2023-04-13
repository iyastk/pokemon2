export const PokemonQuery = () => {
  return `
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      classification
      types
      image
    }
  }
`;
};
export const DetailsQuery = () => {
  return `query pokemon( $name: String){
    pokemon( name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses

      image
    }
  }
`;
};
export const evolutionQuery = () => {
  return `query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
      id
      name
      evolutions{
        id
        number
        name
        types
        image
      }
    }
  }`;
};
