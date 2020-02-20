import React from "react";
import { useHistory } from "react-router-dom";

function Landing() {
  let history = useHistory();

  return (
    <div className="landing-page">
      <div className="landing">
        <div
          className="landing-message"
          onClick={() => {
            history.push("/characters");
          }}
        >
          Hello there ! <br /> Discover our brand new website !
        </div>
      </div>
    </div>
  );
}

export default Landing;
