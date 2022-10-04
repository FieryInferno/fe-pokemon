import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import Layout from './pages/Layout';
import MyPokemon from './pages/MyPokemon';

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PokemonList />} />
          <Route path="pokemon" element={<PokemonList />} />
          <Route path="pokemon/:pokemonId/detail" element={<PokemonDetail />} />
          <Route path="/my-pokemon" element={<MyPokemon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}