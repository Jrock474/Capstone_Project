import React from "react";
import { useNavigate } from "react-router-dom";
import Music5 from "./MusicFolder/HomeOst";

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
      <div></div>
      <div className="Page1Body">
        <img src={"/images/Logo2.png"} className="logo2"></img>
          <img src={"/images/Login.png"} className="LoginButton" onClick={reRouteLogin}></img>
          <img src={"/images/SignUp.png"} className="SignInButton" onClick={reRouteReg}></img>
          <Music5/>
      </div>
    </>
  );
};

export default Home;
