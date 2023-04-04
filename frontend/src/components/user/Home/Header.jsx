import React from 'react'
import { Box, Button, HStack, Input, InputGroup, InputLeftElement,VStack,Flex } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBed,
    faCalendarDays,
    faPerson
} from "@fortawesome/free-solid-svg-icons";
import video from '../../../assets/montage.mp4'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate()
    return (

        <Box position="relative" width="100%" height="450px" overflow="hidden">
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
                    zIndex: -1,
                }}
            />

            <HStack  alignItems="center" position="absolute" bottom="0" left="0" right="0" p="4" >
                <InputGroup>
                    <InputLeftElement marginTop={4}
                        pointerEvents="none"
                        children={<FontAwesomeIcon icon={faBed} size={'2x'} />}
                        color="gray.300"
                    />
                    <Input bg="white" h={65} placeholder='Where are you going' />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement marginTop={4}
                        pointerEvents="none"
                        children={<FontAwesomeIcon icon={faCalendarDays} size={'2x'} />}
                        color="gray.300"
                    />
                    <Input bg="white" h={65} placeholder={`from 20 March to 30 March`} />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement marginTop={4}
                        pointerEvents="none"
                        children={<FontAwesomeIcon icon={faPerson} size={'2x'} />}
                        color="gray.300"
                    />
                    <Input bg="white" h={65} placeholder='No. o adults' />
                </InputGroup>
                <Button w={600} h={65} backgroundColor={'blue.400'} onClick={()=>navigate('/search')}>Search</Button>
            </HStack>
        </Box>


      

      
      


    )
}

export default Header;


