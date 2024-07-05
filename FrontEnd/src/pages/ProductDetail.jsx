import React, { useContext, useEffect, useState } from 'react'
import { UrlContext } from '../context/url';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Image } from '@chakra-ui/react';

const ProductDetail = () => {
    const location = useLocation();
  const { product } = location.state;

    // const getData = async()=>{
    //     const id = '123'
    //     console.log(product)
    //     try {
    //       const res = await axios.get(`${url}api/WineData`);
    //       setData(res.data);
    //       console.log(res.data);
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }  
    //   useEffect(() => {
    //   getData()
    //   }, [])
  return (
  <Box>
    <Box>
        <Image src={product.img_url}/>
    </Box>
  </Box>
  )
}

export default ProductDetail
