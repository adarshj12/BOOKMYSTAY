import React from 'react'
import Footer from '../../../components/user/Footer/Footer'
import NavBar from '../../../components/user/NavBar/NavBar'
import { Box } from '@chakra-ui/react'
import Header from '../../../components/user/Home/Header'
import TopDestinations from '../../../components/user/Home/TopDestinations'
import Explore from '../../../components/user/Home/Explore'
import FeaturedProperties from '../../../components/user/Home/FeaturedItems'
const Home = () => {
    return (
        <>
            <Box minHeight="100vh" display="flex" flexDirection="column">
                <Box flex="1">
                    <NavBar />
                    <Header/>
                    <TopDestinations/>
                    <Explore/>
                    <FeaturedProperties/>
                </Box>
                <Box as="footer" mt="auto">
                    <Footer />
                </Box>
            </Box>
        </>

    )
}

export default Home