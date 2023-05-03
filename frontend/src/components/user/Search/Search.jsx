import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

const  SearchItem=({data}) =>{
  // console.log('data props',data)

  const navigate = useNavigate();

  const color1=useColorModeValue('white', 'gray.900');
  const color2=useColorModeValue('white', 'gray.900');
  const color3=useColorModeValue('gray.700', 'gray.400');
  const color4 =useColorModeValue('gray.50', 'gray.800');


  return (
   <>
   {
    data&&data.map((item,i)=>{
      return (
        <Center py={6} key={i}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '100%', md: '540px' }}
          height={{ sm: '476px', md: '20rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={color1}
          boxShadow={'2xl'}
          padding={4}>
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={item.photos[0].image_url}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {item.name}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
              {item.type}
            </Text>
            <Text
              textAlign={'center'}
              color={color2}
              px={3}>
              {item.title}
            <Text fontWeight={600} color={'orange.500'} size="sm" mb={4}>
              {item.city}
            </Text>
            </Text>
            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={color4}
                fontWeight={'400'}>
                Rates starting from ₹{item.cheapestPrice}
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={color4}
                fontWeight={'400'}>
                9.5
              </Badge>
            </Stack>
  
            <Stack
              width={'100%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}>
            
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                onClick={() => navigate('/hotel',{state:{data:item._id}})}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                See  Availability
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
      )
    })
   }
   </>
  );
}

export default SearchItem;