import Banner from './Components/Banner';
import './App.css';
import MovieCards from './Components/MainCards';
import Favourite from './Components/Favourite';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <>
    <Switch>
    <Route path="/" exact>
    <Banner/>
    <MovieCards/>
    </Route>
    <Route path="/favourite" exact component={Favourite}/>
    </Switch>
    </>
    </BrowserRouter>
  );
}

export default App;
