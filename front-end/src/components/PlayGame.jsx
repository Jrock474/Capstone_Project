import React from 'react'
import logo2 from "../images/Logo2.png";
import continueBtn from "../images/Continue.png";
import newGame from "../images/NewGame.png";

const PlayGame = () => {


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
