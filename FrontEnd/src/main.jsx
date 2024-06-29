import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react';
import { UrlContextProvider } from './context/url.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <UrlContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UrlContextProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
