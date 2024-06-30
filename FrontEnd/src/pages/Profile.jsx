import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, FormControl, FormLabel, Heading, Input, Switch, VStack } from '@chakra-ui/react';
import { UrlContext } from '../context/url';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    isVerified: false,
    userIcon: ''
  });
  
  const { url } = useContext(UrlContext);
  const id = localStorage.getItem('user');

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${url}api/userData/user/${id}`);
      setUser(data);
      // console.log(data);
    } catch (error) {
      console.log("Error From Profile Component: " + error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={8} w={'30%'} mt={20} mb={20} mx="auto" boxShadow={'grey 0px 0px 15px 0px'}>
      <VStack spacing={4} align="center">
        <Heading size="lg">User Profile</Heading>
        
        <Avatar size="xl" name={user.username} src={user.userIcon} />

        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input border={'1px solid black'} type="text" value={user.username} readOnly />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input border={'1px solid black'} type="email" value={user.email} readOnly />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="isVerified" mb="0">
            Is Verified?
          </FormLabel>
          <Switch id="isVerified" isChecked={user.isVerified} isReadOnly />
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Profile;
