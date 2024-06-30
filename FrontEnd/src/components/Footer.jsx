import React from 'react';
import { Box, Button, Flex, Grid, Input, Text } from '@chakra-ui/react';

const Footer = () => {
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
            <Text fontSize={'20px'} fontWeight="bold" color='black'>CATALOG</Text>
            <Text color='black'>Red Wine</Text>
            <Text color='black'>White Wine</Text>
            <Text color='black'>Rose Wine</Text>
            <Text color='black'>Sparkling Wine</Text>
            <Text color='black'>Promotions</Text>
            <Text color='black'>Sets and Gifts</Text>
          </Box>

          <Box className='box' display="flex" flexDirection="column" >
            <Text fontSize={'20px'} fontWeight="bold" color='black'>SUPPORT</Text>
            <Text color='black'>FAQ</Text>
            <Text color='black'>Terms of use</Text>
            <Text color='black'>Privacy Policy</Text>
            <Text color='black'>Delivery and payment</Text>
            <Text color='black'>Return and exchange</Text>
          </Box>

          <Box className='box' display="flex" flexDirection="column" flexWrap="wrap">
            <Text fontSize={'20px'} fontWeight="bold" color='black'>OUR COMPANY</Text>
            <Text color='black'>About us</Text>
            <Text color='black'>Wine subscription</Text>
            <Text color='black'>Contact us</Text>
            <Text color='black'>Reviews</Text>
            <Text color='black'>Blog and news</Text>
            <Text color='black'>Loyalty program</Text>
          </Box>

          <Box className='box' display="flex" flexDirection="column" flexWrap="wrap">
            <Text fontSize={'20px'} fontWeight="bold" color='black'>CONTACT</Text>
            <Text color='black'>+91 7385692206</Text>
            <Text color='black'>Narsimmayemul 49450@gmail.com</Text>
            <Text fontSize={'20px'} fontWeight="bold" color='black'>ADDRESS :</Text>
            <Text color='black'>India</Text>
            <Text color='black'>Solapur , Maharashtra.</Text>
            <Text fontSize={'20px'} fontWeight="bold" color='black'>WORKING HOURS :</Text>
            <Text color='black'>Mon-Fri 09:00-20:00</Text>
            <Text color='black'>Sat-Sun 10:00-18:00</Text>
          </Box>

          <Box className='box' display="flex" flexDirection="column" flexWrap="wrap">
            <Text fontSize={'20px'} fontWeight="bold" color='black'>Newsletter</Text>
            <Text color='black'>Get -20% on your first order</Text>
            <Box>
              <Input border={'1px solid black'} placeholder='Email...'/>
              <Button>Subscribe</Button>
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
