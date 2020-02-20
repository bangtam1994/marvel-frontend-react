import React, { useState } from "react";
import logo from "../assets/images/logo-marvel.png";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";

function Header({ user, setUser }) {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  // fonction pour submit connexion de la modal
  const handleConnexion = async event => {
    event.preventDefault();
    setModal(false);

    await axios
      .post(
        "https://marvel-backend-bt.herokuapp.com/user/log_in",

        {
          email: email,
          password: password
        }
      )
      .then(function(response) {
        console.log(response);
        if (response.data.message === "User not found") {
          alert("Cet utilisateur n'existe pas");
        } else {
          //J'enregistre mon token dans mes cookies
          const token = response.data.token;
          console.log("your login token is", token);
          Cookies.set("token", token, { expires: 7 });

          // Je remplace le bouton "se connecter" par "se déconnecter"
          setUser({ token: token });
          history.push("/");
        }
      })
      .catch(function(error) {
        alert("invalid username or password");
        console.log(error);
      });
  };

  return (
    <>
      {/* header  */}
      <header>
        <div className="container d-flex">
          <Link to="/">
            <img src={logo} alt="Logo Marvel" />
          </Link>

          <div
            className="login"
            onClick={() => {
              setModal(true);
            }}
          >
            {user === null ? (
              // <Link to="/user/log_in">
              <div>LOGIN </div>
            ) : (
              // </Link>
              <div
                onClick={() => {
                  Cookies.remove("token");
                  setUser(null);
                  setModal(false);

                  history.push("/");
                }}
              >
                LOGOUT
              </div>
            )}
          </div>
        </div>
      </header>

      {/* menu  */}

      <nav>
        <div className="menu container">
          <Link to="/characters">
            <div>CHARACTERS</div>
          </Link>
          <Link to="/comics">
            <div>COMICS</div>
          </Link>
          <Link to="/favorites">
            <div>FAVORITES</div>
          </Link>
        </div>
      </nav>

      {/* MODAL DU LOGIN */}
      {modal === true && (
        <div
          className="modal"
          onClick={event => {
            if (event.target.className === "modal") {
              setModal(false);
            }
          }}
        >
          <div className="whiteblock">
            <form onSubmit={handleConnexion}>
              <h2> LOG IN </h2>
              <hr />
              <p> EMAIL</p>
              <input
                placeholder="email@email.com"
                type="text"
                name="email"
                value={email}
                onChange={event => {
                  setEmail(event.target.value);
                }}
              />

              <p> PASSWORD</p>
              <input
                placeholder="your password here"
                type="password"
                name="password"
                value={password}
                onChange={event => {
                  setPassword(event.target.value);
                }}
              />
              <br />
              {/* Bouton pour se connecter  */}
              <input className="modal-btn-login" type="submit" value="Log In" />
            </form>

            {/* formulaire pour redigirer vers signup  */}
            <form>
              <p>Need to create an account?</p>
              <Link to="/user/sign_up">
                <input
                  className="modal-btn-login"
                  type="submit"
                  value="Create an account"
                  onClick={() => {
                    setModal(false);
                  }}
                />
              </Link>
            </form>
            {/* Pour fermer la modale  */}
            <FontAwesomeIcon
              icon="times-circle"
              className="modalCloseBtn"
              onClick={() => {
                setModal(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
