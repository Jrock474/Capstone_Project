import React, { useEffect } from 'react'
import logo2 from "../images/Logo2.png";
import continueBtn from "../images/Continue.png";
import newGame from "../images/NewGame.png";

const PlayGame = () => {

  const getUserData = async() =>{
    let userData = await fetch(`http://localhost:3000/playgame/:userID`)
    console.log(userData)
  } 

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <div>
      <div className='logMain'>
      <img src={logo2} className="logo2"></img>
      <img src={continueBtn} className="ContinueButton"></img>
      <img src={newGame} className="NewGameButton"></img>
      </div>
    </div>
  )
}

export default PlayGame
