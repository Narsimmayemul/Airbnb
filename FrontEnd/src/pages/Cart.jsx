import React, { useContext, useEffect, useState } from 'react';
import { UrlContext } from '../context/url';
import axios from 'axios';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Image, Input, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import remove from './img/wish/remove.png';

const Cart = () => {
  const { url } = useContext(UrlContext);
  const [data, setData] = useState([]);
  const [mess, setMess] = useState(false);
  const [btn, setBtn] = useState(false);
  const [count, setCount] = useState({});
  const [total, setTotal] = useState(0);
  const [amt, setAmt] = useState(0);
  const [discount, setDiscount] = useState("");
  const id = localStorage.getItem('user');
  const toast = useToast();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`${url}api/WineData/cart/${id}`);
      setData(res.data);
      if (res.data.length === 0) {
        setMess(true);
      } else {
        setMess(false);
      }
      initializeCount(res.data);
      initializeTotal(res.data);
    } catch (error) {
      toast({
        title: "Error",
        status: 'error',
        description: 'Please Refresh the page',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const initializeCount = (products) => {
    const initialCounts = {};
    products.forEach((product) => {
      initialCounts[product._id] = 1; 
    });
    setCount(initialCounts);
  };

  const initializeTotal = (products) => {
    const initialTotal = products.reduce((sum, product) => sum + product.price, 0);
    setTotal(initialTotal);
  };

  const deleteData = async (e) => {
    try {
      await axios.delete(`${url}api/WineData/cart/${e._id}`);
      setTotal((prevTotal) => prevTotal - (count[e._id] * e.price));
      setData((prevData) => prevData.filter((item) => item._id !== e._id));
      const updatedCount = { ...count };
      delete updatedCount[e._id];
      setCount(updatedCount);
    } catch (error) {
      toast({
        title: "Error",
        status: 'error',
        description: 'Please Refresh the page',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleIncrement = (id, price) => {
    setCount((prevCount) => {
      const newCount = { ...prevCount, [id]: prevCount[id] + 1 };
      setTotal((prevTotal) => prevTotal + price);
      return newCount;
    });
  };

  const handleDecrement = (id, price) => {
    setCount((prevCount) => {
      const newCount = { ...prevCount, [id]: prevCount[id] > 0 ? prevCount[id] - 1 : 0 };
      if (newCount[id] >= 0) {
        setTotal((prevTotal) => prevTotal - price);
      }
      return newCount;
    });
  };

  const handleCheckout = ()=>{
    navigate(`/check`, { state: { total: total } });
  }

  const handleDicound = ()=>{
    if(discount == "FIRST20"){
      const dis = total*0.20;
      setAmt(dis)
      setTotal((pre)=>total-dis);
      toast({
        status: 'success',
        description: 'Coupon Applyed',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }else{
      toast({
        status: 'error',
        description: 'Invalid Coupon',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      setBtn(false)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Box>
        <Text color={'black'} display={'flex'} fontWeight={'bold'} fontFamily={'Times New Roman Times serif'} ml={'7%'} fontSize={'35px'} alignSelf={'start'}>Cart Page</Text>
      </Box>

      <Box display={'flex'} justifyContent={'center'} flexDirection={{ base: 'column', md: 'row' }} w={'100%'}>
        <Box bg={'#fff8e9'} p={5} display={'grid'} justifyContent={'center'} gridTemplateColumns={{ base: 'repeat(1,1fr)' }} gap={'20px'} border={'1px solid black'}>
          {mess ? (
            <Text color={'black'} display={'flex'} fontWeight={'bold'} fontFamily={'Times New Roman Times serif'} ml={'7%'} fontSize={'35px'} justifyContent={'center'}>Cart is Empty</Text>
          ) : (
            data.map((e) => (
              <Card key={e._id} boxShadow={'0px 0px 3px 0px'} borderRadius={'15px'} bg={'#fff8e9'} display={'flex'} justifyContent={'center'} flexDirection={{ md: 'row', sm: 'row', lg: 'row', base: 'column' }} w={'100%'} p={3}>
                <CardHeader display={'flex'} w={{ base: '100%', sm: '60%', md: '35%' }} justifyContent={'center'}>
                  <Image h={'250px'} w={{ base: '25%', sm: '30%' , md:'45%' }} mixBlendMode={'darken'} src={e.img_url} />
                </CardHeader>

                <CardBody justifyContent={'center'} alignItems={'start'} display={'flex'} flexDirection={'column'}>
                  <Box alignSelf={'start'} display={'flex'} justifyContent={'space-between'}>
                    <Text color={'black'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>⭐{e.rating + `.${e.rating + e.rating - 2}`}</Text>
                    <Image cursor={'pointer'} src={remove} alt='Remove' w={'15%'} onClick={() => deleteData(e)} />
                  </Box>

                  <Box>
                    <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>{e.name}</Text>
                  </Box>

                  <Box display={'flex'} gap={5}>
                    <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>{'Price:  ' + e.price}</Text>
                  </Box>

                  <hr style={{ border: '1px solid black', width: '100%' }} />
                  <Box justifyContent={'space-around'} mt={4} display={'flex'} w={'100%'}>
                    <Button bg={''} borderRadius={'0px'} borderRight={'1px solid black'}  w={'30%'} _hover={{ background: 'green', border: '1px solid grey' }} onClick={() => handleIncrement(e._id, e.price)}>+</Button>
                    {/* <hr /> */}
                    <Text>{count[e._id]}</Text>
                    {/* <hr style={{width:'100%',border: '1px solid black'}}/> */}
                    <Button bg={''} borderRadius={'0px'} borderLeft={'1px solid black'}  _after={{border:'none'}} w={'30%'} _hover={{ background: 'red', border: '1px solid grey' }} isDisabled={count[e._id] == 1} onClick={() => handleDecrement(e._id, e.price)}>-</Button>
                  </Box>
                </CardBody>
              </Card>
            ))
          )}
        </Box>

        <Box w={{md:'40%' , base:'100%'}} bg={'#fff8e9'} border={'1px solid black'} p={5} >
          <Card borderRadius={'20px'} bg={'lightgrey'} boxShadow={'black 0px 0px 3px 0px'}>
            <CardHeader  display={'flex'} justifyContent={'space-around'}>
              <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>Total:</Text>
              <Text color={'black'} fontSize={'20px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>{`${total} /-`}</Text>
            </CardHeader>

            <CardBody>
             <Input border={'1px solid black'} color={'black'} placeholder='USE "FIRST20" to get 20% OFF' onChange={(e)=>setDiscount(e.target.value)}/>
             <Button fontFamily={'Times New Roman Times serif'} isDisabled={btn} onClick={()=>{setBtn(true) , handleDicound()}} >Apply Coupon</Button>
             {btn && <Text color={'green'}>You Saved {amt}₹ With This Coupon</Text>}
            </CardBody>

            <CardFooter display={'flex'} justifyContent={'center'} flexDirection={'column'}>
                <Text color={'black'} fontFamily={'Times New Roman Times serif'}>Shipping and Taxes calculated At Checkout</Text>
                <Button mt={'20px'} w={{md:'100%' , base:'50%'}} alignSelf={'center'} fontFamily={'Times New Roman Times serif'} onClick={handleCheckout}>Continue To Checkout</Button>
            </CardFooter>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
