import './App.css';
import Navbar from './components/HomePage';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/home" children={<Navbar />} />
    </div>
  );
}

export default App;
