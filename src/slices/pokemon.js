import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import PokemonService from '../services/pokemon';

export const retrievePokemon = createAsyncThunk(
  'pokemon/retrieve',
  async (url, {rejectWithValue}) => {
    try {
      const res = await PokemonService.getAll(url);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message,
      );
    }
  },
);

export const getPokemon = createAsyncThunk(
  'pokemon/get',
  async (id, {rejectWithValue}) => {
    try {
      const res = await PokemonService.get(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message,
      );
    }
  },
);

export const catchingPokemon = createAsyncThunk(
  'pokemon/catching',
  async (param, {rejectWithValue}) => {
    try {
      const res = await PokemonService.catchingPokemon();
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message,
      );
    }
  },
);

export const addToMyPokemon = createAsyncThunk(
  'pokemon/addToMyPokemon',
  async (dataPokemon, {rejectWithValue}) => {
    try {
      return dataPokemon;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message,
      );
    }
  },
);

export const retrieveMyPokemon = createAsyncThunk(
  'pokemon/my-pokemon',
  async (param, {rejectWithValue}) => {
    try {
      const myPokemon = JSON.parse(localStorage.getItem('my_pokemon'));
      return myPokemon;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message,
      );
    }
  },
);

export const releasePokemon = createAsyncThunk(
  'pokemon/release',
  async (id, {rejectWithValue}) => {
    try {
      const res = await PokemonService.release();
      return {
        releaseStatus: res.data.releaseStatus,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message,
      );
    }
  },
);

export const renamePokemon = createAsyncThunk(
  'pokemon/rename',
  async (param, {rejectWithValue}) => {
    try {
      const {id, n} = param,
            res = await PokemonService.rename(n);
      return {
        ...res.data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message || error.message,
      );
    }
  },
);

const initialState = {},
      pokemonSlice = createSlice({
        name: 'pokemon',
        initialState,
        extraReducers: {
          [retrievePokemon.fulfilled]: (state, action) => {
            return {
              ...state,
              ...action.payload,
            };
          },
          [getPokemon.fulfilled]: (state, action) => {
            return {
              ...state,
              detail: action.payload,
            };
          },
          [catchingPokemon.fulfilled]: (state, action) => {
            return {
              ...state,
              ...action.payload,
            };
          },
          [addToMyPokemon.fulfilled]: (state, action) => {
            const myPokemons = JSON.parse(localStorage.getItem('my_pokemon')) ? JSON.parse(localStorage.getItem('my_pokemon')) : [];
            myPokemons.push({
              ...action.payload,
              rename: 1,
            });
            localStorage.setItem('my_pokemon', JSON.stringify(myPokemons));
            return {
              ...state,
              my_pokemon: myPokemons,
            };
          },
          [retrieveMyPokemon.fulfilled]: (state, action) => {
            return {
              ...state,
              my_pokemon: action.payload,
            };
          },
          [releasePokemon.fulfilled]: (state, action) => {
            if (action.payload.releaseStatus % 2 !== 0 && action.payload.releaseStatus !== 1) {
              const index = state.my_pokemon.findIndex(({id}) => id === action.payload.id);
              state.my_pokemon.splice(index, 1);
              localStorage.setItem('my_pokemon', JSON.stringify(state.my_pokemon));
            }
          },
          [renamePokemon.fulfilled]: (state, action) => {
            const index = state.my_pokemon.findIndex(({id}) => id === action.payload.id);
            state.my_pokemon[index].fibonacci = action.payload.fibonacci;
            state.my_pokemon[index].rename = action.payload.rename;
            localStorage.setItem('my_pokemon', JSON.stringify(state.my_pokemon));
          },
        },
      });

const {reducer} = pokemonSlice;

export default reducer;
