import React from 'react';
import { Box, Button, Flex, Grid, Input, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import web from './img/world-wide-web.png'
import linkedin from './img/linkedin.png'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Flex
        flexDirection={'column'}
        gap={6}
        color='black'
        padding={'30px'}
        
      >

      <hr style={{border:'1px solid black'}}/>
        {/* First Half */}
        <Box  className='first' display="grid" gridTemplateColumns={{base : 'repeat(2 , 1fr)' , md: 'repeat(4 , 1fr)' , sm: 'repeat(3 , 1fr)' , lg:'repeat(5 , 1fr)' }} justifyContent={'space-between'}>

          <Box className='box' display="flex" flexDirection="column" flexWrap="wrap">
            <Text fontSize={'20px'} fontWeight="bold" cursor={'pointer'} color='black'>CATALOG</Text>
            <Text onClick={()=>navigate('/products')} cursor={'pointer'} color='black'>Red Wine</Text>
            <Text onClick={()=>navigate('/products')} cursor={'pointer'} color='black'>White Wine</Text>
            <Text onClick={()=>navigate('/products')} cursor={'pointer'} color='black'>Rose Wine</Text>
            <Text onClick={()=>navigate('/products')} cursor={'pointer'} color='black'>Sparkling Wine</Text>
            <Text onClick={()=>navigate('/products')} cursor={'pointer'} color='black'>Promotions</Text>
            <Text onClick={()=>navigate('/products')} cursor={'pointer'} color='black'>Sets and Gifts</Text>
          </Box>

          <Box className='box' display="flex" flexDirection="column" >
            <Text cursor={'pointer'} fontSize={'20px'} fontWeight="bold" color='black'>SUPPORT</Text>
            <Text cursor={'pointer'} color='black'>FAQ</Text>
            <Text cursor={'pointer'} color='black'>Terms of use</Text>
            <Text cursor={'pointer'} color='black'>Privacy Policy</Text>
            <Text cursor={'pointer'} color='black'>Delivery and payment</Text>
            <Text cursor={'pointer'} color='black'>Return and exchange</Text>
          </Box>

          <Box className='box' display="flex" flexDirection="column" flexWrap="wrap">
            <Text cursor={'pointer'} fontSize={'20px'} fontWeight="bold" color='black'>OUR COMPANY</Text>
            <a style={{textTransform:'none'}} target="_blank" href="https://www.linkedin.com/in/narsimma-yemul-7653781b5/">
            <Text cursor={'pointer'} color='black'>About us</Text>
            </a>

            <a style={{textTransform:'none'}} target="_blank" href="https://www.linkedin.com/in/narsimma-yemul-7653781b5/">
            <Text cursor={'pointer'} color='black'>Wine subscription</Text>
            </a>

            <a style={{textTransform:'none'}} target="_blank" href="https://www.linkedin.com/in/narsimma-yemul-7653781b5/">
            <Text cursor={'pointer'} color='black'>Contact us</Text>
            </a>

            <a style={{textTransform:'none'}} target="_blank" href="https://www.linkedin.com/in/narsimma-yemul-7653781b5/">
            <Text cursor={'pointer'} color='black'>Reviews</Text>
            </a>

            <a style={{textTransform:'none'}} target="_blank" href="https://www.linkedin.com/in/narsimma-yemul-7653781b5/">
            <Text cursor={'pointer'} color='black'>Blog and news</Text>
            </a>

            <a style={{textTransform:'none'}} target="_blank" href="https://www.linkedin.com/in/narsimma-yemul-7653781b5/">
            <Text cursor={'pointer'} color='black'>Loyalty program</Text>
            </a>
            
          </Box>

          <Box className='box' display="flex" flexDirection="column" flexWrap="wrap">
            <Text cursor={'pointer'} fontSize={'20px'} fontWeight="bold" color='black'>CONTACT</Text>
            <Text cursor={'pointer'} color='black'>+91 7385692206</Text>
            <Text cursor={'pointer'} color='black'>Narsimmayemul 49450@gmail.com</Text>
            <Text cursor={'pointer'} fontSize={'20px'} fontWeight="bold" color='black'>ADDRESS :</Text>
            <Text cursor={'pointer'} color='black'>India</Text>
            <Text cursor={'pointer'} color='black'>Solapur , Maharashtra.</Text>
            <Text cursor={'pointer'} fontSize={'20px'} fontWeight="bold" color='black'>WORKING HOURS :</Text>
            <Text cursor={'pointer'} color='black'>Mon-Fri 09:00-20:00</Text>
            <Text cursor={'pointer'} color='black'>Sat-Sun 10:00-18:00</Text>
          </Box>

          <Box className='box' display="flex" flexDirection="column" flexWrap="wrap">
            <Text cursor={'pointer'} fontSize={'20px'} fontWeight="bold" color='black'>Newsletter</Text>
            <Text cursor={'pointer'} color='black'>Get -20% on your first order</Text>
            <Box>
              <Input border={'1px solid black'} placeholder='Email...'/>
              <Button cursor={'pointer'}>Subscribe</Button>
            </Box>
            <Box display={'flex'} mt={10} gap={5} justifyContent={'center'} alignItems={'center'}>
              <a target="_blank" href="https://narsimmayemul.github.io/">
            <img style={{width:'40px' , height:'30px'}} src={web} alt="website" />
              </a>
              <a target="_blank" style={{textTransform:'none'}} href="https://www.linkedin.com/in/narsimma-yemul-7653781b5/">
            <img style={{width:'40px' , height:'30px'}} src={linkedin} alt="linkedin" />
              </a>
            </Box>
          </Box>

        </Box>

        {/* Second Half */}
        <hr style={{border:'1px solid black'}}/>
        <Box   className='second' display="flex" flexDirection="row" justifyContent='space-between' alignItems={'center'}>
          <Box>
            <Text fontSize={{base:'40px' , sm:'50px' , md:'60px' , lg:'70px'}} fontWeight="bold" color='black'>Mine Wine</Text>
          </Box>
          <Box>
            <Text fontSize={'20px'} fontWeight="bold" color='black'>We only sell Alcohol to Adults 21+<br></br>
              @MineVine 2023. All Rights Reserved</Text>
          </Box>
        </Box>
      </Flex>

    </Box>
  );
};

export default Footer;
