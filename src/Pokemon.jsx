import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const api = " https://pokeapi.co/api/v2/pokemon/?limit=100";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(api);
      const data = await res.json();

      const detailedPokemon = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedRes = await Promise.all(detailedPokemon);
      setPokemon(detailedRes);
      console.log(detailedRes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Let's catch Pokémon!</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((currPokemon) => {
              return (
                <PokemonCard key={currPokemon.id} pokemonData={currPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
