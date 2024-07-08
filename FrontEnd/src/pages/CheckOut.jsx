import { Box, Button, Checkbox, FormControl, FormLabel, Image, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import pp from './img/payment/pp.png';
import gpay from './img/payment/gpay.png';
import card from './img/payment/card.png';
import visa from './img/payment/visa.png';

const CheckOut = () => {
    const location = useLocation();
    const { total } = location.state;
    const [check, setCheck] = useState(false);
    const [shippingCost, setShippingCost] = useState(80); // Default to Express shipping
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card'); // Default to Credit Card

    const handleForm = (e) => {
        e.preventDefault();
        console.log('form');
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

    return (
        <Box display={'flex'} flexDirection={{ base: 'column', lg: 'row' }} justifyContent={'center'} w={'100%'} p={5} gap={5}>
            <Box p={4} w={{ md: '100%', lg: '100%', sm: "100%" }} borderRadius={'20px'}>
                <Text {...textStyle} display={'flex'} fontWeight={'bold'} fontSize={'2xl'} mb={4}>Shipping Information</Text>

                <form onSubmit={handleForm}>
                    <FormControl isRequired>
                        <FormLabel>Full Name</FormLabel>
                        <Input style={inputStyle} />

                        <FormLabel>Address</FormLabel>
                        <Input style={inputStyle} />

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box w={'48%'}>
                                <FormLabel>Zip Code</FormLabel>
                                <Input style={inputStyle} />
                            </Box>

                            <Box w={'48%'}>
                                <FormLabel>City</FormLabel>
                                <Input style={inputStyle} />
                            </Box>
                        </Box>

                        <FormLabel>Email address</FormLabel>
                        <Input style={inputStyle} />

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
                            <Button border={'1px solid black'} type='submit' mt={4}>Submit Address</Button>
                        </Box>
                    </FormControl>
                </form>
            </Box>

            {/* Second Half */}

            <Box w={{ md: '100%', lg: '100%', sm: "100%" }} p={4} borderRadius={'20px'}>
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
                                    <Image boxSize="45px" h={'40px'} mt={'3px'} w={'50px'} src={gpay} mixBlendMode={'darken'} />
                                </Box>
                            </Box>
                        </Box>

                        <Box display={'flex'} mb={4} >
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
                            <Input placeholder='Card Number' style={inputStyle} />
                        </Box>

                        <Box w={'48%'} ml={2}>
                            <FormLabel>Name on card</FormLabel>
                            <Input placeholder='Card name' style={inputStyle} />
                        </Box>
                    </Box>

                    <Box display={'flex'} mb={4}>
                        <Box w={'48%'}>
                            <FormLabel>Expiry date</FormLabel>
                            <Input placeholder='Month' style={inputStyle} />
                            <Input placeholder='Year' mt={2} style={inputStyle} />
                        </Box>

                        <Box w={'48%'} ml={2}>
                            <FormLabel>CVV/CVC</FormLabel>
                            <Input placeholder='CVC' style={inputStyle} />
                        </Box>
                    </Box>
                </FormControl>
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
                    <Button border={'1px solid black'} w={'90%'} type='submit' mt={4}>Pay Now</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CheckOut;
