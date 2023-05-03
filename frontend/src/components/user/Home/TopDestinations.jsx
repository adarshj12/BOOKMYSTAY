import { Image, Box, Stack, Flex, Text, Container,Heading } from '@chakra-ui/react'
import axios from '../../../utils/axios'
import { COUNT_BY_CITY } from '../../../utils/API'
import { useEffect, useState } from 'react'

const TopDestinations = () => {
  const [data,setData] = useState([])
  
  const countByCity =async()=>{
    await axios.get(`${COUNT_BY_CITY}?cities=Kolkata,Mumbai,Nagpur`).then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      console.log(`error -> ${err.message}`);
    })
  }

  useEffect(()=>{
    countByCity()
  },[data])
  return (
    <>
      <Container ml={50} mt={10}  maxW={'7xl'}>

        <Heading>Top Destinations</Heading>
        <Stack direction='row'  spacing={4} flexWrap='wrap'>
          <Flex p={8} position='relative' direction='column' alignItems='center'>
            <Image h={400} w={300} objectFit='cover' src='https://images.pexels.com/photos/3893788/pexels-photo-3893788.jpeg?auto=compress&cs=tinysrgb&w=600' alt='Dan Abramov' />
            <Box position='absolute' top={'50%'} left={0}  zIndex={1} transform='translate(50%, 50%)'>
              <Heading fontWeight='bold' color='white'>Mumbai</Heading>
              <Text fontSize='sm' color='white'>{data[0]} Properties</Text>
            </Box>
          </Flex>

          <Flex p={8} position='relative' direction='column' alignItems='center'>
            <Image h={400} w={300} objectFit='cover' src='https://images.pexels.com/photos/4134642/pexels-photo-4134642.jpeg?auto=compress&cs=tinysrgb&w=600' alt='Dan Abramov' />
            <Box position='absolute' top={'50%'} left={0}  zIndex={1} transform='translate(50%, 50%)'>
            <Heading fontWeight='bold' color='white'>Mysore</Heading>
              <Text fontSize='sm' color='white'>{data[1]} Properties</Text>
            </Box>
          </Flex>
          <Flex p={8} position='relative' direction='column' alignItems='center'>
            <Image h={400} w={300} objectFit='cover' src='https://images.pexels.com/photos/14449828/pexels-photo-14449828.jpeg?auto=compress&cs=tinysrgb&w=600' alt='Dan Abramov' />
            <Box position='absolute' top={'50%'} left={0}  zIndex={1} transform='translate(50%, 50%)'>
            <Heading fontWeight='bold' color='white'>Kolkata</Heading>
              <Text fontSize='sm' color='white'>{data[2]} Properties</Text>
            </Box>
          </Flex>
        </Stack>

      </Container>

    </>
  )
}

export default TopDestinations;