import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button,Switch, Container } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaTrash,FaArrowCircleRight} from 'react-icons/fa'
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
            await axios.get(getAllUsers, { headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
            console.log(res);
            setData(res.data.users);

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        } catch (err) {
            console.log(`erroe => ${err.message}`)
        }
    }

    const deleteUser=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
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

    const handleBlock=async(id,val)=>{
        console.log(id,val);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.get(`${blockUser}/${id}`,{ headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
                val?toast.success('user unblocked'):toast.error('user blocked')
            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })

        } catch (err) {
            console.log(`error=> ${err.message}`)
        }
    }
    const userProfile=(id)=>{
        console.log(id);
        navigate('/admin/userdetail',{state:{data:id}})
    }

    const data = React.useMemo(
        () =>
            userList.map((item) => ({
                _id:item._id,
                user: item.username,
                mobile: item.mobile,
                email: item.email,
                status: item.isBlocked,
            })),
        [userList]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'user',
            },
            {
                Header: 'Mobile',
                accessor: 'mobile',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            // {
            //     Header: 'Status',
            //     accessor: 'status',
            //     Cell: ({ value,row }) => (
            //         <Button colorScheme={value ? 'red' : 'green'} 
            //         size="sm"
            //         onClick={() => handleBlock( row.original._id)}
            //         >
            //             {value ? 'Blocked' : 'Active'}
            //         </Button>
            //     ),
            // },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value,row }) => (
                    <Switch
                        colorScheme={value ? 'green' : 'red'}
                        size="sm"
                        isChecked={value}
                        onChange={() => handleBlock(row.original._id,value)}
                    />
                ),
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({row}) => (
                    <Button onClick={()=>deleteUser(row.original._id)}>
                        <FaTrash color={'red'}/>
                    </Button>
                ),
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: ({row}) => (
                    <Button onClick={()=>userProfile(row.original._id)} >
                        <FaArrowCircleRight color={'blue'}/>
                    </Button>
                ),
            }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <>
        <Container maxW={'7xl'}>

      
            <Box>
                <Flex>
                    <Box ml={4} flex={1}>
                        <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
                            <Heading size="md" mb={2}>
                                Users
                            </Heading>
                            <Table {...getTableProps()}>
                                <Thead>
                                    {headerGroups.map((headerGroup) => (
                                        <Tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <Th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}

                                                >
                                                    {column.render('Header')}
                                                    <chakra.span pl='4'>
                                                        {column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <TriangleDownIcon aria-label='sorted descending' />
                                                            ) : (
                                                                <TriangleUpIcon aria-label='sorted ascending' />
                                                            )
                                                        ) : null}
                                                    </chakra.span>
                                                </Th>
                                            ))}
                                        </Tr>
                                    ))}
                                </Thead>
                                <Tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row)
                                        return (
                                            <Tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <Td {...cell.getCellProps()} >
                                                        {cell.render('Cell')}
                                                    </Td>
                                                ))}
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                </Flex>
                <Toaster/>
            </Box>
            </Container>
        </>
    )
}

export default Main
