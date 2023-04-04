import React from 'react'
import { Box, Collapse, Flex, Icon,  Text, useDisclosure ,Divider,VStack} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel,AccordionIcon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHome, FaUser, FaStore, FaSignOutAlt } from "react-icons/fa";
import {
  MdBook,
  MdPerson,
  MdSupervisorAccount,
} from "react-icons/md";

const Sidebar = () => {
    const { isOpen, onToggle } = useDisclosure();
  return (
    // <Box w="260px" h="100vh" bg="red.200" color="white">
    //   <Flex align="center" justify="space-between" p="4">
    //     <Text fontSize="xl" fontWeight="bold">My App</Text>
    //     <Box cursor="pointer" display={{ base: "block", md: "none" }} onClick={onToggle}>
    //       {isOpen ? <Icon as={FiChevronUp} /> : <Icon as={FiChevronDown} />}
    //     </Box>
    //   </Flex>
    //   <Collapse in={isOpen} animateOpacity>
    //     <Box p="4">
    //       <Link href="#">Dashboard</Link>
    //       <Link href="#">Users</Link>
    //       <Link href="#">Settings</Link>
    //     </Box>
    //   </Collapse>
    // </Box>
    <Box w="250px" h="100vh" bg="blue.500" color={'red.200'}>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>Bookings</AccordionButton>
          <AccordionPanel>Content 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Users</AccordionButton>
          <AccordionPanel><Link to='/admin/viewusers'>View Users</Link></AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Clients</AccordionButton>
          <AccordionPanel>View Clients</AccordionPanel>
        </AccordionItem>
      </Accordion>
    
    </Box>
    // <Box bgColor="gray.800" h="100vh" color="white" pt="8">
    //   <VStack align="stretch" spacing="4">
    //     <Link to="/admin/dashboard">
    //       <Box display="flex" alignItems="center" ml="6">
    //         <Icon as={MdBook} mr="2" />
    //         <Text fontSize="lg">Dashboard</Text>
    //       </Box>
    //     </Link>
    //     <Accordion allowMultiple>
    //       <AccordionItem>
    //         <h2>
    //           <AccordionButton>
    //             <Box flex="1" textAlign="left">
    //               Bookings
    //             </Box>
    //             <AccordionIcon />
    //           </AccordionButton>
    //         </h2>
    //         <AccordionPanel>Content 1</AccordionPanel>
    //       </AccordionItem>

    //       <AccordionItem>
    //         <h2>
    //           <AccordionButton>
    //             <Box flex="1" textAlign="left">
    //               Users
    //             </Box>
    //             <AccordionIcon />
    //           </AccordionButton>
    //         </h2>
    //         <AccordionPanel>
    //           <Link to="/admin/viewusers">View Users</Link>
    //         </AccordionPanel>
    //       </AccordionItem>

    //       <AccordionItem>
    //         <h2>
    //           <AccordionButton>
    //             <Box flex="1" textAlign="left">
    //               Clients
    //             </Box>
    //             <AccordionIcon />
    //           </AccordionButton>
    //         </h2>
    //         <AccordionPanel>View Clients</AccordionPanel>
    //       </AccordionItem>
    //     </Accordion>

    //     <Link to="/admin/clients">
    //       <Box display="flex" alignItems="center" ml="6">
    //         <Icon as={MdSupervisorAccount} mr="2" />
    //         <Text fontSize="lg">Clients</Text>
    //       </Box>
    //     </Link>
    //   </VStack>
    // </Box>
  )
}

export default Sidebar
