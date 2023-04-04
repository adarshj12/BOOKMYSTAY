import { Flex } from '@chakra-ui/react'
import React from 'react'
import Main from '../Main/Main'
import Sidebar from '../Sidebar/Sidebar'


const Dashboard = () => {
  return (
    <>
    <Flex>
        <Sidebar/>
        <Main/>
    </Flex>
    </>
  )
}

export default Dashboard
