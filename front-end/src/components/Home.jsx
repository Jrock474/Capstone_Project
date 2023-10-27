import React from "react";
import login from "../images/Login.png";
import signUp from "../images/SignUp.png";
import logo2 from "../images/Logo2.png";
import loginGlow from "../images/LoginGlow.png";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <div className="Page1Body">
        <img src={logo2} className="logo2"></img>
          <img src={login} className="LoginButton"></img>
          <img src={signUp} className="SignInButton"></img>
      </div>
    </>
  );
};

export default Home;
