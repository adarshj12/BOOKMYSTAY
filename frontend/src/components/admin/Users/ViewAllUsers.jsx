import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, Switch, Container, TableContainer } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash, FaArrowCircleRight } from 'react-icons/fa'
import axios from '../../../utils/axios'
import { getAllUsers } from '../../../utils/API'
import { blockUser } from '../../../utils/API'
import { DELETE_USER } from '../../../utils/API'
import toast, { Toaster } from "react-hot-toast";
import { validateYupSchema } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../redux/adminSlice';
import { useDispatch } from 'react-redux';
const Main = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userList, setData] = useState([]);
    const users = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.get(getAllUsers, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                console.log(res);
                setData(res.data.users);

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        } catch (err) {
            console.log(`erroe => ${err.message}`)
        }
    }

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
                await axios.delete(`${DELETE_USER}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                }).catch((err) => {
                    console.log(`error=> ${err.message}`)
                })
                toast.error('user deleted');
            }
        })

    }
    useEffect(() => {
        users();
        // console.log(userList)
    }, [userList])

    // console.log(userList);

    const handleBlock = async (id, val) => {
        console.log(id, val);
            const token = localStorage.getItem('adminToken');
            await axios.get(`${blockUser}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                val ? toast.success('user unblocked') : toast.error('user blocked')
            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
    }
    const userProfile = (id) => {
        console.log(id);
        navigate('/admin/userdetail', { state: { data: id } })
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
                            <Th>status</Th>
                            {/* <Th>action</Th> */}
                            <Th>view</Th>
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
                                        <Td> <Switch
                                            colorScheme={elem.status ? 'green' : 'red'}
                                            size="sm"
                                            isChecked={elem.status}
                                            onChange={() => handleBlock(elem._id, elem.status)}
                                        /></Td>
                                        <Td> <Button onClick={() => userProfile(elem._id)} >
                                            <FaArrowCircleRight color={'blue'} />
                                        </Button></Td>

                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Main
