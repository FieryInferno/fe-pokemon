import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemon, catchingPokemon, addToMyPokemon} from '../slices/pokemon';
import {alertFailed} from '../helpers';

const PokemonDetail = () => {
  const dispatch = useDispatch(),
        {pokemonId: id} = useParams(),
        {detail} = useSelector((state) => state.pokemon),
        [image, setImage] = useState(),
        [data, setData] = useState({nickname: ''}),
        [catchStatus, setCatchStatus] = useState();

  const catchPokemon = () => {
    dispatch(catchingPokemon())
        .then((res) => setCatchStatus(res.payload.catchStatus));
  }

  const rename = () => {
    dispatch(addToMyPokemon({
      ...detail,
      nickname: data.nickname,
    }))
        .then(() => setCatchStatus(null));
  }

  useEffect(() => {
    dispatch(getPokemon(id))
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setImage(`https://img.pokemondb.net/artwork/large/${detail?.name}.jpg`)
  }, [detail])

  useEffect(() => {
    if (catchStatus === 0) {
      alertFailed('Failed catch pokemon');
      setCatchStatus(null)
    }
  }, [catchStatus])

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mx-64">
        <figure>
          <img className="h-auto rounded-lg" src={image} alt="description" />
          <figcaption className="mt-2 text-sm text-center text-black-500">
            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-4" onClick={catchPokemon}>Catch</button>
          </figcaption>
        </figure>
        <div className="col-span-2">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <div className='text-center pb-4'>
              <strong>{detail?.name}</strong>
            </div>
            <div className="grid gap-x-8 gap-y-4 grid-cols-3">
              <div>Height: {detail?.height} m</div>
              <div>Weight: {detail?.weight} Kg</div>
              <div>Abilities: {detail?.abilities[0].ability.name}</div>
            </div>
            <div className='mt-4'>
              <strong>Types</strong>
            </div>
            <div>
              {detail?.types.map((type, key) => (
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-4" key={key}>{type.type.name}</button>
              ))}
            </div>
            <div className='mt-4'>
              <strong>Moves</strong>
            </div>
            <div>
              {detail?.moves.slice(0, 5).map((move, key) => (
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-4" key={key}>{move.move.name}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {catchStatus === 1 &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <form className='w-full'>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nickname</label>
                        <input
                          type="text"
                          id="nickname"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                          onChange={(e) => setData({nickname: e.target.value})}
                          value={data?.nickname}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={rename}>Rename</button>
                  <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setCatchStatus(null)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default PokemonDetail;
