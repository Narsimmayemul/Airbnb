import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UrlContext } from '../context/url';
import { useNavigate } from 'react-router-dom';
import { emailContext } from '../context/email';
import './styles/VerifyStyle.css'
import { OrbitProgress } from 'react-loading-indicators';

const VerifyEmail = () => {
  const { url } = useContext(UrlContext);
  // const [email, setEmail] = useState('');
  const {userMail} = useContext(emailContext);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const mail = userMail.email || "email@gmail.com";
      console.log(mail);
      const response = await axios.post(`${url}api/verify`, { email:mail, verificationCode });
      setMessage(response.data.message);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error)
      setError(error.response.data.message || "Something went wrong go back");
    }
  };

  return (
    <div className='mainDiv'>
      <div className='verifyDiv'>
      <h2>Verify Email</h2>
      {message && <p>{message}</p>}
      {error&& <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label>Verification Code</label> */}
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            placeholder='Verification Code'
            />
        </div>
            {isLoading? <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="#2d9f0e" /> :
        <button className='buttonClass' type="submit">Verify</button>
}
      </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
