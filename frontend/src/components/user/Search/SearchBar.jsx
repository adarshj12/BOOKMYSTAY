import React from "react";
import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

const SearchBox = ({ destination, options }) => {
    const { isOpen, onToggle } = useDisclosure();
    const [date, setDate] = React.useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    return (
        <Flex justify="center" mt="20px">
            <Box w="100%" maxW="1024px" display="flex" gap="20px">
                <Box
                    flex="1"
                    bgColor="#febb02"
                    p="10px"
                    borderRadius="10px"
                    position="sticky"
                    top="10px"
                    height="max-content"
                >
                    <Text fontSize="20px" color="#555" mb="10px">
                        Search
                    </Text>
                    <Box mb="10px">
                        <Text fontSize="12px" mb="5px">
                            Destination
                        </Text>
                        <Input placeholder={destination} />
                    </Box>
                    <Box mb="10px">
                        <Text fontSize="12px" mb="5px">
                            Check-in-Date
                        </Text>
                        <Box onClick={onToggle} cursor="pointer">
                            <Text height="30px" p="5px" bgColor="white" display="flex" alignItems="center">
                                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
                            </Text>
                        </Box>
                        {isOpen && (
                            <DateRange
                                onChange={(item) => setDate([item.selection])}
                                minDate={new Date()}
                                ranges={date}
                                className="datePicker"
                            />
                        )}
                    </Box>
                    <Box mb="10px">
                        <Text fontSize="12px" mb="5px">
                            Options
                        </Text>
                        <Box p="10px" bgColor="#f5f5f5">
                            <Box mb="10px">
                                <Flex justifyContent="space-between" color="#555" fontSize="12px">
                                    <Text>Min price</Text>
                                    <InputGroup width="50%">
                                        <InputLeftAddon children="$" />
                                        <NumberInput defaultValue={0} min={0} max={10000}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </Flex>
                            </Box>
                            <Box mb="10px">
                                <Flex justifyContent="space-between" color="#555" fontSize="12px">
                                    <Text>Max price</Text>
                                    <InputGroup width="50%">
                                        <InputLeftAddon children="$" />
                                        <NumberInput defaultValue={10000} min={0} >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </Flex>
                            </Box>
                            <Box mb="10px">
                                <Flex justifyContent="space-between" color="#555" fontSize="12px">
                                    <Text>Adult</Text>
                                    <InputGroup width="50%">
                                        <InputLeftAddon children="$" />
                                        <NumberInput defaultValue={1} min={1} >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </Flex>
                            </Box>
                            <Box mb="10px">
                                <Flex justifyContent="space-between" color="#555" fontSize="12px">
                                    <Text>Children</Text>
                                    <InputGroup width="50%">
                                        <InputLeftAddon children="$" />
                                        <NumberInput defaultValue={0} min={0} >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </Flex>
                            </Box>
                            <Box mb="10px">
                                <Flex justifyContent="space-between" color="#555" fontSize="12px">
                                    <Text>Room</Text>
                                    <InputGroup width="50%">
                                        <InputLeftAddon children="$" />
                                        <NumberInput defaultValue={0} min={0} >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </InputGroup>
                                </Flex>
                            </Box>

                        </Box>
                        <Box mt={5} mb="10px"  alignItems="center">
                            <Flex justifyContent="space-between" color="#555" fontSize="12px" >
                                <Button>Search</Button>
                            </Flex>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}

export default SearchBox;