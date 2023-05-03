import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaTrash,FaArrowCircleRight} from 'react-icons/fa'
import axios from '../../../utils/axios'
import { GET_ALL_PROPERTIES } from '../../../utils/API'
import Swal from 'sweetalert2';
import {deltehotel} from '../../../utils/API'
import { useNavigate } from 'react-router-dom';
const Main = () => {
    const navigate = useNavigate()
    const [hotelList, setData] = useState([]);
    const properties = async () => {
        try {
            const token = localStorage.getItem('adminToken')
            await axios.get(GET_ALL_PROPERTIES,{ headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
                // console.log(res);
                setData(res.data);

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        } catch (err) {
            console.log(`erroe => ${err.message}`)
        }
    }

    const deleteHotel = async (id) => {
        console.log(id);
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
                    await axios.delete(`${deltehotel}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'The property has been deleted.',
                            'success'
                          )
                    }).catch((err) => {
                        console.log(`error=> ${err.message}`)
                    })
            } 
          })
    }
    useEffect(() => {
        properties();
        // console.log(hotelList)
    }, [hotelList])

    // console.log(hotelList);

    const data = React.useMemo(
        () =>
            hotelList.map((item) => ({
                id:item._id,
                name: item.name,
                client: item.result.username,
                type: item.type,
                place:item.city,
            })),
        [hotelList]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Propertyname',
                accessor: 'name',
            },
            {
                Header: 'Clientname',
                accessor: 'client',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Place',
                accessor: 'place',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: ({row}) => (
                    <Button 
                    onClick={()=>navigate('/admin/propertydetail',{state:{data:row.original.id}})}
                    >
                        <FaArrowCircleRight color={'blue'}/>
                    </Button>
                ),
            },
            {
                Header: 'Delete',
                accessor: 'delete',
                Cell: ({row}) => (
                    <Button 
                    onClick={()=>deleteHotel(row.original.id)}
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
                               Properties
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
