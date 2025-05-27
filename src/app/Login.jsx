// components/UserLogin.js
import { useState,useEffect } from 'react';

const Login = ({setUserId,setLoggedIn,setSignUp}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  // const backendUrl = 'http://localhost:8081';
  const backendUrl = 'https://nanobot-backend.onrender.com/';
  useEffect(() => {
    if (successMessage) {
      setError('');
      setSignUp(true);
      setLoggedIn(true);
    }
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${backendUrl}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('login response', data, res.status);

      if (res.status === 200) {
        setSuccessMessage('Login successful!');
        setEmail('');
        setPassword('');
        setUserId(data.id);
        // onLoginSuccess();
        setLoggedIn(true);
        setSignUp(true);
        setError('');
      } else {
        setError(data.error || 'Login failed. Please check your credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id = "loginWrapper" className="flex justify-center items-center h-screen bg-gray-100">
      <div id="loginContainer" className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2> */}
        {/* {error && <div style={{position:'absolute'}} className="text-red-500 text-center mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>} */}
        <form onSubmit={handleSubmit}>
          <div className="loginInputDiv mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="loginInputDiv mb-6">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </form>
        {error && <div className="error text-red-500 text-center mb-4">{error}</div>}
        {successMessage && <div className="success text-green-500 text-center mb-4">{successMessage}</div>}
        <div class="divideContainer">
          <div className="divider"></div>
          <span className={`mx-4 text-sm ${error?'erroror':'or'} ${successMessage?'successor':''}`}>or</span>
          {/* <span className="or mx-4 text-sm">OR</span> */}
          <div className="divider"></div>
        </div>
        <p className="loginInputDiv text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
