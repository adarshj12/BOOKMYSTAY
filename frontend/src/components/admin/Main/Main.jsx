import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table,Text, Thead, Tbody, Tr, Th, Td,Spacer,Center, VStack ,HStack} from '@chakra-ui/react';
import { FaRupeeSign,FaUsers } from 'react-icons/fa'; 
import { TbBuildingBank} from 'react-icons/tb'; 
import Piechart from './Piechart'
import LineGraph from './LineGraph';
import { DASHBOARD } from '../../../utils/API';
import axios from '../../../utils/axios'
import { Toaster, toast } from 'react-hot-toast';

const Main = () => {

  const [payment,setPayment] = useState([]);
  const [revenue,setRevenue] = useState([]);
  const [users,setusers] = useState(0)
  const [properties,setproperties] = useState(0)
  const [total,settotal] = useState(0)
  const token = localStorage.getItem('adminToken');
  const dashboardData =async()=>{
    await axios.get(DASHBOARD, { headers: { 'Authorization': `Bearer ${token}` } }).then(res=>{
      setPayment(res.data.payment);
      setRevenue(res.data.revenue);
      setusers(res.data.users)
      setproperties(res.data.properties)
      settotal(res.data.total[0].totalRate)
    }).catch(err=>{
      toast.error(err.message)
    })
  }

  useEffect(()=>{
    dashboardData()
  },[])
  return (
    <>
      <>
        <Box p={4}>
          <Flex>
            <Box ml={4} flex={1}>
              <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
               
                <Flex>
                  <Box w='250px' h={100} boxShadow="md">
                    <Center>
                      <VStack>
                    <Text fontWeight={'extrabold'}>Total Users</Text>
                    <HStack>
                      <FaUsers fontSize={40}/>
                      <Heading fontStyle={'italic'}>{users}</Heading>
                      </HStack> 
                      </VStack>
                   
                    </Center>
                  </Box>
                  <Spacer />
                  <Box w='250px' h={100} boxShadow="md">
                  <Center>
                      <VStack>
                    <Text fontWeight={'extrabold'}>Total Properties</Text>
                    <HStack>
                      <TbBuildingBank fontSize={40}/>
                      <Heading fontStyle={'italic'}>{properties}</Heading>
                      </HStack> 
                      </VStack>
                   
                    </Center>
                  </Box>
                  <Spacer />
                  <Box w='250px' h={100} boxShadow="md">
                  <Center>
                      <VStack>
                    <Text fontWeight={'extrabold'}>Total Revenue</Text>
                     <HStack>
                      <FaRupeeSign fontSize={40}/>
                      <Heading fontStyle={'italic'}>{total*0.2}</Heading>
                      </HStack> 
                      </VStack>
                   
                    </Center>          
                  </Box>

                </Flex>

                <Flex mt={50}>
                  <Box w='500px' h={250} boxShadow="md">
                    <Center>
                      <VStack>

                    <Text fontWeight={'extrabold'}>Payment Mode</Text>
                     <Piechart payment={payment}/>
                      </VStack>
                   
                    </Center>
                  </Box>
                  <Spacer />
                  <Box w='500px' h={250} boxShadow="md">
                  <Center>
                     <LineGraph revenue={revenue}/>
                   
                    </Center>
                  </Box>

                </Flex>
              </Box>
            </Box>
          </Flex>
          <Toaster/>
        </Box>
      </>
    </>
  )
}

export default Main
