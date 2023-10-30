import React, { useState } from 'react';

const Delete = () => {
  const [formData, setFormData] = useState({
    email: '',
    secanswer: ''
  });

  const [errorFound, setErrorFound] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First, check if the email exists before attempting deletion
    const checkResponse = await fetch(`http://localhost:3000/checkEmail?email=${formData.email}`);

    if (checkResponse.status !== 200) {
      setErrorFound('Email not found');
      return;
    }

    const checkResponse2 = await fetch(`http://localhost:3000/checkAnswer?secanswer=${formData.secanswer}`);

    if (checkResponse2.status !== 200) {
      setErrorFound('Wrong Answer');
      return;
    }

    // If email exists, proceed with the deletion
    const deleteResponse = await fetch('http://localhost:3000/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (deleteResponse.status === 200) { //delete on proper server response (done to connect to backend)
      console.log('User deleted successfully');
      setErrorFound('User Deleted Successfully');
    } else {
      console.error('User deletion failed');
      setErrorFound('User deletion failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='deleteMain'>
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
      {errorFound && <div className="error-message">{errorFound}</div>}
    </div>
  );
};

export default Delete;