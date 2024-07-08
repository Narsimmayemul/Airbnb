import { Box, Button, Checkbox, FormControl, FormLabel, Image, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pp from './img/payment/pp.png';
import gpay from './img/payment/gpay.png';
import card from './img/payment/card.png';
import visa from './img/payment/visa.png';

const CheckOut = () => {
    const location = useLocation();
    const { total } = location.state || 0;
    const [check, setCheck] = useState(false);
    const [shippingCost, setShippingCost] = useState(80); // Default to Standard shipping
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card'); // Default to Credit Card
    const toast = useToast();
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        fullName: '',
        address: '',
        zipCode: '',
        city: '',
        email: '',
        cardNumber: '',
        cardName: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: ''
    });

    const handleForm = (e) => {
        e.preventDefault();
        toast({
            status: 'success',
            description: 'Payment Successful',
            duration: 5000,
            isClosable: true,
            position: 'top'
        });
        
        navigate("/");
    };

    const handleShippingChange = (isExpress) => {
        setCheck(isExpress);
        setShippingCost(isExpress ? 150 : 80);
    };

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const inputStyle = {
        border: '1px solid black'
    };

    const textStyle = {
        color: 'black',
        fontFamily: 'Times New Roman, Times, serif'
    };

    const handleAddress = (e) => {
        e.preventDefault();
        if(
        formValues.fullName!= '',
        formValues.address!= '',
        formValues.zipCode!= '',
        formValues.city!= '',
        formValues.email!= ''){         
            toast({
                status: 'success',
                description: 'Address Saved',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
        };
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const isFormValid = () => {
        return Object.values(formValues).every(value => value.trim() !== '');
    };

    return (
        <Box display={'flex'} flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'center'} w={'100%'} p={5} gap={5}>
            <Box p={4} w={{ md: '100%', lg: '100%', sm: "100%" }} borderRadius={'20px'}>
                <Text {...textStyle} display={'flex'} fontWeight={'bold'} fontSize={'2xl'} mb={4}>Shipping Information</Text>

                <form onSubmit={handleAddress}>
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            name="fullName"
                            value={formValues.fullName}
                            onChange={handleInputChange}
                            isRequired
                            placeholder='Your first and last name'
                            style={inputStyle}
                        />

                        <FormLabel>Address</FormLabel>
                        <Input
                            name="address"
                            value={formValues.address}
                            onChange={handleInputChange}
                            isRequired
                            placeholder='123 xyz Street'
                            style={inputStyle}
                        />

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box w={'48%'}>
                                <FormLabel>Zip Code</FormLabel>
                                <Input
                                    name="zipCode"
                                    value={formValues.zipCode}
                                    onChange={handleInputChange}
                                    isRequired
                                    placeholder='Zip Code'
                                    style={inputStyle}
                                />
                            </Box>

                            <Box w={'48%'}>
                                <FormLabel>City</FormLabel>
                                <Input
                                    name="city"
                                    value={formValues.city}
                                    onChange={handleInputChange}
                                    isRequired
                                    placeholder='City'
                                    style={inputStyle}
                                />
                            </Box>
                        </Box>

                        <FormLabel>Email address</FormLabel>
                        <Input
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            isRequired
                            placeholder='you@xyz.com'
                            type='email'
                            style={inputStyle}
                        />

                        <FormLabel>Shipping Method</FormLabel>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box display={'flex'} mb={4}>
                                <Checkbox
                                    rounded={'true'}
                                    onChange={() => handleShippingChange(true)}
                                    isChecked={check}
                                    sx={{
                                        '& .chakra-checkbox__control': {
                                            borderRadius: '50%',
                                        },
                                    }}
                                />
                                <Box ml={2}>
                                    <Text {...textStyle}>Express ₹150/-</Text>
                                    <Text {...textStyle}>Dispatched in 24 hours</Text>
                                </Box>
                            </Box>

                            <Box display={'flex'} mb={4}>
                                <Checkbox
                                    rounded={'true'}
                                    onChange={() => handleShippingChange(false)}
                                    isChecked={!check}
                                    sx={{
                                        '& .chakra-checkbox__control': {
                                            borderRadius: '50%',
                                        },
                                    }}
                                />
                                <Box ml={2}>
                                    <Text {...textStyle}>Standard ₹80/-</Text>
                                    <Text {...textStyle}>Dispatched in 1 - 2 days</Text>
                                </Box>
                            </Box>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} mt={9}>
                            <Checkbox defaultChecked>Billing address is same as shipping</Checkbox>
                            <Button border={'1px solid black'}  type='submit' mt={4}>Submit Address</Button>
                        </Box>
                    </FormControl>
                </form>
            </Box>

            {/* Second Half */}

            <Box w={{ md: '100%', lg: '100%', sm: "100%" }} p={4} borderRadius={'20px'}>
                <form onSubmit={handleForm}>
                    <FormControl>
                        <FormLabel fontWeight={'bold'} fontSize={'2xl'} fontFamily='Times New Roman, Times, serif'>Payment Information</FormLabel>
                        <Box display={'flex'} mb={'20px'} justifyContent={'space-between'}>
                            <Box display={'flex'} mb={4}>
                                <Checkbox
                                    rounded={'true'}
                                    onChange={() => handlePaymentMethodChange('Credit Card')}
                                    isChecked={selectedPaymentMethod === 'Credit Card'}
                                    sx={{
                                        '& .chakra-checkbox__control': {
                                            borderRadius: '50%',
                                        },
                                    }}
                                />
                                <Box ml={2}>
                                    <Text {...textStyle}>Credit Card</Text>
                                    <Text {...textStyle}>Pay with credit card via Stripe</Text>

                                    <Box display={'flex'} mt={2} gap={'10%'}>
                                        <Image boxSize="45px" src={visa} />
                                        <Image boxSize="45px" src={card} />
                                    </Box>
                                </Box>
                            </Box>

                            <Box display={'flex'} mb={4}>
                                <Checkbox
                                    rounded={'true'}
                                    onChange={() => handlePaymentMethodChange('PayPal')}
                                    isChecked={selectedPaymentMethod === 'PayPal'}
                                    sx={{
                                        '& .chakra-checkbox__control': {
                                            borderRadius: '50%',
                                        },
                                    }}
                                />
                                <Box ml={2} justifyContent={'center'} alignItems={'center'}>
                                    <Text {...textStyle}>PayPal</Text>
                                    <Text {...textStyle}>Pay with your PayPal account</Text>
                                    <Image boxSize="45px" src={pp} mt={'10px'} boxShadow={'0px 0px 2px 0px'} borderRadius={'10px'} />
                                </Box>
                            </Box>
                        </Box>

                        <Box display={'flex'} mb={4}>
                            <Box w={'48%'}>
                                <FormLabel>Credit card number</FormLabel>
                                <Input
                                    name="cardNumber"
                                    value={formValues.cardNumber}
                                    onChange={handleInputChange}
                                    type='number'
                                    isRequired
                                    placeholder='Card Number'
                                    style={inputStyle}
                                />
                            </Box>

                            <Box w={'48%'} ml={2}>
                                <FormLabel>Credit card name</FormLabel>
                                <Input
                                    name="cardName"
                                    value={formValues.cardName}
                                    onChange={handleInputChange}
                                    isRequired
                                    placeholder='Card name'
                                    style={inputStyle}
                                />
                            </Box>
                        </Box>

                        <Box display={'flex'} mb={4}>
                            <Box w={'48%'}>
                                <FormLabel>Expiry date</FormLabel>
                                <Input
                                    name="expiryMonth"
                                    type='number'
                                    value={formValues.expiryMonth}
                                    onChange={handleInputChange}
                                    isRequired
                                    placeholder='Month'
                                    style={inputStyle}
                                />
                                <Input
                                    name="expiryYear"
                                    value={formValues.expiryYear}
                                    onChange={handleInputChange}
                                    isRequired
                                    placeholder='Year'
                                    type='number'
                                    mt={2}
                                    style={inputStyle}
                                />
                            </Box>

                            <Box w={'48%'} ml={2}>
                                <FormLabel>CVV/CVC</FormLabel>
                                <Input
                                    name="cvc"
                                    value={formValues.cvc}
                                    onChange={handleInputChange}
                                    isRequired
                                    placeholder='CVC'
                                    style={inputStyle}
                                />
                            </Box>
                        </Box>

                        <hr style={{ color: 'black', border: '1px solid grey' }} />
                        <Box mt={4}>
                            <Box display={'flex'} justifyContent={'space-between'} mb={2}>
                                <Text {...textStyle}>Subtotal</Text>
                                <Text {...textStyle}>₹ {total}</Text>
                            </Box>

                            <Box display={'flex'} justifyContent={'space-between'} mb={2}>
                                <Text {...textStyle}>Shipping cost</Text>
                                <Text {...textStyle}>+ ₹{shippingCost}</Text>
                            </Box>

                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Text {...textStyle}>Order Total</Text>
                                <Text {...textStyle}>₹ {total + shippingCost}</Text>
                            </Box>
                        </Box>
                        <Box>
                            <Button
                                border={'1px solid black'}
                                w={'90%'}
                                // onClick={handlePayment}
                                type='submit'
                                mt={4}
                                disabled={!isFormValid()}
                            >
                                Pay Now
                            </Button>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </Box>
    );
};

export default CheckOut;
