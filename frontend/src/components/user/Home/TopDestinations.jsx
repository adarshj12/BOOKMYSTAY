import { HStack, Image, Box, Heading, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const TopDestinations = () => {
  return (

    <>
      <Heading>Top Destinations</Heading>
      <Flex padding={5} justifyContent="space-between" gap={20} zIndex={1}>
      <Box pos="relative" color="white" borderRadius={10} overflow="hidden" h={250} flex={1}>
        <Image
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          objectFit="cover"
          className="featuredImg"
        />
        <Box pos="absolute" bottom={20} left={20}>
          <Heading as="h1" fontSize="3xl">Dublin</Heading>
          <Text fontSize="lg">123 properties</Text>
        </Box>
      </Box>

      <Box pos="relative" color="white" borderRadius={10} overflow="hidden" h={250} flex={1}>
        <Image
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          objectFit="cover"
          className="featuredImg"
        />
        <Box pos="absolute" bottom={20} left={20}>
          <Heading as="h1" fontSize="3xl">Reno</Heading>
          <Text fontSize="lg">533 properties</Text>
        </Box>
      </Box>

      <Box pos="relative" color="white" borderRadius={10} overflow="hidden" h={250} flex={1}>
        <Image
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          objectFit="cover"
          className="featuredImg"
        />
        <Box pos="absolute" bottom={20} left={20}>
          <Heading as="h1" fontSize="3xl">Austin</Heading>
          <Text fontSize="lg">532 properties</Text>
        </Box>
      </Box>
    </Flex>
    </>
  )
}

export default TopDestinations;
