import React, { useEffect, useState } from 'react'
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../utils/axios'
import { getAllUsers } from '../../../utils/API'


const Main = () => {
  const [userList, setData] = useState([]);
  const users = async () => {
    try {
      await axios.get(getAllUsers, { headers: { "Content-Type": "application/json" } }).then((res) => {
        console.log(res);
        setData(res.data.users);

      }).catch((err) => {
        console.log(`error=> ${err.message}`)
      })
    } catch (err) {
      console.log(`erroe => ${err.message}`)
    }
  }
  useEffect(() => {
    users();
    console.log(userList)
  }, [])
  return (
    <>
      <FontAwesomeIcon icon="fa-solid fa-heart" beat size="xs" style={{ color: "#ff0000", }} />
      <Box flex="1" p="4">
        <Heading size="lg" mb="4">Users</Heading>


        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Mobile</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userList?.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{item.username}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.mobile}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}

export default Main
