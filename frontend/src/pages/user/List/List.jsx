import React from 'react'
import { Flex } from '@chakra-ui/react'
import NavBar from '../../../components/user/NavBar/NavBar'
import { Heading } from '@chakra-ui/react'
import SearchBox from '../../../components/user/Search/SearchBar'
import SearchItem from '../../../components/user/Search/Search'
import Footer from '../../../components/user/Footer/Footer'

const List = () => {
  return (
   <>
    <NavBar/>
    <Flex mt="20px">
      <Flex flex="1" position="sticky" top="80px" p={5}>
        <SearchBox/>
      </Flex>
      <Flex flex="2" ml="20px" flexWrap="wrap" justifyContent="flex-start">
        <SearchItem/>
        <SearchItem/>
        <SearchItem/>
        <SearchItem/>
        <SearchItem/>
        <SearchItem/>
      </Flex>
    </Flex>
    <Footer/>
   </>
  )
}

export default List
