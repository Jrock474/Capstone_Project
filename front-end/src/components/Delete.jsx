import React, { useState } from 'react';

const Delete = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    secanswer: ''
  });

  const [errorFound, setErrorFound] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear the input fields after delete function goes off
    setFormData({ email: '', secanswer: '' });

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
        // If email exists and security answer is correct, proceed with the deletion
        const deleteRequest = await fetch('https://capstone-project-j8cd-yibhwja4f-jrock474.vercel.app/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const deletedResponse = await deleteRequest.json()

        if (deleteRequest.status === 200) {
          console.log(deletedResponse.username);
          setErrorFound(`${deletedResponse.username} Deleted Successfully`);
        } else {
          console.error(`User ${formData.username} deletion failed`);
          setErrorFound(deletedResponse);
        }
      }
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setErrorFound(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='deleteMain'>
      <img src={"./images/DeleteAccount.PNG"} style={{height: 200, marginBottom: 20}} />
      <div>
        <form className="QuestionForm" onSubmit={handleQuestionSubmit}>
          <input
            onChange={handleChange}
            type="email"
            placeholder='Email'
            name="email"
            required
            maxLength={200}
            value={formData.email} // Set the input value (for question form)
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
          className='margin-for-inputs'
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder='Security Answer'
          name="secanswer"
          required
          maxLength={50}
          value={formData.secanswer} // Set the input value for clearing
          className='margin-for-inputs'
        />
        <input type="submit" value="Delete User" className= "submitBtn"/>
      </form>
      {errorFound && <div className="errorD">{errorFound}</div>}
    </div>
  );
};

export default Delete;
