import React from "react";
import login from "../images/Login.png";
import signUp from "../images/SignUp.png";
import logo2 from "../images/Logo2.png";
import loginGlow from "../images/LoginGlow.png";
import Login from "./Login";
import Registration from "./Registration";
import { useNavigate } from "react-router-dom";

const Home = () => {

  let nav = useNavigate()
  const reRouteLogin = () => {
    nav("/Login")
  }
  const reRouteReg = () => {
    nav("/Registration")
  }

  return (
    <>
      <div>Home</div>
      <div className="Page1Body">
        <img src={logo2} className="logo2"></img>
          <img src={login} className="LoginButton" onClick={reRouteLogin}></img>
          <img src={signUp} className="SignInButton" onClick={reRouteReg}></img>
      </div>
    </>
  );
};

export default Home;
