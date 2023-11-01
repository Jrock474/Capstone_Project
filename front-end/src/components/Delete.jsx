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
    const checkResponse = await fetch(`http://localhost:3000/checkEmail?email=${formData.email}`);

    if (checkResponse.status !== 200) {
      setErrorFound('Email not found');
      return;
    }

    const expectedResponse = await fetch(`http://localhost:3000/getAnswer/${formData.email}`);

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
        const deleteResponse = await fetch('http://localhost:3000/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const deletedUser = await deleteResponse.json()

        if (deleteResponse.status === 200) {
          console.log(deletedUser.username);
          setErrorFound(`${deletedUser.username} Deleted Successfully`);
        } else {
          console.error(`User ${formData.username} deletion failed`);
          setErrorFound(`User ${formData.username} deletion failed`);
        }
      }
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    // Clear the email input field after 2nd form button is pressed
    setFormData({ ...formData, email: '' });

    const questionResponse = await fetch(`http://localhost:3000/getQuestion/${formData.email}`);

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
          />
          <input type="submit" value="Get Security Question" />
        </form>
        {securityQuestion && <div className="secquestion">{securityQuestion}</div>}
      </div>
      <form className="deleteForm" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          placeholder='Email'
          name="email"
          required
          maxLength={200}
          value={formData.email} // Set the input value of email (using props)
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder='Security Answer'
          name="secanswer"
          required
          maxLength={50}
          value={formData.secanswer} // Set the input value for clearing
        />
        <input type="submit" value="Delete User" />
      </form>
      {errorFound && <div className="errorD">{errorFound}</div>}
    </div>
  );
};

export default Delete;
