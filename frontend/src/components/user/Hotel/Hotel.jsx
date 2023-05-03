import {
    Box,
    Button,
    HStack,
    Heading,
    Spacer,
    Text,
    Center,
    Flex,
    VStack,
    Divider,
    Stack,
    Image
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaParking } from 'react-icons/fa';
import { SiGooglestreetview } from 'react-icons/si';
import { GiCoffeeCup } from 'react-icons/gi';
import { TbAirConditioning, TbFridge } from 'react-icons/tb';
import { MdSignalWifi3Bar } from 'react-icons/md';
import RoomSelection from './RoomSelectionModal';
import Map from './LocationMap';
import SliderComponent from './ImageSlider'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios'
import { gethotel } from '../../../utils/API'
import { GET_HOTEL_ROOMS } from '../../../utils/API'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
const Hotel = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const search = useSelector(state => state.search)
    const user = useSelector(state => state.user.user)
    // console.log(search);
    // console.log(search.dates[0].startDate);
    let startDate = search.dates[0].startDate;
    let endDate = search.dates[0].endDate
    const adults = search.options.adult
    // console.log(location.state.data);
    const [hotel, setHotel] = useState('')
    const [rate, setRate] = useState(0)
    const [rooms, setRooms] = useState([])
    const [titleCount, setTitleCount] = useState({})
    const getDetails = async () => {
        await axios.get(`${gethotel}/${location.state.data}`, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
            if (res.status === 200) {
                setHotel(res.data)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Data not found'
                })
            }
        }).catch((err) => {
            console.log(err)
        })

    }
    const getRooms = async (req, res) => {
        //tokn send
        await axios.get(`${GET_HOTEL_ROOMS}/${location.state.data}/${startDate}/${endDate}`, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
            if (res.status === 200) {
                // console.log(res.data);
                const uniqueArr = res.data.filter((obj, index, self) => {
                    return index === self.findIndex((t) => (
                        t.title === obj.title
                    ));
                });
                setRooms(uniqueArr)

                let newTitleCount = {};

                for (let i = 0; i < res.data.length; i++) {
                    let title = res.data[i].title;
                    newTitleCount[title] = (newTitleCount[title] || 0) + 1;
                }

                setTitleCount(newTitleCount);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Data not found'
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getDetails();
        getRooms();
    }, [])
    // console.log('rooms array',rooms)
    //console.log('frequency counter',titleCount)

    const slides = [
        { url: "", title: "hotel" },
        { url: "", title: "hotel" },
        { url: "", title: "hotel" },
        { url: "", title: "hotel" },
        { url: "", title: "hotel" },
    ];
    for (let i = 0; i < hotel?.photos?.length; i++) {
        slides[i].url = hotel?.photos[i]?.image_url;
    }
    const roomslides = rooms.map((item) => {
        const photos = item?.photos || [];
        return {
            slides: photos?.map((photo) => ({
                url: photo?.image_url || "",
                title: item?.title || "room",
            })),
        };
    });

    const containerStyles = {
        width: "1300px",
        height: "500px",
        margin: "0 auto",
    };
    const roomStyles = {
        width: "300px",
        height: "250px",
        margin: "0 auto",
    };

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const countDays = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
    // console.log(countDays(search.dates[0].startDate, search.dates[0].endDate));
    // console.log(typeof(countDays(search.dates[0].startDate, search.dates[0].endDate)));
    const numberOfDays = countDays(search.dates[0].startDate, search.dates[0].endDate);
    // console.log(search.dates[0].startDate, search.dates[0].endDate);

    const getDatesRange = (start, end) => {
        const date = new Date(start.getTime())

        let list = [];
        while (date <= end) {
            list.push(new Date(date))
            //list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list;
    }
    // console.log(getDatesRange(search.dates[0].startDate, search.dates[0].endDate));
    const dateRange = getDatesRange(search.dates[0].startDate, search.dates[0].endDate)

    const iSAvailable = (roomId) => {
        let result = rooms.filter(elem => elem._id === roomId);
        const isFound = result[0].unavailableDates.includes(new Date(search.dates[0].startDate).getTime()) || result[0].unavailableDates.includes(new Date(search.dates[0].endDate).getTime())
        console.log(isFound);
        return !isFound;
    }

    return (
        <>
            <Box p={10}>
                <HStack>
                    <Heading flex="1">{hotel?.name}</Heading>
                    <Spacer />
                    <Button bgColor="#003580" color="white" fontWeight="bold" borderRadius={0} _hover={{ bgColor: "none" }} >8.9</Button>
                </HStack>
                <HStack mb={10}>
                    <FaMapMarkerAlt />
                    <Text>Bharath Cancer Hospital Mysore  </Text>
                    <SiGooglestreetview style={{ color: "#286c16" }} />
                    <Map />
                </HStack>
                <Box style={containerStyles}>
                    <SliderComponent slides={slides} />
                </Box>
                <Flex>
                    <Text mt={50} fontSize={20} fontWeight={600}>Amenities</Text>
                    <Spacer />

                </Flex>
                <HStack>
                    <HStack><GiCoffeeCup /><Text>Restaurant</Text> </HStack>
                    <Center height='40px'  >
                        <Divider orientation='vertical' />
                    </Center>
                    <HStack><TbAirConditioning /><Text>Air Conditioning</Text> </HStack>
                    <Center height='40px'  >
                        <Divider orientation='vertical' />
                    </Center>
                    <HStack><MdSignalWifi3Bar /><Text>Wi-Fi</Text> </HStack>
                    <Center height='40px'  >
                        <Divider orientation='vertical' />
                    </Center>
                    <HStack><TbFridge /><Text>Refrigerator</Text> </HStack>
                    <Center height='40px'  >
                        <Divider orientation='vertical' />
                    </Center>
                    <HStack><FaParking /><Text>Parking</Text> </HStack>
                </HStack>
                <Text mt={50} fontSize={20} fontWeight={600}>About The Hotel</Text>
                <Text mt={25}>{hotel?.desc}
                </Text>
                <Text mt={50} fontSize={20} fontWeight={600}>Address</Text>
                <Text mt={25}>{hotel?.address}</Text>
                <Flex>
                    <Text mt={50} fontSize={20} fontWeight={600}>Room Types</Text>
                    <Spacer />

                </Flex>


                {
                    rooms && rooms.map((item, i) => {
                        return (
                            <>
                                <HStack p={10} minH={'300px'} key={i}>
                                    <Box width="30%"  >
                                        <Box style={roomStyles} >
                                            <SliderComponent slides={roomslides[i]?.slides} />
                                        </Box>
                                    </Box>
                                    <Center height='300px'  >
                                        <Divider orientation='vertical' />
                                    </Center>
                                    <Box width="30%" textAlign="center" display="flex" alignItems="center" justifyContent="center" >
                                        <VStack>
                                            <Text fontWeight={'bold'}>{item.title} </Text>
                                            <Text fontWeight={600}>{item.desc} </Text>
                                            <Text>Room for {item.people} </Text>
                                        </VStack>
                                    </Box>
                                    <Center height='300px'  >
                                        <Divider orientation='vertical' />
                                    </Center>
                                    <Box width="30%" textAlign="center" alignItems="center" justifyContent="center">
                                        <Text mt={10}> Rate for {adults} Adult(s) for {numberOfDays} Night Stay </Text>
                                        <Text mt={10} fontWeight={'bold'}>₹ {item.people * numberOfDays * item.rate}  </Text>
                                        {
                                            user ?
                                                <RoomSelection
                                                    hotelid={location.state.data}
                                                    roomid={item._id}
                                                    dateRange={dateRange}
                                                    address={hotel.address}
                                                    hotel={hotel.name}
                                                    room={item.title}
                                                    rate={item.people * numberOfDays * item.rate}
                                                    days={numberOfDays}
                                                    number={search.options.room}
                                                    maxCount={titleCount}
                                                    photo={hotel?.photos[0]?.image_url}
                                                />
                                                :
                                                <Button
                                                    mt={10}
                                                    colorScheme="red"
                                                    bgGradient="linear(to-r, red.400, red.500, red.600)"
                                                    color="white"
                                                    variant="solid"
                                                    onClick={() => navigate('/login')}
                                                >
                                                    Login to Reserve
                                                </Button>
                                        }
                                    </Box>
                                </HStack>
                            </>
                        )
                    })
                }

            </Box>


        </>
    )
}

export default Hotel;
