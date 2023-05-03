import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button,Center,Text } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash, FaAmazonPay } from 'react-icons/fa'
import axios from '../../../utils/axios'
import { SHOW_PAYMENT_STATUS } from '../../../utils/API'
import {PAY_CLIENT} from '../../../utils/API'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const LIMIT = 10;

const totalPages = (total, limit) => {
    const pages = [];
    for (let i = 1; i <= parseInt(total / limit); i++) {
        pages.push(i);
    }
    return pages;
}



const Main = () => {
    const navigate = useNavigate()
    const [paymentStatus, setPaymentStatus] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const token = localStorage.getItem('adminToken')
    const payments = async () => {

        await axios.get(`${SHOW_PAYMENT_STATUS}/${activePage}/${LIMIT}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            // console.log(res);
            setPaymentStatus(res.data.records);
            setTotalUsers(res.data.total)
        }).catch((err) => {
            console.log(`error=> ${err.message}`)
        })
    }

    useEffect(() => {
        payments();
    }, [paymentStatus])

    //  console.log(paymentStatus);

    const handlePayment=async(id,share,payid)=>{
        console.log(id,share);
        const body={
            id,
            share,
            payid
        }
        await axios.put(`${PAY_CLIENT}`, body,{ headers: { 'Authorization': `Bearer ${token}` } }).then((res)=>{
            if(res.status===200)  toast.success('payment successful');
        }).catch(err=>toast.error(err.message))
    }

    const data = React.useMemo(
        () =>
        paymentStatus.map((item) => ({
                booking_id:item.booking._id,
                paymentid: item._id,
                clientid:item.client._id,
                client:item.client.username,
                booking_date: new Date(item.booking.booking_date).toDateString().slice(4,15),
                rate: item.booking_amount,
                share: item.client_share,
                payment_stat:item.status
            })),
        [paymentStatus]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Booking ID',
                accessor: 'booking_id',
            },
            {
                Header: 'Clientname',
                accessor: 'client',
            },
            {
                Header: 'Booking Date',
                accessor: 'booking_date',
            },
            {
                Header: 'Booking Amount',
                accessor: 'rate',
            },
            {
                Header: 'Client Share',
                accessor: 'share',
            },
            {
                Header: 'Status',
                accessor: 'payment_stat',
                Cell: ({ row }) => {
                    const { payment_stat } = row.original;
                    return payment_stat === 'paid' ? (
                        <Text>Paid</Text>
                    ) : (
                        <Button>
                            <FaAmazonPay color={'blue'}
                            onClick={()=>handlePayment(row.original.clientid,row.original.share,row.original.paymentid)}
                            />
                        </Button>
                    );
                },
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
                                Payments
                            </Heading>


                            <Center>


                                <Box >



                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            {activePage !== 1 && <li className="page-item"
                                                onClick={() => setActivePage(activePage - 1)}
                                            >
                                                <a className="page-link"
                                                    // href="javascript:void(null)"
                                                    href="#"
                                                    aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                            </li>}
                                            {totalPages(totalUsers, LIMIT).map(pageNo =>
                                                <li className={`page-item ${pageNo === activePage ? `active` : ``}`} key={pageNo}
                                                    onClick={() => setActivePage(pageNo)}
                                                >
                                                    <a className="page-link"
                                                        // href="javascript:void(null)"
                                                        href="#"
                                                    >
                                                        {pageNo}</a>
                                                </li>
                                            )}
                                            {activePage !== parseInt(totalUsers / LIMIT) && <li className="page-item"
                                                onClick={() => setActivePage(activePage + 1)}
                                            >
                                                <a className="page-link"
                                                    // href="javascript:void(null)"
                                                    href="#"
                                                    aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li>}
                                        </ul>
                                    </nav>




                                </Box>


                            </Center>
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
                <Toaster />
            </Box>
        </>
    )
}

export default Main
