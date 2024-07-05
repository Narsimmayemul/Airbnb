import React, { useContext, useEffect, useState } from 'react'
import { UrlContext } from '../context/url';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box, Button, Card, CardBody, CardHeader, Image, Text } from '@chakra-ui/react';

const ProductDetail = () => {
    const location = useLocation();
  const { product } = location.state;
    const e = product;
  return (
  <Box display={'flex'} p={5} m={5}>
   <Card  boxShadow={'0px 0px 3px 0px'} borderRadius={'15px'} bg={'#fff8e9'} key={e._id} display={'flex'} justifyContent={'center'} flexDirection={{ md: 'row', sm: 'row', lg: 'row', base: 'column' }} w={'100%'} p={3}>
        <CardHeader display={'flex'} w={{ base: '100%', sm: '30%', md: '35%' }} justifyContent={'center'} >
          <Image h={'500px'} w={{ base: '50%', sm: '100%' , md:'60%' }} mixBlendMode={'darken'} src={e.img_url} />
        </CardHeader>

        <CardBody justifyContent={'center'} alignItems={'start'} display={'flex'} flexDirection={'column'}>
          <Box alignSelf={'start'} display={'flex'} justifyContent={'space-between'}>
            <Text color={'black'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>⭐{e.rating + `.${e.rating + e.rating - 2}`}</Text>
            {/* <Image src={remove} alt='Remove' w={'15%'}/> */}
          </Box>

          <Box boxShadow={{base:'0px 0px 10px 0px' , sm:'none'}} borderRadius={{base:'10px' , sm:'none'}} p={4} m={'5px'}>
            <Text color={'black'} fontSize={'40px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'} textDecorationLine='underline'>{e.name}</Text>
          </Box>

          <Box display={'flex'} gap={5}>
            <Text color={'black'} fontSize={'30px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>{e.price}</Text>
            <Text color={'black'} fontSize={'30px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'} textDecoration={'line-through'}>{e.price + Math.ceil(e.price / 25)}</Text>
            <Text color={'black'} fontSize={'30px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>{`${Math.floor(63 + 19 % 20)}%`}</Text>
          </Box>

          <hr style={{ border: '1px solid black', width: '100%' }} />

          <Box display={'flex'} h={'70px'} gap={5}>
            <Image mt={'10px'} src={e.flag} h={'60%'} />
            <Text color={'black'} fontSize={'30px'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'} mb={'10px'}>{e.region}</Text>
          </Box>
          <Box justifyContent={'center'} display={'flex'} w={{base:'100%' , sm:'50%'}} mt={'10%'}>
            <Button bg={''} alignSelf={'center'} border={'1px solid black'} w={'90%'} _hover={{ background: 'green', border: '1px solid black' }}>Check Out</Button>
          </Box>
        </CardBody>
      </Card>
  </Box>
  )
}

export default ProductDetail
