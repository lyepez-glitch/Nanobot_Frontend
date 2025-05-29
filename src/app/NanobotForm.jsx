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
    // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com'
    // const backendUrl = "https://nanobot-backend.onrender.com/";
    const backendUrl = "https://nanobot-backend.onrender.com/";
    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
    // try{
    //   const response = await fetch(`${backendUrl}nanobots`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }

    //   });
    //   const data = await response.json();
    //   console.log('Nanobots:', data);
    // }catch(err){
    //   console.log('err',err);
    // }

    try {
      const response = await fetch(`${backendUrl}nanobots`, {
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

      const fetchedBots = await fetch(`${backendUrl}nanobots`);
      // const botsData = await fetchedBots;
      console.log(fetchedBots)
      const botsData = await fetchedBots.json();
      console.log('botsdata ',botsData);
      setNanobots(botsData);
    } catch (err) {
      console.log('err msg',err.message);
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="nanobotContainer">
      <h1>Create Nanobot</h1>
      <form className ="nanoForm" onSubmit={handleSubmit}>


            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />




            <input
              placeholder="User Id"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />




            <input
              placeholder="Status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />


        <button type="submit">Create Nanobot</button>
        {error && <p className="nanoFormErr">{error}</p>}
        {success && <p className="nanoFormSuccess">{success}</p>}
      </form>


    </div>
  );
};

export default NanobotForm;
