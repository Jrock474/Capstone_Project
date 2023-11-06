
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserData } from '../App';
import { Link } from 'react-router-dom';
import Music6 from './MusicFolder/Loginost';

const Login = () => {

  const [userData, setUserData] = useContext(UserData)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorFound, setErrorFound] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorFound("")

    // On submit of the form, send a POST request with the data to the server.
    const loginSubmission = await fetch('https://capstone-project-1cyy-iznfzih54-jrock474.vercel.app/Login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

    // If login is unsuccessful
    if(!loginSubmission.ok){
      setErrorFound('Invalid login credentials. Please try again.');
    }
    
    const userData = await loginSubmission.json()

    // If login is successful, fetches User data and redirects
    if (loginSubmission.ok) {
      // on Successful login
      console.log(userData)
      setUserData(userData)
      navigate("/PlayGame");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  
  return (
    <div className='logMain'>
      <Music6/>
      <div>{errorFound && <div className="errorD">{errorFound}</div>}</div>
      <img src={"/images/Login.png"} className="LoginButtonNoHover" style= {{ marginBottom: 30 }} />
      <form className= "centeringForInputs" action="/Login" method="post" onSubmit={handleSubmit}>
        <input onChange={handleChange} type="email" placeholder='Email' name = "email" className= "centeringForInputs" required/>
        <input onChange={handleChange} type="password" placeholder='Password' name = "password" className= "centeringForInputs" required/>
        <input type="submit" className= "submitBtn"/>
      </form>
      <Link to="/updatepassword" className='links-for-reRoutes'>Forgot Your Password?</Link>
    </div>
  )
}

export default Login

