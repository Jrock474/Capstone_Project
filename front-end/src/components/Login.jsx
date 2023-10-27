import React from 'react'

const Login = () => {
  return (
    <div>
      Login

      <input type="text" placeholder='Username' maxLength={15} required/>
      <input type="text" placeholder='Password' minLength= {3} maxLength={15} required/>
      <input type="submit" />
    </div>
  )
}

export default Login
