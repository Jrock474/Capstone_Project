import React from 'react'
import { useState } from 'react';

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        secanswer: '',
        newPassword: ''
      });
    
      const [errorFound, setErrorFound] = useState('');
      const [securityQuestion, setSecurityQuestion] = useState('');
      const handleQuestionSubmit = async (e) => {
        e.preventDefault();
    
        // Clear the email input field after 2nd form button is pressed
        setFormData({ ...formData, email: '' });
    
        const questionResponse = await fetch(`https://capstone-project-j8cd-yibhwja4f-jrock474.vercel.app/getQuestion/${formData.email}`);
    
        if (questionResponse.status === 200) {
          const question = await questionResponse.text();
          setSecurityQuestion(question);
        } else {
          setErrorFound('Email not found');
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorFound("")
    
        // Clear the input fields after functions goes off
        setFormData({ email: '', secanswer: '', newPassword: '' });
    
        // check if the email exists before attempting deletion
        const checkResponse = await fetch(`https://capstone-project-j8cd-yibhwja4f-jrock474.vercel.app/checkEmail?email=${formData.email}`);
    
        if (checkResponse.status !== 200) {
          setErrorFound('Email not found');
          return;
        }
    
        const expectedResponse = await fetch(`https://capstone-project-j8cd-yibhwja4f-jrock474.vercel.app/getAnswer/${formData.email}`);
    
        if (expectedResponse.status === 200) {
          const expectedAnswer = await expectedResponse.text();
          //error check for wrong answer
          if (formData.secanswer !== expectedAnswer) {
            setErrorFound('Wrong Answer');
            return;
          }
          // Compare the entered security answer with the expected answer
          if (formData.secanswer === expectedAnswer) {
            
            //this is where the update password logic goes      
            const updateResponse = await fetch('https://capstone-project-j8cd-yibhwja4f-jrock474.vercel.app/UpdatePassword', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
    
            if (updateResponse.status === 200) {
              console.log(`User ${formData.username} password updated successfully`);
              setErrorFound(`User ${formData.username} password updated Successfully`);
            } else {
              console.error(`User ${formData.username} password update failed`);
              setErrorFound(`User ${formData.username} password update failed`);
            }
          }
        }
      };
    
    
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      return (
        <div className='updateMain'>
          <img src={"./images/ResetPassword.PNG"} style={{height: 185, marginBottom: 30}} />
          <div>
            <form className="QuestionForm" onSubmit={handleQuestionSubmit}>
              <input
                onChange={handleChange}
                type="email"
                placeholder='Email'
                name="email"
                required
                value={formData.email} // Set the input value (for question form)
                maxLength={200}
                className='margin-for-inputs'
              />
              <input type="submit" value="Get Security Question" className= "submitBtn"/>
            </form>
            {securityQuestion && <div className="secquestion">{securityQuestion}</div>}
          </div>
          <form className= "centeringForInputs" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="email"
              placeholder='Email'
              name="email"
              required
              maxLength={200}
              value={formData.email} // Set the input value of email (using props)
              className= "centeringForInputs"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder='Security Answer'
              name="secanswer"
              required
              maxLength={200}
              value={formData.secanswer} // Set the input value for clearing
              className= "centeringForInputs"
            />
            <input
          onChange={handleChange}
          type="password" // Input for the new password
          placeholder="New Password"
          name="newPassword"
          required
          maxLength={200}
          value={formData.newPassword}
          className= "centeringForInputs"
        />
            <input type="submit" value="Update Password" className= "submitBtn"/>
          </form>
          {errorFound && <div className="errorD">{errorFound}</div>}
        </div>
      );
    };

export default UpdatePassword