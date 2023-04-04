import React from 'react'
import ClientNavbar from '../../../components/client/NavBar/NavBar'
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'

const Properties = () => {
  return (
    <>
    <ClientNavbar/>
    <VStack>
        <Box>
           <HStack> <Heading>Hello</Heading></HStack>
        </Box>
        <Box><Text>Goodmorning</Text></Box>
    </VStack>
    </>
  )
}

export default Properties
