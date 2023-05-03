import React, { useEffect, useState } from 'react'
import { Box, Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCalendarDays,
    faPerson
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import format from 'date-fns/format';
import video from '../../../assets/montage.mp4'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch,useSelector } from 'react-redux';
import { newSearch } from '../../../redux/searchSlice';
import SearchBar from './Search/SearchBar'
import { DESTINATIONS } from '../../../utils/API';
import axios from '../../../utils/axios'
const Header = () => {
    const [data, setData] = useState([]);
    const mobile = useSelector(state=>state.user.mobile);
    const user = useSelector(state=>state.user.user);
    const [toastShown, setToastShown] = useState(false);
    const places = async () => {
        await axios.get(DESTINATIONS).then(res => setData(res.data)).catch(err => console.log(`places fetch error : ${err.message}`))
    }

    const checkgoogleAuth =()=>{
        if(user&&!mobile&&!toastShown) 
        toast('You have logged in with Google, please update mobile no. in profile page!', {
            icon: '⚠️', 
            style: {
              color: 'black', 
            },
          });
          setToastShown(true)
    }
    useEffect(() => {
        places();
        checkgoogleAuth()
    }, [data])

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [destination, setDestination] = useState('');
    const [openOptions, setOpenOptions] = useState(false);
    const [isBrightness50, setIsBrightness50] = useState(true);
    const brightnessValue = isBrightness50 ? 'brightness(50%)' : 'brightness(100%)';
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            key: 'selection'
        }

    ])

    const handleOption = (option, operation) => {
        if (operation === "inc") {
            setOptions(prevOptions => ({ ...prevOptions, [option]: prevOptions[option] + 1 }));
        }
        else {
            setOptions(prevOptions => ({ ...prevOptions, [option]: prevOptions[option] - 1 }));
        }
    }


    const handleSearch = () => {
        console.log(destination, options, dates);
        if (destination === '') {
            toast.error('Please Select Destination...')
        } else {

            dispatch(newSearch({ destination, dates, options }));
            navigate('/search')
        }
    }

    return (

        <>
            <Box position="relative" width="100%" height="450px" overflow="hidden" >
                <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                        filter: `brightness(50%)`
                    }}
                />
                <Box display="flex" justifyContent="center" flexDirection={['column', 'row']} alignItems={'start'}>
                    <SearchBar data={data} setDestination={setDestination} destination={destination} />
                    <InputGroup flex={1}>
                        <InputLeftElement marginTop={1}
                            pointerEvents="none"
                            children={<FontAwesomeIcon icon={faCalendarDays} size={'2x'} />}
                            color="gray.300"
                        />
                        <Input rounded={'none'} h={65} value={`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`} bg="white" onClick={() => setOpenDate(!openDate)} />
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            minDate={new Date()} 
                        />}
                    </InputGroup>
                    <InputGroup flex={1}>
                        <InputLeftElement marginTop={4}
                            pointerEvents="none"
                            children={<FontAwesomeIcon icon={faPerson} size={'2x'} />}
                            color="gray.300"
                        />
                        <Input bg="white" rounded={'none'} h={65} value={`${options.adult} adult . ${options.children} children . ${options.room} room`} onClick={() => setOpenOptions(!openOptions)} />
                        {openOptions &&
                            <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "dec")}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "inc")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "dec")}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "inc")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "dec")}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "inc")}>+</button>
                                    </div>
                                </div>
                            </div>}
                    </InputGroup>
                    <Button rounded={'none'} w={100} h={65} backgroundColor={'blue.400'} onClick={() => handleSearch()}>Search</Button>
                    <Toaster />
                </Box>
            </Box>
        </>

    )
}

export default Header;


