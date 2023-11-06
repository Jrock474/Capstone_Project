import React, { useContext, useState } from 'react';
import { UserData } from '../App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Music7 from './MusicFolder/RegistrationOst';
const Registration = () => {

  const [userData, setUserData] = useContext(UserData)
//access user data from the provider
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
// initialized error variable
  const handleSubmit = async (e) => {
    setErrorFound("") //clear old errors
    e.preventDefault();

    // Check if the passwords match
    if (formData.password !== formData.reEnterPassword) {
      setErrorFound('Passwords do not match');
      return; // Stop form submission
    } 
    
    // Proceed with form submission
    console.log(formData.username);

    // On submit of the form, send a POST request with the data to the server.
    const registrationesponse = await fetch('https://capstone-project-1cyy.vercel.app/Registration', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

    if (!registrationesponse.ok) {
      // on Successful login
      const registrationData = await registrationesponse.json()
      return setErrorFound(registrationData)
    } else {
      const registrationData = await registrationesponse.json()
      setUserData(registrationData)
      console.log(registrationData)
      navigate("/PlayGame")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //Updated the form data when the input is changed.
  };
  
  return (
    <div className='regMain'>
      <Music7/>
      <img src={"/images/SignUp.png"} className="SignInButtonNoHover" style= {{ marginBottom: 15 }} />
      <div>{errorFound && <div className="errorD">{errorFound}</div>}</div> 
      <form action="/Registration" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          maxLength={15}
          placeholder="Username"
          required
          onChange={handleChange}
          className= "centeringForInputs"
        />
        <input
          type="password"
          name="password"
          minLength={3}
          maxLength={15}
          placeholder="Password"
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
        <button type="submit" className= "submitBtn">Sign Up and Recieve Email</button>
        {/* <input type="submit" value="Sign Up" className= "submitBtn" /> */}
        <br></br>
        <Link to="/Login" className='links-for-reRoutes'>Already Have An Account?</Link>
        
      </form>
    </div>
  );
};

export default Registration;
