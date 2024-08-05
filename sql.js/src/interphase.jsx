// src/components/Interphase.jsx
import React, { useState } from 'react';

const Interphase = ({ onSubmit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(id, name); // Call the parent function to handle the submission
    setId(''); // Clear the form fields
    setName('');
  };

  let handleChange = () =>{
    
    console.log(result);
    
  }

  return (
    <div>
      <h2>Add New Record</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Data</button>
        <button type="button" onChange={handleChange}>Remove Data</button>
      </form>
    </div>
  );
};

export default Interphase;
