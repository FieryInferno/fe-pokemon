import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {retrieveMyPokemon} from '../slices/pokemon';
import List from '../components/List';

const MyPokemon = () => {
  const dispatch = useDispatch(),
        {my_pokemon} = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(retrieveMyPokemon());
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <List results={my_pokemon} fromMyPokemon/>
    </>
  )
};

export default MyPokemon;
