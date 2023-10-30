import React, { useState } from 'react'
import login from "../images/Login.png";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorFound, setErrorFound] = useState('');
  
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
    if (data.ok) {
      // on Successful login
      setErrorFound(`Login Successful, Hello ${formData.email}`);
    } else {
      // On error
      setErrorFound('Invalid login credentials. Please try again.');
    }
    console.log(data)
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div className='logMain'>
      <div>{errorFound && <div className="errorD">{errorFound}</div>}</div>
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
