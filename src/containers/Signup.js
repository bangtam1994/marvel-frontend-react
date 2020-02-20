import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Signup() {
  //Déclaration des states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //fonction pour rediriger vers homepage
  let history = useHistory();

  //fonction quand on submit le formulaire d'inscription
  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("Password are not matching ! Retry");
    } else {
      await axios
        .post("https://marvel-backend-bt.herokuapp.com/user/sign_up", {
          username,
          email,
          password
        })
        .then(function(response) {
          const token = response.data.token;
          if (response.data.message === "Email already exist") {
            alert("This email is already in use");
          } else if (response.data.message === "Missing information") {
            alert("Please fill all the information");
          } else {
            Cookies.set("token", token, { expires: 7 });
            history.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
          alert("An error occurred");
        });
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h2> CREATE AN ACCOUNT </h2>
        <hr />
        <p>Username *</p>
        <input
          type="text"
          name="pseudo"
          value={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
        />
        <p> Email address *</p>
        <input
          type="text"
          name="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <p> Password *</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <p> Confirm Password *</p>
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={event => {
            setPasswordConfirm(event.target.value);
          }}
        />
        <br />

        {/* Bouton creer mon compte  */}
        <input className="btn-signup" type="submit" value="CREATE ACCOUNT" />
      </form>
    </div>
  );
}

export default Signup;
