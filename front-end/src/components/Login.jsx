import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import login from "../images/Login.png";

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On submit of the form, send a POST request with the data to the server.
    let loginSubmission = await fetch('http://localhost:3000/Login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    console.log(loginSubmission)

    navigate("/PlayGame")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div className='logMain'>
      <img src={login} className="LoginButtonNoHover"></img>
      <form className= "logForm" action="/Login" method="post" onSubmit={handleSubmit}>
        <input onChange={handleChange} type="email" placeholder='Email' name = "email" required/>
        <input onChange={handleChange} type="password" placeholder='Password' name = "password" required/>
        <input type="submit" />
      </form>

    </div>
  )
}

export default Login
