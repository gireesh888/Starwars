import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './components/Homepage';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import PlanetDetails from './components/PlanetDetails';
import StarshipDetails from './components/StarshipDetails';
import PageNotFound from './components/PageNotFound';
import { Redirect } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage/>}></Route>
          <Route exact path="/movie/:title" element={<MovieDetails/>}></Route>
          <Route exact path="/actor" element={<ActorDetails/>}></Route>
          <Route exact path="/planet" element={<PlanetDetails/>}></Route>
          <Route exact path="/starship" element={<StarshipDetails/>}></Route>
          <Route path="*" element={<Homepage />} />
        </Routes>
      </BrowserRouter> 
    </div>
    
  );
}

export default App;
