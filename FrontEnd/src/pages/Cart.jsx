import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { UrlContext } from '../context/url';
import axios from 'axios';

const Cart = () => {
  const {url} = useContext(UrlContext);
  const [data , setData] = useState([]);
  const id = localStorage.getItem('user');

  const getData = async()=>{
    try {
      const res = await axios.get(`${url}api/WineData/cart/${id}`);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  }  

  useEffect(() => {
  getData()
  }, [])
  return (
    <div>
      Cart
    </div>
  );
}

export default Cart;
