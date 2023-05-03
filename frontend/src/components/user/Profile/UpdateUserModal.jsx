
import React, { useState,useEffect } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Text,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from '../../../utils/axios'
import { UPDATE_USER } from '../../../utils/API'
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const TransitionExample = ({user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const location = useLocation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [mobileError, setMobileError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [cpasswordError, setCPasswordError] = useState(false)



    const handleNameChange = (value) => {
        if (value.length < 3 && !value.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)) {
            setNameError(true)
        } else {
            setNameError(false)
            setName(value);
        }
    }

    const handleEmailChange = (value) => {
        if (!value.match(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
            setEmailError(true)
        } else {
            setEmailError(false)
            setEmail(value);
        }
    }

    const handleMobileChange = (value) => {
        if (!value.match(/^\d{10}$/)) {
            setMobileError(true)
        } else {
            setMobileError(false)
            setMobile(value);
        }
    }

    const handlePasswordChange = (value) => {
        if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
            setPassword(value);
        }
    }

    const handleCPasswordChange = (value) => {
        if (value !== password) {
            setCPasswordError(true)
        } else {
            setCPasswordError(false)
            setCPassword(value);
        }
    }


    const update = async () => {
        if (nameError || emailError || mobileError || passwordError || cpasswordError||name==''||email==''||password==''||mobile==''||cpassword=='') {
            toast.error('form not completed')
        } else {
            const token = localStorage.getItem('userToken');
            const body={
                username:name,
                email,
                mobile,
                password
            }
            await axios.put(`${UPDATE_USER}/${location.state.data}`,body, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                Swal.fire(
                    'User Updated!',
                    `${name} has been updated!`,
                    'success'
                )
                onClose()
            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        }
    }
    const setDetails=()=>{
        setName(user.username);
        setEmail(user.email);
        setMobile(user.mobile);
        setPassword(user.password);
    }

    useEffect(()=>{
        setDetails()
    })
    return (
        <>
            <Button mt={50} w={200} backgroundColor={'black.400'} onClick={onOpen}>UPDATE</Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader position={'text-center'}>Select Rooms</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>



                        <Flex
                            minH={'100vh'}
                            align={'center'}
                            justify={'center'}
                            bg={useColorModeValue('gray.50', 'gray.800')}>
                            <Stack
                                spacing={4}
                                w={'full'}
                                maxW={'md'}
                                bg={useColorModeValue('white', 'gray.700')}
                                rounded={'xl'}
                                boxShadow={'lg'}
                                p={6}
                                my={12}>
                                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                                    User Profile Edit
                                </Heading>

                                <FormControl id="userName" isRequired>
                                    <FormLabel>User name</FormLabel>
                                    <Input
                                        placeholder="UserName"
                                        _placeholder={{ color: 'gray.500' }}
                                        defaultValue={name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        type="text"
                                    />
                                    {nameError && <Text color={'red'}>Name should not be less than 3 characters</Text>}
                                </FormControl>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        placeholder="user email"
                                        _placeholder={{ color: 'gray.500' }}
                                        defaultValue={email}
                                        onChange={(e) => handleEmailChange(e.target.value)}
                                        type="email"
                                    />
                                    {emailError && <Text color={'red'}>Invalid Email Format</Text>}
                                </FormControl>
                                <FormControl id="mobile" isRequired>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <Input
                                        placeholder="mobile number"
                                        _placeholder={{ color: 'gray.500' }}
                                        defaultValue={faMobileAlt}
                                        onChange={(e) => handleMobileChange(e.target.value)}
                                        type="number"
                                    />
                                    {mobileError && <Text color={'red'}>Enter a valid Mobile Number excluding +91</Text>}
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        placeholder="password"
                                        _placeholder={{ color: 'gray.500' }}
                                        defaultValue={password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        type="password"
                                    />
                                    {passwordError && <Text color={'red'}>Password should contain 8 to 15 characters with at least one lowercase letter, one uppercase letter, one numeric digit, and one special character</Text>}
                                </FormControl>
                                <FormControl id="cpassword" isRequired>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input
                                        placeholder="confirm password"
                                        _placeholder={{ color: 'gray.500' }}
                                        defaultValue={password}
                                        onChange={(e) => handleCPasswordChange(e.target.value)}
                                        type="password"
                                    />
                                    {cpasswordError && <Text color={'red'}>Password and Confirm Password does not Match</Text>}
                                </FormControl>
                                <Stack spacing={6} direction={['column', 'row']}>
                                    <Button
                                        bg={'red.400'}
                                        color={'white'}
                                        w="full"
                                        onClick={onClose}
                                        _hover={{
                                            bg: 'red.500',
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        onClick={()=>update()}
                                        w="full"
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Submit
                                    </Button>
                                    <Toaster/>
                                </Stack>
                            </Stack>
                        </Flex>






                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TransitionExample;