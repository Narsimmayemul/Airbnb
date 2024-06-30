import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UrlContext } from '../context/url';
import './styles/LoginStyle.css';
import { useNavigate } from 'react-router-dom';
import { emailContext } from '../context/email';
import {OrbitProgress, ThreeDot} from 'react-loading-indicators';

const Login = () => {
  const navigate = useNavigate()
  const { url } = useContext(UrlContext);
  const {setUserMail} = useContext(emailContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const endpoint = isSignUp ? 'api/signup' : 'api/signin';
      const payload = isSignUp ? { email, password, username } : { email, password };
      const response = await axios.post(`${url}${endpoint}`, payload);
    //   console.log(response.data);
      const token = response.data.token;
      const userData = response.data.user;
      localStorage.setItem('token' , token);
      localStorage.setItem('user' , userData._id);
      
      setIsLoading(false)
      if(isSignUp){
        setUserMail(response.data.user)
        navigate('/verify')
      }else{
          navigate('/')
        }
    } catch (error) {
      setIsLoading(false)
        console.log(error)
      setError(error.response.data.error);
    }
  };

  

  return (
    <div className={`parent ${isSignUp ? 'signup-mode' : ''}`}>
      <div className='Container'>
        <div>
          <strong><h2 style={{ fontSize: '40px', textDecoration: 'bold' }}>{isSignUp ? 'Sign Up' : 'Sign In'}</h2></strong>
        </div>
        
        {error && <p>{error}</p>}
        {isLoading ? <OrbitProgress variant="dotted" color="#32cd32" size="large" text="" textColor="#2d9f0e" />: 
        <form onSubmit={handleSubmit} className='form_class'>
          {isSignUp && (
            <div className='input_lable'>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={isSignUp}
                placeholder='Username'
              />
            </div>
          )}
          <div className='input_lable'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
            />
          </div>
          <div className='input_lable'>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </div>
          <button className='btn' type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
          <div style={{cursor:'pointer'}}>
            <p>Forgot Password !</p>
          </div>
        </form>
}
      </div>

      <div className='secoundHalf'>
        <div>
          <h2 style={{ fontSize: '35px' }}>Welcome to MineWine!</h2>
        </div>
        <div>
          <h4 style={{ fontSize: '20px' }}>FREE SHIPPING FOR ALL ORDERS OF $1000 OR MORE...</h4>
        </div>
        <div>
          <button className='btn' onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Sign In' : 'Sign Up'}</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
