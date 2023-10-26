import React from 'react'

const Registration = () => {
  return (
    <div>
      Registration
      <input type="text" name='username' placeholder='Username' required/>
      <input type="password" name='password' placeholder='Password' required/>
      <input type="password" name='reEntePassword' placeholder='Confirm Password' required/>
      <input type="text" name='securityQuestion' placeholder='Security Question' required/>
      <input type="text" name='securityAnswer' placeholder='Security Answer' required/>
      <input type="email" name='email' placeholder='Email' required/>
      <input type="submit" />
    </div>
  )
}

export default Registration
