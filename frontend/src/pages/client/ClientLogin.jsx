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
    Image,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios'
import { loginClient } from '../../utils/API';
import clientimg from '../../assets/clientreg.jpg'
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
// import { login } from '../../redux/userSlice';
import { client_login } from '../../redux/clientSlice';
const ClientLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(email,password);
        console.log(email, password);
        const body = {
            email,
            password
        }
        try {
            await axios.post(loginClient, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                console.log(res);
                // console.log(JSON.stringify(res));
                if (res.status === 202) {
                    console.log('rtdyytftfutu');
                    localStorage.setItem('clientToken', res.data.token);
                    const decode = jwtDecode(res.data.token);
                    dispatch(client_login({
                        user: decode.name,
                        token: res.data.token
                    }))
                    navigate('/client');
                }
                alert(res.data.message);
            }).catch((err) => {
                console.log(err);
                console.log(JSON.stringify(err));
            })
        } catch (error) {
            console.log(`error=> ${error.message}`);
            alert(error.message);
        }
    };

    return (
        <Container maxWidth='container.lg' padding={10}>
            <Flex h={575} py={15}>

                <VStack
                    w='full'
                    h='full'
                    p={10}
                    spacing={10}
                    align='flex-start'
                >
                    <AspectRatio ratio={1} w={400} h="full">
                        <Image src={clientimg} />
                    </AspectRatio>
                </VStack>

                <VStack
                    w='full'
                    h='full'
                    p={8}
                    spacing={8}
                    align='flex-start'
                >
                    <VStack spacing={2} >
                        <Heading>ClientLogin</Heading>
                    </VStack>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={5} width={350}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                           
                            <Button width="full" type='submit'
                                size="lg">LOGIN</Button>
                                
                            <Text fontSize="sm">
                                Don't have an account?{" "}
                                <Box as="span" color="blue.500">
                                    <Link to='/clientregister'>Register Here</Link>

                                </Box>
                            </Text>
                            {/* <Text fontSize="sm" color='darkmagenta'>
                               <Link to='/mobile'>Sign in with mobile OTP ?</Link>
                            </Text> */}
                        </Stack>
                    </form>
                </VStack>

            </Flex>
        </Container>

    );
}

export default ClientLogin;
