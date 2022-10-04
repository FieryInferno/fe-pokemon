import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {releasePokemon, renamePokemon} from '../slices/pokemon';
import {alertFailed} from '../helpers';

const List = ({results, fromMyPokemon = false}) => {
  const dispatch = useDispatch();

  const pokemonName = (pokemon) => {
    let name = fromMyPokemon ? pokemon.nickname : pokemon.name;

    if (pokemon.fibonacci) {
      name += `-${pokemon.fibonacci}`;
    }
    
    return name;
  }

  return (
    <div className="grid gap-4 grid-cols-4 mx-64">
      {results?.map((pokemon, key) => (
        <div className='text-center' key={key}>
          <Link to={`/pokemon/${fromMyPokemon ? pokemon.id : key + 1}/detail`} className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
            <figure className="max-w-lg">
              <img className="max-w-full h-auto rounded-lg" src={`https://img.pokemondb.net/artwork/large/${pokemon?.name}.jpg`} alt="description" />
              <figcaption className="mt-2 text-sm text-center text-black-500">
                <strong>{pokemonName(pokemon)}</strong>
              </figcaption>
            </figure>
          </Link>
          {fromMyPokemon && (
            <>
              <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => {
                dispatch(releasePokemon(pokemon.id))
                  .then((res) => {
                    if (res.payload.releaseStatus % 2 === 0 || res.payload.releaseStatus === 1) {
                      alertFailed('Failed release pokemon');
                    }
                  });
              }}>Release</button>
              <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => {
                dispatch(renamePokemon({id: pokemon.id, n: pokemon.rename}))
                  .then((res) => {
                    if (res.payload.releaseStatus % 2 === 0 || res.payload.releaseStatus === 1) {
                      alertFailed('Failed release pokemon');
                    }
                  });
              }}>Rename</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
};

export default List;
