import React, { useState } from 'react';
import bcrypt from 'bcryptjs'
import signUp from "../images/SignUp.png";


const Registration = () => {
  const [formData, setFormData] = useState({
    password: '',
    reEnterPassword: '',
    secquestion: '',
    secanswer: '',
    email: '',
  });

  const [errorFound, setErrorFound] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (formData.password !== formData.reEnterPassword) {
      setErrorFound('Passwords do not match');
      return; // Stop form submission
    } else {
      setErrorFound(''); // Reset error message
    }
    //bcrypt
const saltRounds = 10;
const hashedPasswod = bcrypt.hashSync(formData.password, saltRounds)
formData.password= hashedPasswod
    // Proceed with form submission
    console.log(formData.username);

    // On submit of the form, send a POST request with the data to the server.
    await fetch('http://localhost:3000/Registration', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div className='regMain'>
      <img src={signUp} className="SignInButton"></img>
      <div>{errorFound && <div className="error">{errorFound}</div>}</div>
      <form className= "regForm" action="/Registration" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          maxLength={15}
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          minLength={3}
          maxLength={15}
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="reEnterPassword"
          minLength={3}
          maxLength={15}
          placeholder="Confirm Password"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="secquestion"
          maxLength={40}
          placeholder="Security Question"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="secanswer"
          maxLength={40}
          placeholder="Security Answer"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          maxLength={200}
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input type="submit" value="Sign Up"/><br></br>
        
      </form>
    </div>
  );
};

export default Registration;