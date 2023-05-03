import { Image, Box, Stack, Flex, Text, Container, Heading } from '@chakra-ui/react'
import axios from '../../../utils/axios'
import { COUNT_BY_TYPE } from '../../../utils/API'
import { useEffect, useState } from 'react'
const Explore = () => {
  const [data, setData] = useState([])
  const countByType = async () => {
    await axios.get(`${COUNT_BY_TYPE}`).then((res) => {
      setData(res.data)
    }).catch((err) => {
      console.log(`error -> ${err.message}`);
    })
  }

  useEffect(() => {
    countByType()
  }, [data])

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ]



  return (
    <>
      <Container ml={50} mt={10} maxW={'7xl'}>

        <Heading>Explore By Type</Heading>
        <Stack direction='row' spacing={4} flexWrap='wrap'>
          {
            data && images.map((img, i) => {
              return (
                <Flex key={i} p={5} position='relative' direction='column' alignItems='center'>
                  <Image h={260} w={180} objectFit='cover' src={img} alt='Dan Abramov' />

                  <Text fontWeight='bold' >{data[i]?.type}</Text>
                  <Text fontSize='sm' >{data[i]?.count} Properties</Text>

                </Flex>
              )
            })
          }

          {/* <Flex p={5} position='relative' direction='column' alignItems='center'>
            <Image h={260} w={180} objectFit='cover' src='https://images.pexels.com/photos/4134642/pexels-photo-4134642.jpeg?auto=compress&cs=tinysrgb&w=600' alt='Dan Abramov' />
      
            <Heading fontWeight='bold' >Mysore</Heading>
              <Text fontSize='sm' >Software Properties</Text>
         
          </Flex>
          <Flex p={5} position='relative' direction='column' alignItems='center'>
            <Image h={260} w={180} objectFit='cover' src='https://images.pexels.com/photos/14449828/pexels-photo-14449828.jpeg?auto=compress&cs=tinysrgb&w=600' alt='Dan Abramov' />
       
            <Heading fontWeight='bold' >Kolkata</Heading>
              <Text fontSize='sm' >Software Properties</Text>
 
          </Flex>

          <Flex p={5} position='relative' direction='column' alignItems='center'>
            <Image h={260} w={180} objectFit='cover' src='https://images.pexels.com/photos/14449828/pexels-photo-14449828.jpeg?auto=compress&cs=tinysrgb&w=600' alt='Dan Abramov' />
       
            <Heading fontWeight='bold' >Kolkata</Heading>
              <Text fontSize='sm' >Software Properties</Text>
 
          </Flex>

          <Flex p={5} position='relative' direction='column' alignItems='center'>
            <Image h={260} w={180} objectFit='cover' src='https://images.pexels.com/photos/14449828/pexels-photo-14449828.jpeg?auto=compress&cs=tinysrgb&w=600' alt='Dan Abramov' />
       
            <Heading fontWeight='bold' >Kolkata</Heading>
              <Text fontSize='sm' >Software Properties</Text>
 
          </Flex> */}
        </Stack>

      </Container>

    </>
  )
}

export default Explore;