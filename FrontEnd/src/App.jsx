import './App.css';
import { AuthProvider } from './context/auth';
import Home from './pages/Home'
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import {Route, Router, Routes} from 'react-router-dom';

function App() {

  return (
    <div>
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      {/* <PrivateRoute>
      <Route path='/' element={<Home />}/>
      </PrivateRoute> */}
      <Route path='/' element={<Home />}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/verify' element={<VerifyEmail/>}/>
    </Routes>
    </div>
  )
}

export default App
