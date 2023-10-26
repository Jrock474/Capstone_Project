import React from 'react'
import { useState } from 'react'
const Registration = () => {
const [formData, setformData] = 
useState({
  username:"",
  password:"",
  reEnterPassword:"",
  securityQuestion:"",
  securityAnswer:"",
  email:""
})
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData);
};
const handleChange = (e) => {
  const { name, value } = e.target;
  setformData({ ...formData, [name]: value });
};



  return (
    <div>
      Registration
      <form action="/Registration" method="post" onSubmit={handleSubmit}>
      <input type="text" name='username' placeholder='Username' required onChange={handleChange}/>
      <input type="password" name='password' placeholder='Password' required onChange={handleChange}/>
      <input type="password" name='reEnterPassword' placeholder='Confirm Password' required onChange={handleChange}/>
      <input type="text" name='securityQuestion' placeholder='Security Question' required onChange={handleChange}/>
      <input type="text" name='securityAnswer' placeholder='Security Answer' required onChange={handleChange}/>
      <input type="email" name='email' placeholder='Email' required onChange={handleChange}/>
      {/* <input type="submit" /> */}
      <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Registration
