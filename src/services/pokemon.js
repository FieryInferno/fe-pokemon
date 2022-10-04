import axios from 'axios';
import http from '../http-common';

const getAll = (url) => axios.get(url);
const get = (id) => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
const catchingPokemon = () => http.get('catch');
const release = () => http.get('release');
const rename = (n) => http.get(`rename/${n}`);
const pokemonService = {
  getAll,
  get,
  catchingPokemon,
  release,
  rename,
};

export default pokemonService;
