import React from 'react'

const Professor = () => {

    const myStyle = { color: "blue" }
  return (
    <div>
      <div className='intro-prof'>
      <img src={"/images/Gas-can-logo.png"} alt="" />
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
