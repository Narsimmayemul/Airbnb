import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/auth';
import Cart from './pages/Cart';
import Home from './pages/Home'
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Profile from './pages/Profile';
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import {Route, Router, Routes} from 'react-router-dom';
import Wishlist from './pages/Wishlist';

function App() {

  return (
    <div>
    <Navbar />
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      {/* <PrivateRoute>
      <Route path='/' element={<Home />}/>
      </PrivateRoute> */}
      <Route path='/' element={<Home />}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/verify' element={<VerifyEmail/>}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/wishlist' element={<Wishlist />}/>
      <Route path='/cart' element={<Cart />}/>
    </Routes>
    <Footer />
    </div>
  )
}

export default App
