// UserLookupForm.js (React Component)

import React, { useState } from 'react';

const UserLookupForm = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [userSearchId,setUserSearchId] = useState('')
  // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com'
  const backendUrl = 'https://nanobot-backend.onrender.com/';

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${backendUrl}users/${userSearchId}`);
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
    <div className="userLookupContainer">
     <h1 style={{marginLeft:'5px'}}>Look Up User by ID</h1>
    <div className="userLookup">

      <form className="lookupForm" onSubmit={handleSubmit}>
        <input
          className="lookupInput"
          type="number"
          placeholder="Enter User ID"
          value={userSearchId}
          onChange={(e) => setUserSearchId(e.target.value)}
        />
        <button className="lookupBtn" type="submit">Search</button>
      </form>

      {error && <p className="lookupErr" style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div className="userDetailsContainer">
          <h2 className="userDetailsHeader">User Details</h2>
          <p  className="margin-left">{user.username}</p>
          <div className="margin-left userUsername">username</div>
          <p className="margin-left">{user.email}</p>
          <div className="margin-left userEmail">email</div>
        </div>
      )}
    </div>
    </div>


  );
};

export default UserLookupForm;
