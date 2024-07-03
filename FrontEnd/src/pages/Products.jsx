import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UrlContext } from '../context/url'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, Image, Select, Stack, Text, border } from '@chakra-ui/react';
import { Form } from 'react-router-dom';

const Products = () => {
  const [data , setData] = useState([]);
  const [sorting , setSorting] = useState("");
  const {url} = useContext(UrlContext)

  const getData = async()=>{
    try {
      const res = await axios.get(`${url}api/WineData/`);
      // console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log('Error from Products Page :' + error)
    }
  }

  const handleFilter = async(e)=>{
    const filterValue = e.target.value;
    // console.log(filterValue)
    if (filterValue === '') {
      const res = await axios.get(`${url}api/WineData/${filterValue}`);
      // console.log(res.data);
      setData(res.data);
    }else{
      const res = await axios.get(`${url}api/WineData/${filterValue}`);
      // console.log(res.data);
      setData(res.data);
    }
  }

// Sort(High)
// Sort(Low)
// SortPrice(High)
// SortPrice(Low)
  const handleSort=(e)=>{
    console.log(e.target.value);
    const str = e.target.value;
    if(str == 'SortPrice(High)'){
       const val = data.sort((a,b)=>{
          return a.price - b.price
        })
        console.log(val)
        setData(val)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box bg={'#fff8e9'}>
      <Box >
        <Text color={'black'} display={'flex'} fontWeight={'bold'}fontFamily={'Times New Roman Times serif'} ml={'7%'} fontSize={'35px'} alignSelf={'start'}>Products</Text>
      </Box>

      {/* Filtes */}

      <Box display={'flex'} justifyContent={'space-around'}>
        <Box>
          <Select border={'1px solid black'} bg={'#fff8e9'} onChange={handleFilter}>
            <option style={{background:'#fff8e9' , border:'1px solid black'}} value={''}>All Wines</option>
            <option style={{background:'#fff8e9' , border:'1px solid black'}} value={'WhiteWine'}>White Wine</option>
            <option style={{background:'#fff8e9' , border:'1px solid black'}} value={'RedWine'}>Red Wine</option>
            <option style={{background:'#fff8e9' , border:'1px solid black'}} value={'SparklingWine'}>Sparkling Wine</option>
            <option style={{background:'#fff8e9' , border:'1px solid black'}} value={'DessertWine'}>Dessert Wine</option>
          </Select>
        </Box>

        <Box>
         <Select border={'1px solid black'} bg={'#fff8e9'} onChange={handleSort}>
            <option style={{background:'#fff8e9'}} value={''}>Sort By:</option>
            <option style={{background:'#fff8e9'}} value={'SortPrice(High)'}>Sort By Price (High to Low)</option>
            <option style={{background:'#fff8e9'}} value={'SortPrice(Low)'}>Sort By Price (Low to High)</option>
            <option style={{background:'#fff8e9'}} value={'Sort(High)'}>Sort By Rating(High to Low)</option>
            <option style={{background:'#fff8e9'}} value={'Sort(Low)'}>Sort By Rating(Low to High)</option>
         </Select>
        </Box>
      </Box>

      {/* Products */}

      {/* 
      name
      price
      dashed price
      category
      region
      flg
      */}

      <Box bg={'#fff8e9'} p={10} display={'grid'} gridTemplateColumns={{lg:'repeat(3,1fr)' , md:'repeat(2,1fr)' , base:'repeat(1,1fr)'}} gap={'20px'}>
        {data.map((e)=>(
          <Card boxShadow={'0px 0px 3px 0px'} borderRadius={'15px'} bg={'#fff8e9'} key={e._id} display={'flex'} justifyContent={'center'} flexDirection={{md:'row' ,sm:'row',lg:'row' ,base:'column'}} w={'100%'} p={3}>
            <CardHeader display={'flex'} w={{base:'100%' , sm:'30%' , md:'35%'}} justifyContent={'center'}>
              <Image h={'250px'} w={{base:'50%' , sm:'100%' ,}} mixBlendMode={'darken'} src = {e.img_url}/>
            </CardHeader>

            <CardBody justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
              <Box alignSelf={'start'}>
                <Text color={'black'} fontFamily={'Times New Roman Times serif'} fontWeight={'bold'}>⭐{e.rating+`.${e.rating+e.rating-2}`}</Text>
              </Box>

              <Box>
                <Text>{e.name}</Text>
              </Box>

              <Box display={'flex'} gap={5}>
              <Text>{e.price}</Text>
              <Text textDecoration={'line-through'}>{e.price+ Math.ceil(e.price/25)}</Text>
              
              <Text>{`${Math.floor(Math.random() * (90 - 60 + 1)) + 60}%`}</Text>
              </Box>

               <hr style={{border:'1px solid black' , width:'100%' }}/>   

              <Box display={'flex'} h={'70px'} gap={5} >
                <Image mt={'10px'} src={e.flag} h={'40%'}/>
                <Text mb={'10px'}>{e.region}</Text>
              </Box>      
              <Box>
              <Button>Add to Cart</Button>
              </Box>
            </CardBody>

          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default Products
