
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
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
      setErrorFound(` Registration Successful ${formData.username}`); // Reset error message
    }
    
    // Proceed with form submission
    console.log(formData.username);

    // On submit of the form, send a POST request with the data to the server.
    const registrationesponse = await fetch('http://localhost:3000/Registration', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

    const registrationData = await registrationesponse.json()
    console.log(registrationData)

    navigate("/PlayGame")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div className='regMain'>
      <img src={"/images/SignUp.png"} className="SignInButtonNoHover"></img>
      <div>{errorFound && <div className="errorD">{errorFound}</div>}</div>
      <form className= "centeringForInputs" action="/Registration" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          maxLength={15}
          placeholder="Username (15 letters max)"
          required
          onChange={handleChange}
          className= "centeringForInputs"
        />
        <input
          type="password"
          name="password"
          minLength={3}
          maxLength={15}
          placeholder="Password (length= 3-15)"
          required
          onChange={handleChange}
          className= "centeringForInputs"
        />
        <input
          type="password"
          name="reEnterPassword"
          minLength={3}
          maxLength={15}
          placeholder="Confirm Password"
          required
          onChange={handleChange}
          className= "centeringForInputs"
        />
        <input
          type="text"
          name="secquestion"
          maxLength={40}
          placeholder="Security Question"
          required
          onChange={handleChange}
          className= "centeringForInputs"
        />
        <input
          type="text"
          name="secanswer"
          maxLength={40}
          placeholder="Security Answer"
          required
          onChange={handleChange}
          className= "centeringForInputs"
        />
        <input
          type="email"
          name="email"
          maxLength={200}
          placeholder="Email"
          required
          onChange={handleChange}
          className= "centeringForInputs"
        />
        <input type="submit" value="Sign Up"/><br></br>
        
      </form>
    </div>
  );
};

export default Registration;
