import React, { useState } from 'react';
import { Box, Flex, HStack, Text, Image, useBreakpointValue, Input } from '@chakra-ui/react';
import user from './img/user.png';
import love from './img/love.png';
import shopping from './img/shopping.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const padding = useBreakpointValue({ base: '10px', md: '20px', lg: '20px' });
  const FontSize = useBreakpointValue({ base: '20px', md: '30px', lg: '40px' });
  const widthInput = useBreakpointValue({ base: '35%', sm: '20%'});
  const flexDirection = useBreakpointValue({ base: 'column', sm: 'row' });
  const textAlign = useBreakpointValue({ base: 'center', md: 'left' });

  const navigate = useNavigate();

  // const handleNavigate = (path) => {
  //   navigate(path);
  // };

  return (
    <Box 
      bg="#fff8e9" 
      color="black" 
      width="100vw" 
      maxWidth="1280px" 
      mx="auto" 
      justifySelf='center'
      m='0px'
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
        flexDirection={flexDirection}
        width="100%"
      >
        <Box>
          {flexDirection === 'row' && (
            <Text color="black" fontSize="x-large" textAlign={textAlign}>
              UA | EN 0 800 123 456
            </Text>
          )}
        </Box>
        <HStack spacing={4} mt={{ base: 2, md: 0 }}>
          <Image cursor='pointer' onClick={() => navigate("/profile")} boxSize="30px" src={user} alt="user" />
          <Image cursor='pointer' onClick={() => navigate("/wishlist")} boxSize="30px" src={love} alt="Wishlist" />
          <Image cursor='pointer' onClick={() => navigate("/cart")} boxSize="30px" src={shopping} alt="shopping" />
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
        flexDirection={flexDirection}
        width="100%"
      >
        <Box>
          <Text
            color="black"
            fontSize={FontSize}
            fontWeight="bold"
            textAlign={textAlign}
            onClick={() => navigate('/')}
            cursor='pointer'
          >
            Mine Wine
          </Text>
        </Box>
        <Box textAlign={{ base: "center", md: "right" }} mt={{ base: 2, md: 0 }}>
          <Flex gap={4}>
            <Text
              fontSize='20px'
              cursor='pointer'
              onClick={() => navigate("/products")}
              color="black"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: '50%',
                right: '-10px',
                transform: 'translateY(-50%)',
                height: '80%', 
                width: '1px',
                backgroundColor: 'black',
              }}
            >
              White Wine
            </Text>
            <Text
             fontSize='20px'
             cursor='pointer'
             onClick={() => navigate("/products")}
             color="black"
             position="relative"
             _after={{
               content: '""',
               position: 'absolute',
               top: '50%',
               right: '-10px', 
               transform: 'translateY(-50%)',
               height: '80%', 
               width: '1px',
               backgroundColor: 'black',
             }}
            >
              Sparkling Wine
            </Text>
            <Text
              fontSize='20px'
              cursor='pointer'
              onClick={() => navigate("/products")}
              color="black"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: '50%',
                right: '-10px', 
                transform: 'translateY(-50%)',
                height: '80%', 
                width: '1px',
                backgroundColor: 'black',
              }}
            >
              Red Wine
            </Text>
            <Text
              fontSize='20px'
              cursor='pointer'
              onClick={() => navigate("/products")}
              color="black"
              position="relative"
              mr={4}
            >
              Dessert Wine
            </Text>
          </Flex>
        </Box>
        <Input placeholder='Search...' border='1px solid black' color="black" w={widthInput} />
      </Flex>
      <hr style={{border:'2px solid black'}}/>
    </Box>
  );
};

export default Navbar;
