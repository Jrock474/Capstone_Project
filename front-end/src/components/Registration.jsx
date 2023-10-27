import React, { useState } from 'react';

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
    <div>
      <div>{errorFound && <div className="error">{errorFound}</div>}</div>
      Registration
      <form action="/Registration" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="reEnterPassword"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="secquestion"
          placeholder="Security Question"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="secanswer"
          placeholder="Security Answer"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
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