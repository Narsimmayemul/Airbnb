import React, { useContext, useEffect, useState } from 'react'
import { UrlContext } from '../context/url';
import axios from 'axios';
import { Box, Button, Card, CardBody, CardHeader, Image, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import remove from './img/wish/remove.png'

const Wishlist = () => {
  const {url} = useContext(UrlContext);
  const [data , setData] = useState([]);
  const [mess, setMess ] = useState(false);
  const id = localStorage.getItem('user');
  const toast = useToast()

  const navigate = useNavigate();

  const getData = async()=>{
    try {
      const res = await axios.get(`${url}api/WineData/wish/${id}`);
      setData(res.data);
      if(res.data.length == 0){
        setMess(true)
      }else{
        setMess(false)
      }
      // console.log(res.data);
    } catch (error) {
      toast({
        title: "Error",
        status: 'error',
        description:'Please Refresh the page',
        duration: 5000,
        isClosable: true,
        position:'top'
      })
      // console.log(error)
    }
  }
  
  const deleteData = async(e)=>{
    try {
      const res = await axios.delete(`${url}api/WineData/wish/${e._id}`);
      // setData(res.data);
      getData()
      console.log(res.data);
    } catch (error) {
      toast({
        title: "Error",
        status: 'error',
        description:'Please Refresh the page',
        duration: 5000,
        isClosable: true,
        position:'top'
      })
      console.log(error)
    }
  }  


  const handleDetails = (item)=>{
    navigate(`/product/${item._id}`, { state: { product: item } });
  }

  useEffect(() => {
  getData()
  }, [])
  return (
<Box>
    <Box>
      <Text color={'black'} display={'flex'} fontWeight={'bold'} fontFamily={'Times New Roman Times serif'} ml={'7%'} fontSize={'35px'} alignSelf={'start'}>Wishlist</Text>
    </Box>

    {mess? <Text color={'black'} display={'flex'} fontWeight={'bold'} fontFamily={'Times New Roman Times serif'} ml={'7%'} fontSize={'35px'} justifyContent={'center'}>Wishlist is Empty</Text>:
    <Box bg={'#fff8e9'} p={10} display={'grid'} justifyContent={'center'} gridTemplateColumns={{ lg: 'repeat(3,1fr)', md: 'repeat(2,1fr)', base: 'repeat(1,1fr)' }} gap={'20px'}>


    {data.map((e, i) => (
      <Card boxShadow={'0px 0px 3px 0px'} borderRadius={'15px'} bg={'#fff8e9'} key={e._id} display={'flex'} justifyContent={'center'} flexDirection={{ md: 'row', sm: 'row', lg: 'row', base: 'column' }} w={'100%'} p={3}>
        <CardHeader  display={'flex'} w={{ base: '100%', sm: '30%', md: '35%' }} justifyContent={'center'} >
          <Image  h={'250px'} w={{ base: '50%', sm: '100%' }} mixBlendMode={'darken'} src={e.img_url} />
        </CardHeader>

        <CardBody justifyContent={'center'} alignItems={'start'} display={'flex'} flexDirection={'column'}>
          <Box alignSelf={'start'} display={'flex'} justifyContent={'space-between'}>
            <Text color={'black'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>⭐{e.rating + `.${e.rating + e.rating - 2}`}</Text>
            <Image cursor={'pointer'} src={remove} alt='Remove' w={'15%'} onClick={()=>deleteData(e)}/>
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
            <Button bg={''} border={'1px solid black'} w={'90%'} _hover={{ background: 'green', border: '1px solid grey' }} onClick={()=>handleDetails(e)}>View Product</Button>
          </Box>
        </CardBody>
      </Card>
    ))}
    </Box>
}
    </Box>
  )
}

export default Wishlist
