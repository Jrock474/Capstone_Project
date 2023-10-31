import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import login from "../images/Login.png";
import { Link } from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorFound, setErrorFound] = useState('');
  
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
    if (loginSubmission.ok) {
      // on Successful login
      setErrorFound(`Login Successful, Hello ${formData.email}`);
    } else {
      // On error
      setErrorFound('Invalid login credentials. Please try again.');
    }
    navigate("/PlayGame");
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
        <input onChange={handleChange} maxLength={200}type="email" placeholder='Email' name = "email" required/>
        <input onChange={handleChange} maxLength= {15} type="password" placeholder='Password' name = "password" required/>
        <input type="submit" />
      </form>
      <Link to="/updatepassword">Forgot your password?</Link>
    </div>
  )
}

export default Login
