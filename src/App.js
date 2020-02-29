import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  faHeart,
  faSortUp
} from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faChevronRight, faChevronLeft, faHeart, faSortUp);

function App() {
  //Va gérer l'état du cookie (présent ou non)
  const tokenFromCookie = Cookies.get("token");
  const [user, setUser] = useState(
    tokenFromCookie ? { token: tokenFromCookie } : null
  );

  //Favori par les COOKIES
  const favCharacFromCookie = Cookies.get("favCharac");
  const [myFavCharacters, setMyFavCharacters] = useState(
    favCharacFromCookie ? favCharacFromCookie : null
  );

  const favComicFromCookie = Cookies.get("favComic");
  const [myFavComics, setMyFavComics] = useState(
    favComicFromCookie ? favComicFromCookie : null
  );

  //Favoris  par le USER
  const [favCharacFromUser, setFavCharacFromUser] = useState([]);
  const [favComicFromUser, setFavComicFromUser] = useState([]);

  // Message quand un favori est ajouté ou retiré
  const [favAdded, setFavAdded] = useState(false);
  const [favRemoved, setFavRemoved] = useState(false);

  return (
    <Router>
      <Header
        setUser={setUser}
        user={user}
        favAdded={favAdded}
        favRemoved={favRemoved}
      />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/user/sign_up">
          <Signup />
        </Route>
        <Route exact path="/characters">
          {/* <Helmet>
            <meta charSet="utf-8" />
            <title>Marvel characters</title> */}
          <Characters
            favCharacFromCookie={favCharacFromCookie}
            myFavCharacters={myFavCharacters}
            setMyFavCharacters={setMyFavCharacters}
            favCharacFromUser={favCharacFromUser}
            setFavCharacFromUser={setFavCharacFromUser}
            token={tokenFromCookie}
            user={user}
            setFavAdded={setFavAdded}
            setFavRemoved={setFavRemoved}
          />
          {/* </Helmet> */}
        </Route>
        <Route path="/character/:id">
          <Character />
        </Route>

        <Route path="/comics">
          <meta charSet="utf-8" />
          <title>Marvel comics</title>
          <Comics
            favComicFromCookie={favComicFromCookie}
            myFavComics={myFavComics}
            setMyFavComics={setMyFavComics}
            setFavComicFromUser={setFavComicFromUser}
            user={user}
            setFavAdded={setFavAdded}
          />
        </Route>
        <Route path="/favorites">
          <Favorites
            myFavCharacters={myFavCharacters}
            favCharacFromCookie={favCharacFromCookie}
            setMyFavCharacters={setMyFavCharacters}
            myFavComics={myFavComics}
            setMyFavComics={setMyFavComics}
            favCharacFromUser={favCharacFromUser}
            user={user}
            favComicFromCookie={favComicFromCookie}
          />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
