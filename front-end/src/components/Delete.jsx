import React, { useState } from 'react';

const Delete = () => {
  const [formData, setFormData] = useState({
    email: '',
    secanswer: ''
  });

  const [errorFound, setErrorFound] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First, check if the email exists before attempting deletion
    const checkResponse = await fetch(`http://localhost:3000/checkEmail?email=${formData.email}`);

    if (checkResponse.status !== 200) {
      setErrorFound('Email not found');
      return;
    }

    const expectedResponse = await fetch(`http://localhost:3000/getAnswer/${formData.email}`);

    if (expectedResponse.status === 200) {
      const expectedAnswer = await expectedResponse.text();

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

        if (deleteResponse.status === 200) {
          console.log('User deleted successfully');
          setErrorFound('User Deleted Successfully');
        } else {
          console.error('User deletion failed');
          setErrorFound('User deletion failed');
        }
      }
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

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
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder='Security Answer'
          name="secanswer"
          required
        />
        <input type="submit" value="Delete User" />
      </form>
      {errorFound && <div className="errorD">{errorFound}</div>}
    </div>
  );
};

export default Delete;