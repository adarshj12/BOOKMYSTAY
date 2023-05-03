import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    useDisclosure,
    Center,
    Textarea
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
const BasicUsage = ({ hotel,hotelid,userid }) => {
    const [rating, setRating] = useState(0);
    const [review,setReview] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleStarClick = (index) => {
        setRating(index + 1);
    };
    const handleReviewChange = (e) => {
        setReview(e.target.value);
      };
    const submitReview=async()=>{
        onClose()
        console.log(hotel,hotelid,userid,review,rating)
    }
    return (
        <>
            <Button rounded={'none'} onClick={onOpen}>Review</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight={'bold'} fontStyle={'italic'}>Review {hotel}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Box display="flex" mt="2" alignItems="center">
                                {Array(5)
                                    .fill('')
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            boxSize={6}
                                            color={i < rating ? 'yellow.400' : 'gray.300'}
                                            cursor="pointer"
                                            mr={2}
                                            onClick={() => handleStarClick(i)}
                                        />
                                    ))}
                            </Box>
                        </Center>
                        <Center>
                            <Box display="flex" mt="2" alignItems="center">
                                <Textarea onChange={handleReviewChange}/>
                            </Box>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={submitReview}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default BasicUsage;