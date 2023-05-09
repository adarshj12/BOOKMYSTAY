import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, TableContainer, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, Switch } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash } from 'react-icons/fa'
import axios from '../../../utils/axios'
import { getAllClients } from '../../../utils/API'
import { DELETE_CLIENT } from '../../../utils/API'
import { blockClient } from '../../../utils/API';
import { verifyClient } from '../../../utils/API';
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Main = () => {
    const navigate = useNavigate()
    const [userList, setData] = useState([]);
    const users = async () => {
        const token = localStorage.getItem('adminToken')
        await axios.get(getAllClients, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            // console.log(res);
            setData(res.data.clients);

        }).catch((err) => {
            console.log(`error=> ${err.message}`)
            if (err.response.status == 401 || err.response.status == 403) {
                toast.error(err.response.data.message)
                localStorage.removeItem('adminToken')
                navigate('/admin')
            } else {
                toast.error(err.response.data.message)
            }
        })
    }
    useEffect(() => {
        users();
        // console.log(userList)
    }, [userList])
    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('adminToken');
                await axios.delete(`${DELETE_CLIENT}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                }).catch((err) => {
                    console.log(`error=> ${err.message}`)
                })
                toast.error('user deleted');
            }
        })

    }
    const handleVerification = async (id,status) => {
            const token = localStorage.getItem('adminToken')
            await axios.get(`${verifyClient}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                status ? toast.error('client unverifed!') : toast.success('client verifed! ')

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
    }
    const handleBlock = async (id,status) => {
        console.log(id);
            const token = localStorage.getItem('adminToken')
            await axios.get(`${blockClient}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                status ? toast.success('client unblocked!'):toast.error('client blocked!') 

                
            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
    }

   

    return (
        <>
            <TableContainer p={10} bg={'chakra-body-bg'}>
                <Table variant='simple'>
                    <Thead>
                        <Tr fontStyle={'italic'}>
                            <Th>Username</Th>
                            <Th>mobile</Th>
                            <Th>email</Th>
                            <Th>verification</Th>
                            {/* <Th>action</Th> */}
                            <Th>status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            userList && userList.map((elem, i) => {
                                return (
                                    <Tr key={elem._id}>
                                        <Td>{elem.username}</Td>
                                        <Td>{elem.mobile}</Td>
                                        <Td>{elem.email}</Td>
                                        <Td>
                                            <Switch
                                                colorScheme={elem?.verified ? 'green' : null}
                                                size="sm"
                                                isChecked={elem?.verified}
                                                onChange={() => handleVerification(elem._id,elem?.verified)}
                                            />
                                        </Td>

                                        <Td> <Switch
                                            colorScheme={elem.status ? 'green' : 'red'}
                                            size="sm"
                                            isChecked={elem.status}
                                            onChange={() => handleBlock(elem._id,elem.status)}
                                        /></Td>
                                        {/* <Td> <Button onClick={() => userProfile(elem._id)} >
                                            <FaArrowCircleRight color={'blue'} />
                                        </Button></Td> */}

                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
                <Toaster/>
            </TableContainer>
        </>
    )
}

export default Main
