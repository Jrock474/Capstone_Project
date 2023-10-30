import React, { useState } from 'react';

const Delete = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On submit of the form, send a DELETE request with the email data to the server.
    await fetch('http://localhost:3000/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('DELETE request sent');
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
        <input type="submit" value="Delete User" />
      </form>
    </div>
  );
};

export default Delete;