import { Box, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SearchItem=()=> {
  const navigate = useNavigate()
    return (
      <Box border="1px solid lightgray" p={10} borderRadius={5} display="flex" justifyContent="space-between" mb={20}>
        <Image src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1" alt="" w={200} h={200} objectFit="cover" />
        <Box display="flex" flexDirection="column" gap={10} flex={2}>
          <Text fontSize={20} color="#0071c2" fontWeight="bold">Tower Street Apartments</Text>
          <Text fontSize={12}>500m from center</Text>
          <Text fontSize={12} bgColor="#008009" color="white" width="max-content" px={3} borderRadius={5}>Free airport taxi</Text>
          <Text fontSize={12} fontWeight="bold">Studio Apartment with Air conditioning</Text>
          <Text fontSize={12}>Entire studio • 1 bathroom • 21m² 1 full bed</Text>
          <Text fontSize={12} color="#008009" fontWeight="bold">Free cancellation </Text>
          <Text fontSize={12} color="#008009">You can cancel later, so lock in this great price today!</Text>
        </Box>
        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight={500}>Excellent</Text>
            <Button bgColor="#003580" color="white" fontWeight="bold" borderRadius={0}>8.9</Button>
          </Box>
          <Box textAlign="right" display="flex" flexDirection="column" gap={5}>
            <Text fontSize={24}>$112</Text>
            <Text fontSize={12} color="gray">Includes taxes and fees</Text>
            <Button onClick={()=>navigate('/hotel')} bgColor="#0071c2" color="white" fontWeight="bold" px={5} borderRadius={5}>See availability</Button>
          </Box>
        </Box>
      </Box>
    );
  }

  export default SearchItem;