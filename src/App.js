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
  faChevronLeft,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faChevronRight, faChevronLeft, faHeart);

function App() {
  //Va gérer l'état du cookie (présent ou non)
  const tokenFromCookie = Cookies.get("token");
  const [user, setUser] = useState(
    tokenFromCookie ? { token: tokenFromCookie } : null
  );

  const favCharacFromCookie = Cookies.get("favCharac");
  const [myFavCharacters, setMyFavCharacters] = useState(
    favCharacFromCookie ? favCharacFromCookie : null
  );

  const favComicFromCookie = Cookies.get("favComic");
  const [myFavComics, setMyFavComics] = useState(
    favComicFromCookie ? favComicFromCookie : null
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
          <Characters
            favCharacFromCookie={favCharacFromCookie}
            myFavCharacters={myFavCharacters}
            setMyFavCharacters={setMyFavCharacters}
          />
        </Route>
        <Route path="/character/:id">
          <Character />
        </Route>

        <Route path="/comics">
          <Comics
            favComicFromCookie={favComicFromCookie}
            myFavComics={myFavComics}
            setMyFavComics={setMyFavComics}
          />
        </Route>
        <Route path="/favorites">
          <Favorites
            myFavCharacters={myFavCharacters}
            setMyFavCharacters={setMyFavCharacters}
            myFavComics={myFavComics}
            setMyFavComics={setMyFavComics}
          />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
