import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead,Text, Tr, chakra, Button,Switch, Container } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaArrowCircleRight,FaTrash} from 'react-icons/fa'
import axios from '../../../utils/axios'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GET_MY_BOOKINGS } from '../../../utils/API';
import jwtDecode from 'jwt-decode';
const Main = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [bookings, setData] = useState([]);
    const token = localStorage.getItem('userToken');
    const decode = jwtDecode(token)
    const getData = async () => {
        // console.log('hi');
            await axios.get(`${GET_MY_BOOKINGS}/${decode.id}`, { headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
            // console.log(res);
            setData(res.data);

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
    }

    useEffect(() => {
        getData();
    }, [bookings])

    // console.log(bookings);

    const viewBooking =(id)=>{
        console.log('booking id',id);
        navigate('/profile/booking',{state:id})
    }


    const data = React.useMemo(
        () =>
            bookings.map((item) => ({
                _id:item._id,
                property: item.hotel.name,
                type:  item.hotel.type,
                date: new Date(item.booking_date).toDateString().slice(4,15),
                status: item.status,
                rooms:item.rooms.length,
                rate:item.rate,
                checkin:new Date(item.checkin).toDateString().slice(4,15),
                checkout:new Date(item.checkout).toDateString().slice(4,15)
            })),
        [bookings]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Property',
                accessor: 'property',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Rate',
                accessor: 'rate',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ row }) => {
                    const { status } = row.original;
                    return status === 'confirmed' ? (
                        <Text color={'green.300'}>Confirmed</Text>
                    ) : (
                        <Text color={'red.300'}>Awaiting Confirmation</Text>
                    );
                },
            },
            {
                Header: 'Rooms',
                accessor: 'rooms',
            },
            {
                Header: 'CheckIN',
                accessor: 'checkin',
            },
            {
                Header: 'CheckOUT',
                accessor: 'checkout',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: ({row}) => (
                    <Button 
                    onClick={()=>viewBooking(row.original._id)}
                     >
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
                                Booking History
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
