import { Box, Flex, Text, Spacer, Stack, Menu, MenuButton, MenuList, MenuItem, HStack } from "@chakra-ui/react";
import { FaHome, FaUsers, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../../redux/userSlice';
import {client_logout} from '../../../redux/clientSlice';
import {Link} from 'react-router-dom'

const ClientNavbar=()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  let client = useSelector(state => state.client.user);
   console.log(client);
  const logoutClient=()=>{
    localStorage.removeItem('clientToken');
    dispatch(client_logout());
    navigate('/');
  }
  return (
    <Box boxShadow="sm" bg={'gray.400'} p="4">
      <Flex alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">
          Client Dashboard
        </Text>

        <Spacer />

        <Stack direction="row" spacing="4">
        <HStack> <FaHome /><Link to='/client/property'>Properties</Link></HStack>
        <HStack><FaUsers /><Link to='/client/users'>Users</Link></HStack>
        <HStack><FaUsers /><Link to='/client/fianace'>Finance</Link></HStack>  
        </Stack>

        <Spacer />
        <FaUserAlt />
        <Menu>
          <MenuButton as={Stack} direction="row" spacing="2" cursor="pointer">
           
            <Text>Welcome {client} </Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logoutClient}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default ClientNavbar;