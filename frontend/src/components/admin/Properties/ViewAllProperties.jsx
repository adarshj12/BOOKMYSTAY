import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, TableContainer } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash, FaArrowCircleRight } from 'react-icons/fa'
import axios from '../../../utils/axios'
import { GET_ALL_PROPERTIES } from '../../../utils/API'
import Swal from 'sweetalert2';
import { deltehotel } from '../../../utils/API'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Main = () => {
    const navigate = useNavigate()
    const [hotelList, setData] = useState([]);
    const properties = async () => {
        const token = localStorage.getItem('adminToken')
        await axios.get(GET_ALL_PROPERTIES, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            // console.log(res);
            setData(res.data);

        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                toast.error(err.response.data.message)
                localStorage.removeItem('adminToken')
                navigate('/admin')
            } else {
                toast.error(err.response.data.message)
            }
        })
    }

    const deleteHotel = async (id,hotel) => {
        console.log(id);
        Swal.fire({
            title: `Are you sure you want to delete ${hotel}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
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



    return (
        <>
            <TableContainer p={10} bg={'chakra-body-bg'}>
                <Table variant='simple'>
                    <Thead>
                        <Tr fontStyle={'italic'}>
                            <Th>Hotelname</Th>
                            <Th>client</Th>
                            <Th>type</Th>
                            <Th>place</Th>
                            {/* <Th>action</Th> */}
                            <Th>view</Th>
                            <Th>delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            hotelList && hotelList.map((elem, i) => {
                                return (
                                    <Tr key={elem._id}>
                                        <Td>{elem.name}</Td>
                                        <Td>{elem.result.username}</Td>
                                        <Td>{elem.type}</Td>
                                        <Td>{elem.city}</Td>
                                       
                                        <Td> <Button onClick={() => navigate('/admin/propertydetail', { state: { data: elem._id } })} >
                                            <FaArrowCircleRight color={'blue'} />
                                        </Button></Td>
                                        <Td><Button
                                            onClick={() => deleteHotel(elem._id,elem.name)}
                                        >
                                            <FaTrash color={'red'} />
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
