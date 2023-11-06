import React, { useContext, useEffect, useState } from 'react'
import { UserData } from '../App'
import { useNavigate } from "react-router-dom";

const PlayGame = () => {

  const [userName, setUserName] = useState("")

  let nav = useNavigate()
  const reRouteContinue = () => {
    nav("/MainGame")
  }
  // const reRouteNewGame = () => {
  //   nav("/Intro")
  // }

  const userData = useContext(UserData)

  useEffect(()=>{
    console.log(userData)
    setUserName(userData[0].username)
  },[])

  return (
    <div>
      <div className='logMain'>
      <div className='Welcome'>Welcome {userName}</div>
      <img src={"/images/Logo2.png"} className="logo2"></img>
      <img src={"/images/Continue.png"} className="ContinueButton" onClick={reRouteContinue}></img>
      <img src={"/images/NewGame.png"} className="NewGameButton"></img>
      {/* <Professor /> */}
      </div>
    </div>
  )
}

export default PlayGame
