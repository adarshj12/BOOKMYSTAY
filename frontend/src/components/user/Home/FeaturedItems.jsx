import { Flex, Box, Image, Text, Button } from "@chakra-ui/react";

const FeaturedProperties = () => {
  return (
    <Flex  justify="space-between" align="center" mt="20px" ml={8} mb={10}>
      <Box flex="1" mr="20px">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          h="250px"
          w="100%"
          objectFit="cover"
        />
        <Text fontWeight="bold" mt="10px">
          Aparthotel Stare Miasto
        </Text>
        <Text fontWeight="300">Madrid</Text>
        <Text fontWeight="500" mt="10px">
          Starting from $120
        </Text>
        <Flex mt="10px">
          <Button
            bgColor="#003580"
            color="white"
            border="none"
            mr="10px"
            fontWeight="bold"
            _hover={{ bgColor: "#002b5c" }}
          >
            8.9
          </Button>
          <Text fontSize="14px">Excellent</Text>
        </Flex>
      </Box>
      <Box flex="1" mr="20px">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
          alt=""
          h="250px"
          w="100%"
          objectFit="cover"
        />
        <Text fontWeight="bold" mt="10px">
          Comfort Suites Airport
        </Text>
        <Text fontWeight="300">Austin</Text>
        <Text fontWeight="500" mt="10px">
          Starting from $140
        </Text>
        <Flex mt="10px">
          <Button
            bgColor="#003580"
            color="white"
            border="none"
            mr="10px"
            fontWeight="bold"
            _hover={{ bgColor: "#002b5c" }}
          >
            9.3
          </Button>
          <Text fontSize="14px">Exceptional</Text>
        </Flex>
      </Box>
       <Box flex="1" mr="20px">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1"
          alt=""
          h="250px"
          w="100%"
          objectFit="cover"
        />
        <Text fontWeight="bold" mt="10px">
          Comfort Suites Airport
        </Text>
        <Text fontWeight="300">Austin</Text>
        <Text fontWeight="500" mt="10px">
          Starting from $140
        </Text>
        <Flex mt="10px">
          <Button
            bgColor="#003580"
            color="white"
            border="none"
            mr="10px"
            fontWeight="bold"
            _hover={{ bgColor: "#002b5c" }}
          >
            9.3
          </Button>
          <Text fontSize="14px">Exceptional</Text>
        </Flex>
      </Box>
      <Box flex="1" mr="20px">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
          alt=""
          h="250px"
          w="100%"
          objectFit="cover"
        />
        <Text fontWeight="bold" mt="10px">
          Comfort Suites Airport
        </Text>
        <Text fontWeight="300">Austin</Text>
        <Text fontWeight="500" mt="10px">
          Starting from $140
        </Text>
        <Flex mt="10px">
          <Button
            bgColor="#003580"
            color="white"
            border="none"
            mr="10px"
            fontWeight="bold"
            _hover={{ bgColor: "#002b5c" }}
          >
            9.3
          </Button>
          <Text fontSize="14px">Exceptional</Text>
        </Flex>
      </Box>
      </Flex>
  )
}

export default FeaturedProperties;