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
import axios from '../../utils/axios';
import { registerUser } from '../../utils/API';
import { Link, useNavigate } from 'react-router-dom';
import signup_img from '../../assets/reg.jpg'

const Register = () => {
    const [username, setName] = useState("")
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(username, email,mobile, password, confirmPassword);
        const body ={
            username, 
            email, 
            password,
            mobile
        }
        if(password!==confirmPassword) alert('password mismatch');
        try {
            await axios.post(registerUser,body,{ headers: { "Content-Type": "application/json" } }).then((res)=>{
                console.log(res);
                console.log(JSON.stringify(res));
                if(res.status===201) navigate('/login')
                alert(res.data.message);
            }).catch((err)=>{
                console.log(err);
                console.log(JSON.stringify(err));
            }) 
        } catch (error) {
            console.log(`error=> ${error.message}`);
            alert(error.message);
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
                        <Heading>Registration</Heading>
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
                                    onChange={(e) => setName(e.target.value)}
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
                                <Box as="span"  color="blue.500">
                                    <Link to='/login'> Log in here</Link>

                                </Box>
                            </Text>
                        </Stack>
                    </form>
                </VStack>

            </Flex>
        </Container>
    );
}

export default Register

