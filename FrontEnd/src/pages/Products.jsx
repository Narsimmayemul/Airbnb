import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UrlContext } from '../context/url'
import { Box, Button,useToast ,Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, Image, Select, Stack, Text } from '@chakra-ui/react';
import { OrbitProgress } from 'react-loading-indicators';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import wished from './img/wish/wished.png'
import wish from './img/wish/wish.png'

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useContext(UrlContext);
  const [cartData, setCartData] = useState([]);
  const [wishData, setWishData] = useState([]);
  const [addCart, setAddCart] = useState([]);
  const userID = localStorage.getItem('user');
  const navigate = useNavigate();
  const toast = useToast()

  const [showPopup, setShowPopup] = useState(false);
  const [duplicateItem, setDuplicateItem] = useState(null);

  

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}api/WineData/`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error from Products Page :' + error);
    }
  }

  const handleFilter = async (e) => {
    setIsLoading(true);
    const filterValue = e.target.value;
    try {
      const res = await axios.get(`${url}api/WineData/${filterValue}`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error from Filter :' + error);
    }
  }

  const handleSort = (e) => {
    const str = e.target.value;
    const sortedData = [...data];
    if (str === 'SortPrice(High)') {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (str === 'SortPrice(Low)') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (str === 'Sort(High)') {
      sortedData.sort((a, b) => b.rating - a.rating);
    } else if (str === 'Sort(Low)') {
      sortedData.sort((a, b) => a.rating - b.rating);
    }
    setData(sortedData);
  }

  useEffect(() => {
    getData();
  }, []);


  const handleAddtoCart = async (item) => {
    if (!userID) {
      navigate('/signin');
      throw new Error("Need to login");
    }
    try {
      const obj = {
        id: item.id,
        img_url: item.img_url,
        name: item.name,
        category: item.category,
        flag: item.flag,
        price: item.price,
        rating: item.rating,
        owner: userID
      };

      const res = await axios.post(`${url}api/WineData/cartpost`, obj);
      // console.log('Response from server:', res.data);

      setCartData([...cartData, item]);

      setAddCart((prev) => {
        const isAdded = prev.find(wishItem => wishItem.id === item.id);
        if (isAdded) {
          return prev.filter(wishItem => wishItem.id !== item.id);
        } else {
          return [...prev, item];
        }
      });
    } catch (error) {
      const mes = error.response.data;
      toast({
        title: mes,
        // description: mes,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'top'
      })
      console.log('Error from adding to cart:', error);
    }
  };

  const handleWishList = async (item) => {
    if (!userID) {
      navigate('/signin');
      throw new Error("Need to login");
    }
    
    try {
      const obj = {
        id: item.id,
        img_url: item.img_url,
        name: item.name,
        category: item.category,
        flag: item.flag,
        price: item.price,
        rating: item.rating,
        owner: userID
      };

      const res = await axios.post(`${url}api/WineData/wish`, obj);
      // console.log('Response from server:', res.data);

      setWishData((prev) => {
        const isWished = prev.find(wishItem => wishItem.id === item.id);
        if (isWished) {
          return prev.filter(wishItem => wishItem.id !== item.id);
        } else {
          return [...prev, item];
        }
      });
    } catch (error) {
      const mes = error.response.data;
      toast({
        title: mes,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'top'
      })
      console.log('Error from adding to wishlist:', error);
    }
  };

  const isAdded = (item)=>{
    return addCart.find(c => c.id === item.id)
  }

  const isWished = (item) => {
    return wishData.find(wishItem => wishItem.id === item.id);
  };

  const handleDetails = (item)=>{
    navigate(`/product/${item._id}`, { state: { product: item } });
  }

  return (
    <Box bg={'#fff8e9'}>
      <Box>
        <Text color={'black'} display={'flex'} fontWeight={'bold'} fontFamily={'Times New Roman Times serif'} ml={'7%'} fontSize={'35px'} alignSelf={'start'}>Products</Text>
      </Box>

      {/* Filters */}
      <Box display={'flex'} justifyContent={'space-around'}>
        <Box>
          <Select border={'1px solid black'} bg={'#fff8e9'} onChange={handleFilter}>
            <option style={{ background: '#fff8e9', border: '1px solid black' }} value={''}>All Wines</option>
            <option style={{ background: '#fff8e9', border: '1px solid black' }} value={'WhiteWine'}>White Wine</option>
            <option style={{ background: '#fff8e9', border: '1px solid black' }} value={'RedWine'}>Red Wine</option>
            <option style={{ background: '#fff8e9', border: '1px solid black' }} value={'SparklingWine'}>Sparkling Wine</option>
            <option style={{ background: '#fff8e9', border: '1px solid black' }} value={'DessertWine'}>Dessert Wine</option>
          </Select>
        </Box>

        <Box>
          <Select border={'1px solid black'} bg={'#fff8e9'} onChange={handleSort}>
            <option style={{ background: '#fff8e9' }} value={''}>Sort By:</option>
            <option style={{ background: '#fff8e9' }} value={'SortPrice(High)'}>Sort By Price (High to Low)</option>
            <option style={{ background: '#fff8e9' }} value={'SortPrice(Low)'}>Sort By Price (Low to High)</option>
            <option style={{ background: '#fff8e9' }} value={'Sort(High)'}>Sort By Rating (High to Low)</option>
            <option style={{ background: '#fff8e9' }} value={'Sort(Low)'}>Sort By Rating (Low to High)</option>
          </Select>
        </Box>
      </Box>

      {/* Products */}
      {isLoading ? <OrbitProgress variant="dotted" color="#32cd32" size="large" text="" textColor="#2d9f0e" /> :
        <Box bg={'#fff8e9'} p={10} display={'grid'} justifyContent={'center'} gridTemplateColumns={{ lg: 'repeat(3,1fr)', md: 'repeat(2,1fr)', base: 'repeat(1,1fr)' }} gap={'20px'}>
          {data.map((e, i) => (
            <Card boxShadow={'0px 0px 3px 0px'} borderRadius={'15px'} bg={'#fff8e9'} key={e._id} display={'flex'} justifyContent={'center'} flexDirection={{ md: 'row', sm: 'row', lg: 'row', base: 'column' }} w={'100%'} p={3}>
              <CardHeader onClick={()=>handleDetails(e)} cursor={'pointer'} display={'flex'} w={{ base: '100%', sm: '30%', md: '35%' }} justifyContent={'center'}>
                <Image h={'250px'} w={{ base: '50%', sm: '100%' }} mixBlendMode={'darken'} src={e.img_url} />
              </CardHeader>

              <CardBody justifyContent={'center'} alignItems={'start'} display={'flex'} flexDirection={'column'}>
                <Box alignSelf={'start'} display={'flex'} justifyContent={'space-between'}>
                  <Text color={'black'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>⭐{e.rating + `.${e.rating + e.rating - 2}`}</Text>
                 
                  {/* WishList Img */}
                  <Image
                    className='WishList'
                    src={isWished(e) ? wish : wished}
                    w={'15%'}
                    cursor={'pointer'}
                    onClick={() => handleWishList(e)}
                  />
                </Box>

                <Box>
                  <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>{e.name}</Text>
                </Box>

                <Box display={'flex'} gap={5}>
                  <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>{e.price}</Text>
                  <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'} textDecoration={'line-through'}>{e.price + Math.ceil(e.price / 25)}</Text>
                  <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>{`${Math.floor(63 + i % 20)}%`}</Text>
                </Box>

                <hr style={{ border: '1px solid black', width: '100%' }} />

                <Box display={'flex'} h={'70px'} gap={5}>
                  <Image mt={'10px'} src={e.flag} h={'40%'} />
                  <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'} mb={'10px'}>{e.region}</Text>
                </Box>
                <Box justifyContent={'center'} display={'flex'} w={'100%'}>
                  <Button onClick={() => handleAddtoCart(e)} bg={''} border={'1px solid black'} w={'90%'} _hover={{ background: 'green', border: '1px solid grey' }}>{isAdded(e)?"Added to Cart":"Add to Cart"}</Button>
                </Box>
              </CardBody>
            </Card>
          ))}
        </Box>
      }
    </Box>
  )
}

export default Products;
