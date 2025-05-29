// NanobotSearchForm.js (React Component)

import React, { useState } from 'react';

const NanobotSearchForm = ({}) => {
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [nanobot,setNanobot] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNanobot(null);
    // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com';

    const backendUrl = 'https://nanobot-backend.onrender.com/';


    try {
      const response = await fetch(`${backendUrl}nanobots/${id}`);
      if (!response.ok) {
        throw new Error('Nanobot not found');
      }

      const data = await response.json();
      setNanobot(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nanoSearchContainer">
      <h1 style={{ marginLeft: '7px'}}>Search Nanobot by ID</h1>
      <form className="nanoSearchForm" onSubmit={handleSubmit}>
        <div>

            <input
              placeholder="Nanobot ID"
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />

        </div>
        <button className="nanoSearchBtn" type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red',textAlign: 'center', marginTop: '5px' }}>{error}</p>}

      {nanobot && Object.keys(nanobot).length > 0 && (
        <div className="nanoDetails">
          <h2>Nanobot Details</h2>
          <p><strong>ID:</strong> {nanobot.id}</p>
          <p><strong>Name:</strong> {nanobot.name}</p>
          <p><strong>User ID:</strong> {nanobot.userId}</p>
          <p><strong>Status:</strong> {nanobot.status}</p>
        </div>
      )}
    </div>
  );
};

export default NanobotSearchForm;
