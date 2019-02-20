import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-content">
        <img src="./images/logo.png" />
        <a className="sign-in" href="/auth/google">Sign In</a>
      </div>
    </div>
  );
}

export default Landing;
