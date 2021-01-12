import "./App.css";
import Navbar from "./components/Nav";
import { Switch, Route } from "react-router-dom";
import Recipes from "./components/Recipes/Recipes";
import AddRecipe from "./components/AddRecipe/AddRecipe";

const App = () => {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route exact path="/">
          <Recipes />
        </Route>
        <Route path="/addrecipe">
          <AddRecipe />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
