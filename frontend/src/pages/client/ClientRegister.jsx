import React, { useState } from 'react'
import {
    AspectRatio,
    Button,
    Box,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import signup_img from '../../assets/clientlog.jpg'
import axios from '../../utils/axios'
import { registerClient } from '../../utils/API';
const ClientRegister = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(username, email, password, confirmPassword);
        const body ={
            username, 
            email, 
            password,
            mobile
        }
        if(password!==confirmPassword) alert('password mismatch');
        else{
            try {
                await axios.post(registerClient,body,{ headers: { "Content-Type": "application/json" } }).then((res)=>{
                    console.log(res);
                    console.log(JSON.stringify(res));
                    if(res.status===201) navigate('/clientlogin')
                    alert(res.data.message);
                }).catch((err)=>{
                    console.log(err);
                    console.log(JSON.stringify(err));
                }) 
            } catch (error) {
                console.log(`error=> ${error.message}`);
                alert(error.message);
            }
        }
    };

    return (
        <Container maxWidth='container.lg' padding='10'>
            <Flex h={570} py={15}>

                <VStack
                    w='full'
                    h='full'
                    p={10}
                    spacing={10}
                    align='flex-start'
                >
                    <AspectRatio ratio={1} w={400} h="full">
                        <Image src={signup_img} />
                    </AspectRatio>
                </VStack>

                <VStack
                    w='full'
                    h='full'
                    p={4}
                    spacing={8}
                    align='flex-start'
                >
                    <VStack spacing={2} >
                        <Heading>Client Registration</Heading>
                        {/* <HStack><Text>Already have an account?</Text>
                            <Link to='/login' style={{ color: 'green' }} > Click here to login in</Link>
                        </HStack> */}
                    </VStack>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3} width={350}>
                            <FormControl id="name">
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Mobile Number</FormLabel>
                                <Input
                                    type="text"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl id="confirmPassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </FormControl>

                            <Button width="full" color="green.400" type='submit'
                                size="lg">REGISTER</Button>
                            <Text fontSize="sm">
                                Already have an account?{" "}
                                <Box as="span" color="blue.500">
                                    <Link to='/clientlogin'> Log in here</Link>

                                </Box>
                            </Text>
                        </Stack>
                    </form>
                </VStack>

            </Flex>
        </Container>
    );
}

export default ClientRegister
