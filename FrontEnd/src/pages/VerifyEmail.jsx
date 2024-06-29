import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UrlContext } from '../context/url';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { url } = useContext(UrlContext);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}api/verify`, { email, verificationCode });
      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      console.log(error.response.data.message)
      setError(error);
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Verification Code</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyEmail;
