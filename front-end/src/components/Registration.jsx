import React from 'react'

const Registration = () => {
  return (
    <div>
      Registration

      <input type="text" placeholder='Username' required/>
      <input type="text" placeholder='Password' required/>
      <input type="text" placeholder='Security Question' required/>
      <input type="text" placeholder='Security Answer' required/>
      <input type="email" placeholder='Email' required/>
      <input type="submit" />
    </div>
  )
}

export default Registration
