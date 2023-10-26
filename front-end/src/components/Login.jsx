import React from 'react'

const Login = () => {
  return (
    <div>
      Login

      <input type="text" placeholder='Username' required/>
      <input type="text" placeholder='Password' required/>
      <input type="text" placeholder='Security Answer' required/>
      <input type="submit" />
    </div>
  )
}

export default Login
