import React, { useContext, useEffect, useState } from 'react'

const PlayGame = () => {

  const [userName, setUserName] = useState("")


  const getUserData = async() =>{
    let data = await fetch("http://localhost:3000/playgame/:userID")
    console.log(data)
  } 

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <div>
      <div className='logMain'>
      <img src={"/images/Logo2.png"} className="logo2"></img>
      <img src={"/images/Continue.png"} className="ContinueButton"></img>
      <img src={"/images/NewGame.png"} className="NewGameButton"></img>
      {/* <Professor /> */}
      </div>
    </div>
  )
}

export default PlayGame
