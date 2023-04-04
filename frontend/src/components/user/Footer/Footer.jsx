import { ReactNode } from 'react';
import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    FormControl,
    FormLabel,
    Input,
    chakra,
    useColorModeValue,
    HStack,
    Button,
} from '@chakra-ui/react';
// import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

// import AppStoreBadge from '@/components/AppStoreBadge';
// import PlayStoreBadge from '@/components/PlayStoreBadge';

const ListHeader = () => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {/* {children} */}
        </Text>
    );
};

const SocialButton = () => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            //   href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            {/* <VisuallyHidden></VisuallyHidden> */}
            {/* {children} */}
        </chakra.button>
    );
};

const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('blue.700', 'gray.900')}
            color={useColorModeValue('whiteAlpha.600', 'gray.200')}
            bottom={0}
        >
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <Link href={'#'}>About Us</Link>
                        <Link href={'#'}>Blog</Link>
                        <Link href={'#'}>Careers</Link>
                        <Link href={'#'}>Contact Us</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <Link href={'#'}>Help Center</Link>
                        <Link href={'#'}>Safety Center</Link>
                        <Link href={'#'}>Community Guidelines</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Legal</ListHeader>
                        <Link href={'#'}>Cookies Policy</Link>
                        <Link href={'#'}>Privacy Policy</Link>
                        <Link href={'#'}>Terms of Service</Link>
                        <Link href={'#'}>Law Enforcement</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Legal</ListHeader>
                        {/* <Link href={'#'}>Cookies Policy</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Law Enforcement</Link> */}

                        <FormControl id="password">
                            <HStack>
                                <Input bg="white" type="text" />
                                <Button color={'green.300'}>Subscribe</Button>
                            </HStack>
                        </FormControl>

                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Install App</ListHeader>
                        {/* <AppStoreBadge />
            <PlayStoreBadge /> */}
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}>
                    <Text>Book My Stay</Text>
                </Container>
            </Box>
        </Box>
    );
}

export default Footer;