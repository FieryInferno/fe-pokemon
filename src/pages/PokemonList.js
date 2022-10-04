import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {retrievePokemon} from '../slices/pokemon';
import List from '../components/List';

const PokemonList = () => {
  const dispatch = useDispatch(),
        {results, next, previous} = useSelector((state) => state.pokemon),
        [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  useEffect(() => {
    dispatch(retrievePokemon(url));
  // eslint-disable-next-line
  }, [url])

  return (
    <>
      <div className="text-center m-4">
        {previous && (
          <button onClick={() => setUrl(previous)} className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
            Previous
          </button>
        )}
        {next && (
          <button onClick={() => setUrl(next)} className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
            Next
          </button>
        )}
      </div>
      <List results={results} />
    </>
  )
};

export default PokemonList;
