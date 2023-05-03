import React, { useState } from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, VStack, Flex, InputRightElement, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBed,
} from "@fortawesome/free-solid-svg-icons";
const SearchBar = ({ data,setDestination ,destination}) => {
    const [filter,setFilter] =useState([])
    const handleFilter=(e)=>{
        const searchWord = e.target.value;
        const newFilter = data.filter((value)=>{
            return value.city.toLowerCase().includes(searchWord.toLowerCase())
        })
        if(searchWord===""){
            setFilter([])
        }else{

            setFilter(newFilter)
        }
    }

    const selection=(place)=>{
        setDestination(place);
        setFilter([])
    }
    return (
        <>
            <InputGroup flex={1} alignItems={'start'}>

                <InputLeftElement marginTop={4}
                    pointerEvents="none"
                    children={<FontAwesomeIcon icon={faBed} size={'2x'} />}
                    color="gray.300"
                />
                <VStack>

                    <Input rounded={'none'} paddingLeft={16}  bg="white" w={415} h={65} placeholder='Where are you going?' 
                    defaultValue={destination}
                    onChange={handleFilter} />
                   { filter.length!=0&&
                    
                    <div className="dataResult">
                        {filter.slice(0,5).map((value,key) => {
                            return (
                                <Box
                                    className='dataItem'
                                    _hover={{ cursor: 'pointer', bg: 'gray.100' }}
                                    key={key}
                                >
                                    <Text onClick={()=>selection(value.city)}>{value.city}</Text>
                                </Box>
                            )
                        })}

                    </div>
                    }
                </VStack>
            </InputGroup>
        </>
    )
}

export default SearchBar
