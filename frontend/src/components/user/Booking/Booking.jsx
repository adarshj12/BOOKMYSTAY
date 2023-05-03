import React, { useState, useEffect } from 'react'
import { AspectRatio, Button, Center, Container, Badge, Box, Radio, RadioGroup, Divider, Flex, GridItem, Heading, HStack, Image, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import razorpay from '../../../../src/assets/razorpay.jpeg'
import paypal from '../../../../src/assets/paypal.jpeg'
import stripe from '../../../../src/assets/stripe.jpeg'
import { useLocation } from 'react-router-dom';
import axios from '../../../utils/axios'
import { BOOK } from '../../../utils/API'
import { STRIPE_BOOK } from '../../../utils/API'
import { GET_DETAIL_USER } from '../../../utils/API'
import logo from '../../../assets/booknstay_razorpay.jpg'
import jwtDecode from 'jwt-decode';
import { ThreeDots } from 'react-loader-spinner';


const Booking = () => {
    const location = useLocation();
    const checkIn = location.state.dateRange[0]
    const checkOut = location.state.dateRange[location.state.dateRange.length - 1]
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dateString1 = location.state.dateRange[0]
    const dateString2 = location.state.dateRange[location.state.dateRange.length - 1]
    let dayOfWeek1 = weekday[dateString1.getDay()];
    let dayOfWeek2 = weekday[dateString2.getDay()];
    const [hotelid, sethotelid] = useState(location.state.hotelid);
    const [roomid, setroomid] = useState(location.state.roomid);
    const [dateRange, setdateRange] = useState(location.state.dateRange);
    const [count, setCount] = useState(location.state.count)
    const [room, setRoom] = useState(location.state.room)
    const [rate,setRate] = useState(location.state.rate)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('2');
    const [user, setUser] = useState('')
    const decode = jwtDecode(localStorage.getItem('userToken'));
    const token = localStorage.getItem('userToken');
    const userId = decode.id
    const getuser = async () => {
        await axios.get(`${GET_DETAIL_USER}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            setUser(res.data);
        }).catch((err) => {
            console.log(`error=> ${err.message}`)
        })
    }

    useEffect(() => {
        getuser();
    }, [user])

    const reserve = async () => {
        const amount = location.state.rate;
        const body = {
            hotelid, roomid, dateRange, count, room ,userId,rate
        }
        // console.log(window)
        await axios.post(BOOK, body, { headers: { "Content-Type": "application/json" } }).then(res => console.log(res.data))
            .catch((err) => console.log(`error - ${err.message}`))
        const { data: { key } } = await axios.get(`/getKey`)

        const { data: { order } } = await axios.post(`/users/checkout`, {
            amount
        })
        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "Bookn' Stay",
            description: "Booking Application",
            image: logo,
            order_id: order.id,
            // callback_url: `http://localhost:4000/api/v1/users/verification/${hotelid}/${room}/${dateRange}/${count}`,
            callback_url: `http://localhost:4000/api/v1/users/verification`,

            prefill: {
                "name": user?.username, 
                "email":user?.email,
                "contact": `+91${user?.mobile}`
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#030505"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open()
    }

    const stripe_reserve = async () => {
        const body = {
            hotelid, roomid, dateRange, count, room ,userId,rate
        }
        // console.log(window)
        await axios.post(BOOK, body, { headers: { "Content-Type": "application/json" } }).then(res => console.log(res.data))
            .catch((err) => console.log(`error - ${err.message}`))

        const data = {
            user: 'sukumar',
            item: location.state.hotel,
            total: location.state.rate
        }
        await axios.post(`/users/create-checkout-session`,
            { data }
        )
            .then(res => {
                console.log(res)
                if (res.data.url) {
                    window.location.href = res.data.url
                }
            })
            .catch(err => console.log(err))
    }

    const handlePayment = () => {
        if (selectedPaymentMethod === '1') {
            reserve();
        } else if (selectedPaymentMethod === '2') {
            stripe_reserve();
        }
    }

    return (

        <Container maxWidth='container.xl' padding='5'>
            <Flex h={'100vh'} py={20}>
                <VStack
                    w={'full'}
                    p={5}
                    spacing={10}
                    align={'flex-start'}
                >
                    <VStack spacing={2} align={'flex-start'}>
                        <Heading>
                            Guest Details
                        </Heading>
                        <Text>Review your Booking</Text>
                    </VStack>
                    <SimpleGrid columns={2} columnGap={3} rowGap={5}>
                        <GridItem colSpan={1}>
                            <HStack><Text fontWeight={'bold'}>Name</Text>
                                <Text>{user?.username}</Text></HStack>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <HStack><Text fontWeight={'bold'}>Ph. Number</Text>
                                <Text>+91{user?.mobile}</Text></HStack>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <HStack><Text fontWeight={'bold'}>Email</Text>
                                <Text>{user?.email}</Text></HStack>
                        </GridItem>
                        <GridItem mt={5} colSpan={2}>
                            <Flex >
                                <RadioGroup defaultValue='2' onChange={value => setSelectedPaymentMethod(value)}>
                                    <Stack spacing={40} direction='row'>
                                        <Radio colorScheme='blue' value='1'>
                                            <Image h={30} w={100} src={razorpay} />
                                        </Radio>
                                        <Radio colorScheme='blue' value='2'>
                                            <Image h={50} w={100} src={stripe} />
                                        </Radio>
                                    </Stack>
                                </RadioGroup>

                            </Flex>
                        </GridItem>

                        <GridItem mt={5} colSpan={2}>
                            <Button
                                w={'full'}
                                rounded={'none'}
                                mt={3}
                                size={'lg'}
                                colorScheme="teal"
                                bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                                color="white"
                                variant="solid"
                                onClick={() => handlePayment()}
                            >
                                Reserve
                            </Button>
                        </GridItem>

                    </SimpleGrid>


                </VStack>

                <VStack
                    bg={'gray.100'}
                    w={'full'}
                    p={5}
                    spacing={10}
                    align={'flex-start'}
                >
                    <VStack spacing={2} align={'flex-start'}>
                        <Heading>
                            {location.state.hotel}
                        </Heading>
                        <Text>{location.state.address}</Text>
                    </VStack>
                    <HStack spacing={4} alignItems={'center'} w={'full'}>
                        <AspectRatio ratio={1} w={150} h={150}>
                            <Image src={location.state.photo} />
                        </AspectRatio>
                        <VStack>

                            <Heading size={'md'} color={'gray.600'}>{location.state.room} ({location.state.count} rooms) </Heading>
                            <HStack  >
                                <Box width="40%" >
                                    <VStack>
                                        <Text color={'gray.400'}>CHECK IN</Text>
                                        <Text fontWeight={'bold'}>{checkIn.toString().slice(4, 15)}</Text>
                                        <Text color={'gray.400'}>{dayOfWeek1} 12 PM</Text>
                                    </VStack>
                                </Box>
                                <Center height='100px'  >
                                    <Divider orientation='vertical' />
                                </Center>
                                <Box width="20%" >
                                    <Badge colorScheme='purple' >{location.state.days} NIGHTS</Badge>


                                </Box>
                                <Center height='100px'  >
                                    <Divider orientation='vertical' />
                                </Center>
                                <Box width="40%" >
                                    <VStack>
                                        <Text color={'gray.400'}>CHECK OUT</Text>
                                        <Text fontWeight={'bold'}>{checkOut.toString().slice(4, 15)}</Text>
                                        <Text color={'gray.400'}>{dayOfWeek2} 11 AM</Text>
                                    </VStack>
                                </Box>
                            </HStack>
                        </VStack>


                    </HStack>
                    <HStack p={20} style={{ flex: 1 }}>
                        <Text fontWeight={'bold'} style={{ textAlign: 'center', flex: 1 }}

                        >
                            Total Amount to be paid
                        </Text>
                        <Heading fontWeight={'bold'} style={{ textAlign: 'center', flex: 1 }}>
                            ₹ {location.state.rate}
                        </Heading>
                    </HStack>

                </VStack>

            </Flex>

        </Container>
    )
}

export default Booking
