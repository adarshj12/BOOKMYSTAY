import { HStack, Image, Box, Heading, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Explore = () => {
  return (

    <>
      <Heading>Top Destinations</Heading>
      <Flex justify="space-between" align="center" mt="20px" p={5} mb={10}>
      <Box flex="1" borderRadius="10px" overflow="hidden" cursor="pointer">
        <Image
          src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
          alt=""
          h="150px"
          objectFit="cover"
        />
        <Box p="2">
          <Heading fontSize="18px" color="#444">
            Hotels
          </Heading>
          <Text fontSize="14px" fontWeight="300">
            233 hotels
          </Text>
        </Box>
      </Box>
      <Box flex="1" borderRadius="10px" overflow="hidden" cursor="pointer">
        <Image
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
          alt=""
          h="150px"
          objectFit="cover"
        />
        <Box p="2">
          <Heading fontSize="18px" color="#444">
            Apartments
          </Heading>
          <Text fontSize="14px" fontWeight="300">
            2331 hotels
          </Text>
        </Box>
      </Box>
      <Box flex="1" borderRadius="10px" overflow="hidden" cursor="pointer">
        <Image
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
          alt=""
          h="150px"
          objectFit="cover"
        />
        <Box p="2">
          <Heading fontSize="18px" color="#444">
            Resorts
          </Heading>
          <Text fontSize="14px" fontWeight="300">
            2331 hotels
          </Text>
        </Box>
      </Box>
      <Box flex="1" borderRadius="10px" overflow="hidden" cursor="pointer">
        <Image
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
          alt=""
          h="150px"
          objectFit="cover"
        />
        <Box p="2">
          <Heading fontSize="18px" color="#444">
            Villas
          </Heading>
          <Text fontSize="14px" fontWeight="300">
            2331 hotels
          </Text>
        </Box>
      </Box>
      <Box flex="1" borderRadius="10px" overflow="hidden" cursor="pointer">
        <Image
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
          alt=""
          h="150px"
          objectFit="cover"
        />
        <Box p="2">
          <Heading fontSize="18px" color="#444">
            Villas
          </Heading>
          <Text fontSize="14px" fontWeight="300">
            2331 hotels
          </Text>
        </Box>
      </Box>
      </Flex>
    </>
  )
}

export default Explore;
