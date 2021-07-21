import './App.css';
import Navbar from './components/HomePage';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import InitialPage from './pages/InitialPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <div>

          <Switch>

            <Route path="/profile">
              <p>perfil</p>
            </Route>

            <Route path="/home">
              <p>homepage</p>
            </Route>
            <Route path="/">
              <InitialPage />
            </Route>
          </Switch>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
