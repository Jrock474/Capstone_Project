import React from 'react'

const Login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="/Login" method="post" onSubmit={handleSubmit} id='form-id'>
      <input type="text" placeholder='Username' required/>
      <input type="text" placeholder='Password' required/>
      <input type="submit" />
      </form>
    </div>
  )
}

export default Login
