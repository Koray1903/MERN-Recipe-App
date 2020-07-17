import React from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from "./redux/store";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import FullRecipe from "./components/FullRecipe";
import NewRecipe from "./components/NewRecipe";

const App = () => {
  return (
    <Router>
      <Switch>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavBar/>
            <Route path="/new" component={NewRecipe}/>
            <Route exact path="/" component={Homepage}/>
            <Route path="/recipe/:recipeId" component={FullRecipe}/>
          </PersistGate>
        </Provider>
      </Switch>
    </Router>
  );
};

export default App;
