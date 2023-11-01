import React, { useContext, useEffect, useState } from 'react'
import logo2 from "../images/Logo2.png";
import continueBtn from "../images/Continue.png";
import newGame from "../images/NewGame.png";
import { UserData } from '../App';
import Professor from './Professor';

const PlayGame = () => {

  const [userName, setUserName] = useState("")

  const userData = useContext(UserData)

  useEffect(()=>{
    console.log(userData)
    setUserName(userData[0].username)
  },[])

  return (
    <div>
      <div className='logMain'>
      <div>Welcome {userName}</div>
      <img src={logo2} className="logo2"></img>
      <img src={continueBtn} className="ContinueButton"></img>
      <img src={newGame} className="NewGameButton"></img>
      {/* <Professor /> */}
      </div>
    </div>
  )
}

export default PlayGame
