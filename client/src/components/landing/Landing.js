import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-content">
        <img src="./images/landing-logo.png" alt="Tubeless" />
        <h1>Tubeless</h1>
        <a className="sign-in" href="/auth/google">Sign in with Google</a>
      </div>
    </div>
  );
}

export default Landing;
