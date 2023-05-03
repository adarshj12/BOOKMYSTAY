import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, ButtonGroup, Center, Text, HStack ,Select,Spacer} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FaTrash, FaArrowCircleRight } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { GET_ALL_BOOKINGS } from '../../../utils/API'
import { ADMIN_GET_BOOKINGS } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const LIMIT = 10;

const totalPages = (total, limit) => {
    const pages = [];
    for (let i = 1; i <= parseInt(total / limit); i++) {
        pages.push(i);
    }
    return pages;
}




const BookingList = () => {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const [details, setDetails] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [activePage, setActivePage] = useState(1);
    const [duration,setDuration] = useState('all')

   const token = localStorage.getItem('adminToken');
    const decode = jwtDecode(token);

    const list = async () => {
        await axios.get(`${ADMIN_GET_BOOKINGS}?page=${activePage}&size=${LIMIT}&duration=${duration}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
            // console.log(res.data.records);
            setBookings(res.data.records);
            setTotalUsers(res.data.total)
        }).catch(err => console.log(err.message))
    }
    // console.log(list)

    useEffect(() => {
        // getMyHotelBookings()
        list()
    }, [bookings,duration])

    const data = React.useMemo(
        () =>
            bookings.map((item) => ({
                booking: item._id,
                date: new Date(item.booking_date)?.toDateString()?.slice(4, 15),
                guest: item.user.username,
                client: item.client.username,
                city: item.hotel.city,
                property: item.hotel.name,
                status: 'placed'
            })),
        [bookings]
    );

    // console.log(bookings)

    const columns = React.useMemo(
        () => [
            {
                Header: 'Booking ID',
                accessor: 'booking',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Guest',
                accessor: 'guest',
            },
            {
                Header: 'Client',
                accessor: 'client',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'Property',
                accessor: 'property',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'View',
                accessor: 'view',
                Cell: ({ row }) => (
                    <Button
                    // onClick={()=>userBooking(row.original._id)} 
                    >
                        <FaArrowCircleRight color={'blue'} />
                    </Button>
                ),
            }
        ],
        [bookings]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    const pageArray = totalPages(totalUsers, LIMIT);
    let pagesToShow = pageArray;
    if (pageArray.length > 7) {
        pagesToShow = pageArray.slice(activePage - 4, activePage + 3);
        if (activePage < 5) {
            pagesToShow = pageArray.slice(0, 7);
        } else if (activePage > pageArray.length - 4) {
            pagesToShow = pageArray.slice(pageArray.length - 7);
        }
    }


    const handleOptionChange =async (e) => {
        setDuration(e.target.value);
        console.log(duration)
      };

    return (
        <>
            <Box p={4}>
                <Flex>
                    <Box ml={4} flex={1}>
                        <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
                            <Heading size="md" mb={2}>
                                Bookings
                            </Heading>

                            <HStack>


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
                                <Spacer/>
                               <Box w={150}>
                               <Select  onChange={handleOptionChange} placeholder='Select option'>
                                    <option value='month' >This Month</option>
                                    <option value='week'>This Week</option>
                                </Select>
                               </Box>
                            </HStack>


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

export default BookingList;



// for sorting table

// import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, useSortBy } from "@chakra-ui/react";
// import { useMemo } from "react";

// function BookingsTable(props) {
//   const { bookings } = props;

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Booking ID",
//         accessor: "id",
//       },
//       {
//         Header: "User",
//         accessor: "user",
//       },
//       {
//         Header: "Hotel",
//         accessor: "hotel",
//       },
//       {
//         Header: "Date",
//         accessor: "date",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//       },
//     ],
//     []
//   );

//   const data = useMemo(
//     () =>
//       bookings.map((booking) => ({
//         id: booking.id,
//         user: booking.user,
//         hotel: booking.hotel,
//         date: booking.date,
//         status: booking.status,
//       })),
//     [bookings]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useSortBy(
//     {
//       columns,
//       data,
//     }
//   );

//   return (
//     <Box p={4}>
//       <Flex>
//         <Box ml={4} flex={1}>
//           <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
//             <Heading size="md" mb={2}>
//               Bookings
//             </Heading>
//             <Table {...getTableProps()}>
//               <Thead>
//                 {headerGroups.map((headerGroup) => (
//                   <Tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map((column) => (
//                       <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                         {column.render("Header")}
//                         <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
//                       </Th>
//                     ))}
//                   </Tr>
//                 ))}
//               </Thead>
//               <Tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);
//                   return (
//                     <Tr {...row.getRowProps()}>
//                       {row.cells.map((cell) => (
//                         <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
//                       ))}
//                     </Tr>
//                   );
//                 })}
//               </Tbody>
//             </Table>
//           </Box>
//         </Box>
//       </Flex>
//     </Box>
//   );
// }

// export default BookingsTable;
