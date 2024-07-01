import React, { useState, useEffect } from 'react';
import { Box, Card, CardBody, CardFooter, Image, HStack, IconButton, CardHeader, Text, Button, Input } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import one from './img/one.jpg';
import two from './img/two.jpg';
import three from './img/three.jpg';
import four from './img/four.jpg';
import five from './img/five.jpg';
import a from './video/a.mp4';
import b from './video/b.mp4';
import c from './video/c.mp4';
import d from './video/d.mp4';
import e from './video/e.mp4';
import f from './video/f.mp4';
import g from './video/g.mp4';
import h from './video/h.mp4';
import n from './video/n.mp4';
import s from './video/s.mp4';
import g1 from './img/g1.jpg';
import g2 from './img/g2.jpg';
import g3 from './img/g3.jpg';
import g4 from './img/g4.jpg';
import g5 from './img/g5.jpg';
import sub from './img/sub.jpg';
import { useNavigate } from 'react-router-dom';
import cutting from './img/making/cuting.jpg'
import juse from './img/making/juse.jpg'
import store from './img/making/store.jpg'
import packing from './img/making/packing.jpg'
import blue1 from './img/making/blue1.jpg'
import blue2 from './img/making/blue2.jpg'
import blue3 from './img/making/blue3.jpg'
import blue4 from './img/making/blue4.jpg'



const Home = () => {
  const images = [one, two, three, four, five];
  const videos = [c, d,h ,g,a , e,n,s];
  const gifts = [g1,g2,g3,g5];
  const process = [{img:cutting , name:"Choosing"},{img:juse , name:"Juice Extraction"},{img:store , name:"Fermenting"},{img:packing , name:"Packing"}];
  const grap = [blue3,blue4,blue1 , blue2]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [subscribe, setSubscribe] = useState("Subscribe");
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Card bg={'#fff8e9'}>
        <CardBody>
          <Box
            width="100%"
            height="500px"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
          >
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                width="100%"
                height="100%"
                objectFit="cover"
                position="absolute"
                transition="opacity 1s ease-in-out"
                opacity={index === currentIndex ? 1 : 0}
              />
            ))}
          </Box>
        </CardBody>
        <CardFooter justifyContent={'center'}>
          <HStack justifyContent="center">
            {images.map((_, index) => (
              <IconButton
                key={index}
                icon={<FaCircle />}
                size="sm"
                color={currentIndex === index ? 'blue.500' : 'gray.400'}
                variant="unstyled"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                border={'none'}
              />
            ))}
          </HStack>
        </CardFooter>
      </Card>

      {/* Card to Display Videos */}

      <Card mt={4} bg={'#fff8e9'} border={'none'} boxShadow={'none'}>
        <CardHeader textAlign={'start'}>
          <Text color={'black'} fontFamily={'Times New Roman Times serif'} fontSize={'35px'}>Are They Looking Tempting?</Text>
        </CardHeader>
        <CardBody>
          <Box
            display="grid"
            gridTemplateColumns={{ base: 'repeat(2, 1fr)',md: 'repeat(4, 1fr)' }}
            gap={4}
          >
            {videos.map((video, index) => (
              <Box key={index} position="relative" overflow="hidden" h={'100%'} borderRadius="10px">
                <video
                  src={video}
                  onClick={()=>{navigate('/products')}}
                  width="100%"
                  style={{ objectFit: 'cover' }}
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => e.target.pause()}
                  loop
                  muted
                />
              </Box>
            ))}
          </Box>
        </CardBody>
      </Card>

      {/* Gift Section */}

      <Card bg={'#fff8e9'} mt={5}>
        <CardHeader>
          <Text color={'black'} fontFamily={'Times New Roman Times serif'} fontSize={'35px'}>Gift To Your Loved Once ❤️</Text>
        </CardHeader>

        <CardBody display={'grid'} gridTemplateColumns={{ base: 'repeat(2, 1fr)',md: 'repeat(4, 1fr)' }} gap={5} borderRadius={'10px'}>
            {gifts.map((e , i)=>(
              <Image 
              key={i}
              src={e}
              borderRadius={'10px'}
              cursor={'pointer'}
              w={'100%'}
              onClick={()=>{navigate('/products')}}
              />
            ))}
        </CardBody>
        <CardFooter display={'flex'} justify={'center'}>
          <Button onClick={()=>navigate('products')} bg={'#fff8e9'} border={'1px solid black'}>View All</Button>
        </CardFooter>
      </Card>

      {/* Subscription yaha hoga */}
      
      <Box display={'flex'} boxShadow={'grey 0px 0px 9px 0px'} gap={'5%'} w={'100%'} h={'100%'} mt={10} p={10} flexDirection={{base:'column' , sm:'row'}} borderRadius={'15px'} justifyContent={'center'} alignItems={'center'}>
        <Box w={{base:'85%' , md:'45%'}}  display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
            <Text color={'black'} fontSize={'30px'} fontFamily='Times New Roman Times serif' fontWeight={'bold'}>Wine subscription!</Text>
            <Text color={'black'} fontSize={'18px'} fontFamily='Times New Roman Times serif' >subscription is a journey through the world of wine,four bottles at a time. Each month, we select wines based on a chosen theme and explain how each bottle fits that theme - it's wine education and enjoyment in a equal measure!</Text>

            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3} p={6} flexDirection={{base:'column' , md:'row'}}>
            <Input placeholder='Add Email for Subscription...' border={'1px solid black'} />
            <Button onClick={()=> setSubscribe("Subscribed")}>{subscribe}</Button>
            </Box>
        </Box>

        <Box w={{base:'85%' , md:'45%'}} display={'flex'}>
            <Image w={'100%'} src={sub} alt='Image' h={'550px'} borderRadius={'15px'}/>
        </Box>
      </Box>
      {/* graps */}

      <Box mt={10} mb={5} p={10} justifyContent={'center'} alignItems={'center'} display={'grid'} gridTemplateColumns={{base:'repeat(2,1fr)' , md:'repeat(4,1fr)'}} gap={4}>
        {grap.map((e , i)=>(
          <Box key={i}>
            <Image src={e} alt='Graps' borderRadius={'10px'} h={'450px'}/>
          </Box>
        ))}
        
      </Box>
      {/* Process */}

      <Box display={'flex'} flexDirection={'column'}>
        <Text color={'black'} fontFamily={'Times New Roman Times serif'} fontSize={'35px'}>
          Process Of Our Wine Making...😋
          </Text>

          <Box p={10} gap={5} display={'grid'} gridTemplateColumns={{base:'repeat(2,1fr)' , md:'repeat(4,1fr)'}}>
            {process.map((e , i)=>(
              <Box key={i}>
                <Image src={e.img} alt='img' h={'250px'} borderRadius={'10px'}/>
                <Text color={'black'} fontWeight={'bold'} fontFamily={'Times New Roman Times serif'} fontSize={'20px'}>{e.name}</Text>
              </Box>
            ))}
          </Box>
      </Box>
    </Box>
  );
};

export default Home;
