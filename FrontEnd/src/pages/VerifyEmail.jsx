import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UrlContext } from '../context/url';
import { useNavigate } from 'react-router-dom';
import { emailContext } from '../context/email';
import { Box, Button, FormControl, FormLabel, Input, Text, Heading, useToast } from '@chakra-ui/react';
import { OrbitProgress } from 'react-loading-indicators';

const VerifyEmail = () => {
  const { url } = useContext(UrlContext);
  const { userMail } = useContext(emailContext);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const mail = userMail.email || "email@gmail.com";
      const response = await axios.post(`${url}api/verify`, { email: mail, verificationCode });
      setMessage(response.data.message);
      setIsLoading(false);
      toast({
        title: 'Verification Successful',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      setError(error.response || "Something went wrong, please try again.");
      toast({
        title: 'Verification Failed',
        description: error.response.data.message || "Something went wrong, please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      fontFamily="Times New Roman, Times, serif"
    >
      <Box
        boxShadow="lg"
        padding="6"
        borderRadius="md"
        width={{ base: '90%', md: '50%', lg: '40%' }}
      >
        <Heading as="h2" size="lg" marginBottom="6">Verify Email</Heading>
        {message && <Text color="green.500" marginBottom="4">{message}</Text>}
        {error && <Text color="red.500" marginBottom="4">{error}</Text>}
        <form onSubmit={handleSubmit}>
          <FormControl marginBottom="4">
            <FormLabel>Verification Code</FormLabel>
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              placeholder="Verification Code"
              backgroundColor="#fff8e9"
              border="1px solid grey"
              borderRadius="md"
            />
          </FormControl>
          {isLoading ? (
            <OrbitProgress variant="dotted" color="#32cd32" size="small" />
          ) : (
            <Button
              type="submit"
              width="full"
              marginTop="4"
              backgroundColor="green.400"
              color="white"
              _hover={{ backgroundColor: 'green.500' }}
            >
              Verify
            </Button>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
