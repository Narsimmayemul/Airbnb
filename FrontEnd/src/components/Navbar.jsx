import React, { useState } from 'react';
import { Box, Flex, HStack, Text, Image, useBreakpointValue } from '@chakra-ui/react';
import user from './img/user.png';
import love from './img/love.png';
import shopping from './img/shopping.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const padding = useBreakpointValue({ base: '10px', md: '20px', lg: '20px' });
  const flexDirection = useBreakpointValue({ base: 'column', sm: 'row' });
  const textAlign = useBreakpointValue({ base: 'center', md: 'left' });

  const [page , setPage]=useState("");
  const navigate = useNavigate();

  const handleClick = ()=>{

  }


  

  return (
    <Box 
      bg="#fff8e9" 
      color="black" 
      width="100vw" 
      maxWidth="1280px" 
      mx="auto" 
      justifySelf='center'
      m='0px'
      // boxShadow="2px 0px 20px 5px #ccc" 
      p={padding}
      position="relative"
    >
      {/* First Div */}
      <Flex
        justify="space-between"
        align="center"
        p={2}
        bg="#fff8e9"
        mb={3}
        // boxShadow="sm"
        flexDirection={flexDirection}
        width="100%"
      >
        <Box>
          {flexDirection == 'row' &&
            <Text color="black" fontSize="x-large" textAlign={textAlign}>
            UA | EN 0 800 123 456
          </Text>
          }
        </Box>
        <HStack spacing={4} mt={{ base: 2, md: 0 }}>
          <Image cursor='pointer' onClick={()=>navigate("/profile")} boxSize="30px" src={user} alt="user" />
          <Image cursor='pointer' onClick={()=>navigate("/wishlist")} boxSize="30px" src={love} alt="Wishlist" />
          <Image cursor='pointer' onClick={()=>navigate("/cart")} boxSize="30px" src={shopping} alt="shopping" />
        </HStack>
      </Flex>
    <hr style={{border:'2px solid black'}}/>
      {/* Second Half */}
      <Flex
        justify="space-between"
        align="center"
        mt={0}
        p={2}
        bg="#fff8e9"
        // boxShadow="sm"
        flexDirection={flexDirection}
        width="100%"
      >
        <Box>
          <Text
            color="black"
            fontSize='40px'
            fontWeight="bold"
            textAlign={textAlign}
            onClick={()=>{navigate('/')}}
            cursor='pointer'
          >
            Mine Wine
          </Text>
        </Box>
        <Box textAlign={{ base: "center", md: "right" }} mt={{ base: 2, md: 0 }}>
          <Text color="black">Category</Text>
          <Text color="black">Searching</Text>
        </Box>
      </Flex>
      <hr style={{border:'2px solid black'}}/>
    </Box>
  );
};

export default Navbar;
