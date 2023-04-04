import { Box, Flex, Heading, Text, VStack, HStack } from "@chakra-ui/react";

const ClientDashboard=()=> {
  return (
    <Box p={4}>
      <Flex>
        {/* <Box w="250px" bg="white" p={4} rounded="lg" shadow="md">
          <Heading size="md" mb={2}>
            Manage Users
          </Heading>
          <VStack align="stretch" spacing={2}>
            <Box bg="gray.100" p={2} rounded="md">
              User 1
            </Box>
            <Box bg="gray.100" p={2} rounded="md">
              User 2
            </Box>
            <Box bg="gray.100" p={2} rounded="md">
              User 3
            </Box>
          </VStack>
        </Box> */}
        <Box ml={4} flex={1}>
          <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
            <Heading size="md" mb={2}>
              Recent Bookings
            </Heading>
            <VStack align="stretch" spacing={2}>
              <Box bg="gray.100" p={2} rounded="md">
                User 1 booked hotel
              </Box>
              {/* <Box bg="gray.100" p={2} rounded="md">
                User 2 created a new task
              </Box>
              <Box bg="gray.100" p={2} rounded="md">
                User 3 completed a task
              </Box> */}
            </VStack>
          </Box>
          <Box bg="white" p={4} rounded="lg" shadow="md">
            <Heading size="md" mb={2}>
              Tasks
            </Heading>
            <VStack align="stretch" spacing={2}>
              {/* <HStack justify="space-between" bg="gray.100" p={2} rounded="md">
                <Text>Task 1</Text>
                <Text>Assigned to User 1</Text>
              </HStack>
              <HStack justify="space-between" bg="gray.100" p={2} rounded="md">
                <Text>Task 2</Text>
                <Text>Assigned to User 2</Text>
              </HStack>
              <HStack justify="space-between" bg="gray.100" p={2} rounded="md">
                <Text>Task 3</Text>
                <Text>Assigned to User 3</Text>
              </HStack> */}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default ClientDashboard;
