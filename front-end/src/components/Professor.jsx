import React from 'react'
import prof from "../images/Gas-can-logo.png"

const Professor = () => {

    const myStyle = { color: "blue" }
  return (
    <div>
      <div className='intro-prof'>
      <img src={prof} alt="" />
      <video src=""></video>
      <h1 style={myStyle}>Intro</h1>
      <div className='dialogue'>
        Text Box
      </div>
      </div>
    </div>
  )
}

export default Professor
