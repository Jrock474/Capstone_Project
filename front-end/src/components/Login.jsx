import React, { useState } from 'react'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On submit of the form, send a POST request with the data to the server.
    let data = await fetch('http://localhost:3000/Login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    console.log(data)
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div>
      Login
      <form action="/Login" method="post" onSubmit={handleSubmit}>
        <input onChange={handleChange} type="email" placeholder='Email' name = "email" required/>
        <input onChange={handleChange} type="password" placeholder='Password' name = "password" required/>
        <input type="submit" />
      </form>

    </div>
  )
}

export default Login
