import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button ,Switch } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaTrash} from 'react-icons/fa'
import axios from '../../../utils/axios'
import { getAllClients } from '../../../utils/API'
import {DELETE_CLIENT} from '../../../utils/API'
import { blockClient } from '../../../utils/API';
import { verifyClient } from '../../../utils/API';
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
const Main = () => {
    const [userList, setData] = useState([]);
    const users = async () => {
        // console.log('view clients page')
        try {
            const token = localStorage.getItem('adminToken')
            await axios.get(getAllClients, { headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
                // console.log(res);
                setData(res.data.clients);

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        } catch (err) {
            console.log(`erroe => ${err.message}`)
        }
    }
    useEffect(() => {
        users();
        // console.log(userList)
    }, [userList])
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
                    await axios.delete(`${DELETE_CLIENT}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                    }).catch((err) => {
                        console.log(`error=> ${err.message}`)
                    })
                    toast.error('user deleted');
            } 
          })
          
    }
    // console.log(userList);

    const data = React.useMemo(
        () =>
            userList.map((item) => ({
                _id: item._id,
                user: item.username,
                mobile: item.mobile,
                email: item.email,
                verified: item.verified,
                status:item.isBlocked
            })),
        [userList]
    );
    const handleVerification=async(id)=>{
        console.log(id);
        try {
            const token = localStorage.getItem('adminToken')
            await axios.get(`${verifyClient}/${id}`, { headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
                console.log(res);

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        } catch (err) {
            console.log(`erroe => ${err.message}`)
        }
    }
    const handleBlock=async(id)=>{
        console.log(id);
        try {
            const token = localStorage.getItem('adminToken')
            await axios.get(`${blockClient}/${id}`, { headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
                console.log(res);

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        } catch (err) {
            console.log(`erroe => ${err.message}`)
        }
    }

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
            {
                Header: 'Verified',
                accessor: 'verified',
                Cell: ({ value, row }) => (
                    <Switch
                        colorScheme={value ? 'green' : 'red'}
                        size="sm"
                        isChecked={value}
                        onChange={() => handleVerification(row.original._id)}
                    />
                ),
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value,row }) => (
                    <Button colorScheme={value ? 'red' : 'green'} 
                    size="sm"
                    onClick={() => handleBlock( row.original._id)}
                    >
                        {value ? 'Blocked' : 'Active'}
                    </Button>
                ),
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({row}) => (
                    <Button 
                    onClick={()=>deleteUser(row.original._id)}
                    >
                        <FaTrash color={'red'}/>
                    </Button>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <>
            <Box p={4}>
                <Flex>
                    <Box ml={4} flex={1}>
                        <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
                            <Heading size="md" mb={2}>
                                Clients
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
            </Box>
        </>
    )
}

export default Main
