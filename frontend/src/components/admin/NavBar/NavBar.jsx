import { useState } from "react";
import { Flex, Box, Text, Button, Menu, MenuButton, MenuList, MenuItem, HStack } from "@chakra-ui/react";
import { MdPerson } from "react-icons/md";

import React from 'react'
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import {adminLogout} from '../../../redux/adminSlice'
const NavBar = () => {
    
    let admin = useSelector(state => state.admin.user);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch =useDispatch()
    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    const logoutAdmin =()=>{
        localStorage.removeItem('adminToken');
        dispatch(adminLogout())
        navigate('/admin');
    }

    return (
        <Flex backgroundColor="blue.500" height="60px" alignItems="center" paddingX="50px">
            <Box width="200px">
                <Text fontSize="xl" fontWeight="bold" color="white">Book My Stay </Text>
            </Box>
            <Box flex="1" />
            <Menu>
                <MenuButton as={Button} variant="ghost" color="white" marginLeft="10px" onClick={handleMenuToggle}>
                    <HStack><Box as={MdPerson} size="24px" />
                    <Box as="span" marginRight="5px">{admin}</Box></HStack>
                </MenuButton>
                <MenuList isOpen={isOpen}>
                    <MenuItem onClick={logoutAdmin}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default NavBar
