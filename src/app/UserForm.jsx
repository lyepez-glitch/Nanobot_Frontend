// components/UserForm.js
import { useState } from 'react';

const UserForm = ({setUserId,setSignUp}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [clicked, setClicked] = useState(false);
  // const backendUrl = 'http://a7f784e35db984efbbb175fb2dc129c0-486246873.us-east-1.elb.amazonaws.com'
  const backendUrl = 'https://nanobot-backend.onrender.com/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${backendUrl}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      console.log('user data',data);

      if (res.status === 201) {
        setSuccessMessage('User created successfully!');
        setUsername('');
        setUserId(data.id);
        setEmail('');
        setPassword('');
        setSignUp(true);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="signUpContainer">

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form id="signUpForm" onSubmit={handleSubmit}>
      <h2 id="signupHeader">Sign up for a new account</h2>

        <div>
          <label htmlFor="username">Username</label>
          <input
            className="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>

          <input
            className={`email ${clicked?'':''}`}
            onClick={() => setClicked(true)}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button id="signUpBtn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
