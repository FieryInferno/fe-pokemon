import {configureStore} from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemon';

const reducer = {
  pokemon: pokemonReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
