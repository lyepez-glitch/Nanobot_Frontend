// UserLookupForm.js (React Component)

import React, { useState } from 'react';

const UserLookupForm = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [userSearchId,setUserSearchId] = useState('')
  const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com'

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/users/${userSearchId}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUser(data);
      setError('');
      setUserSearchId('');
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  return (
    <div>
      <h1>Look Up User by ID</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter User ID"
          value={userSearchId}
          onChange={(e) => setUserSearchId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h2>User Details</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserLookupForm;
