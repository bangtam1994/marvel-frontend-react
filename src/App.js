import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./containers/Landing";
import Signup from "./containers/Signup";
import Character from "./containers/Character";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";
import "./reset.css";
import "./App.css";

import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faChevronRight, faChevronLeft);

function App() {
  //Va gérer l'état du cookie (présent ou non)
  const tokenFromCookie = Cookies.get("token");
  const [user, setUser] = useState(
    tokenFromCookie ? { token: tokenFromCookie } : null
  );

  return (
    <Router>
      <Header setUser={setUser} user={user} />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/user/sign_up">
          <Signup />
        </Route>
        <Route exact path="/characters">
          <Characters />
        </Route>
        <Route path="/character/:id">
          <Character />
        </Route>

        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
