import './App.css';
import NavBar from './components/Navbar';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import InitialPage from './InitialPage';
import HomePage from './components/HomePage';
import Profile from './components/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div>
        
      </div>
        <div>
          <Switch>
            <Route path="/profile">
              <NavBar/>
              <Profile />
            </Route>

            <Route path="/home">
              <NavBar/>
              <HomePage />
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
