// NanobotForm.js (React Component)

import React, { useState } from 'react';

const NanobotForm = ({setNanobots}) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newNanobot = { name, userId, status };
    const backendUrl = 'http://localhost:8081'
    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

    try {
      const response = await fetch(`${backendUrl}/nanobots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNanobot),
      });

      if (!response.ok) {
        throw new Error('Failed to create nanobot');
      }

      const data = await response.json();
      setSuccess('Nanobot created successfully!');
      setError('');
      // Optionally clear the form
      setName('');
      setUserId('');
      setStatus('');

      const fetchedBots = await fetch(`${backendUrl}/nanobots`);
      const botsData = await fetchedBots.json();
      setNanobots(botsData);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Create Nanobot</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            User ID:
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Create Nanobot</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default NanobotForm;
