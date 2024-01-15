// pages/index.js
import React, { useState } from 'react';
// import {} from './'
export default function Hume() {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('./api/checkName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {result !== null && (
        <p>
          {result === 1 ? 'Name exists in the database.' : 'Name added to the database.'}
        </p>
      )}
    </div>
  );
};
