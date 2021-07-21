import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import InitialPage from './InitialPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
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
