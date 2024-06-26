import { Box, Flex, Stack, Select, Text, Input, InputGroup, InputLeftElement, Button, useColorMode } from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEmailContext } from "./ContestApi";


export const getDate = (data)=>{
    let date = new Date(data);
    let temp = date.toDateString().split(' ');
    return `${temp[1]} ${temp[2]}`;
}

export const Inbox = ({emails}) =>{
    const { colorMode, toggleColorMode } = useColorMode();
    const {loading, setLoading,  } = useEmailContext();
    const navigate = useNavigate();

    const handleClick = (threadId) =>{
        navigate(`/onebox/${threadId}`)
    }
    useEffect(() => {
        handleClick(emails[0]?.threadId)
      }, []);
    const fetchRefreshApi = () => {
        // Make the GET request
        console.log("refresh");
        fetch("https://hiring.reachinbox.xyz/api/v1/onebox/reset", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            // Check if response is ok
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // Parse response JSON
            return response.json();
          })
          .then((data) => {
         
            toast.success("Refresh Data successfully.");
            window.location.reload();
            //   Navigate("/home");
          })
          .catch((error) => {
      
            toast.success("Refresh Data Again.");
            console.log(error.message);
          });
      };
     
      // Define your click handler function
      const handleresetClick = () => {
        // Place the logic you want to execute when the button is clicked here
        console.log("Button clicked!");
        // Call your fetch function here if needed
        fetchRefreshApi();
      };

    return (
        <Box
        w="20%"
        // borderLeft="1px"
        borderRight="1px"
        // borderColor="#33383F"
        borderColor={(colorMode=='light')? "#D8D8D8":"#343A40"}
        minHeight="115vh" 
        bgColor={colorMode=="light" ? "white" :"black"}
        textAlign="center"
        padding="12px"
        >
            {/* top section */}
            <Flex
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            padding="7px"
            textAlign="left"
            
            >
                <Stack 
                padding="2px 7px"
                fontFamily="Open Sans"
                fontWeight="700"
                >
                    <Select 
                    border="none"
                    variant="unstyled"
                    color="#4285F4" 
                    fontSize="20px"
                    >
                        <option value="all_inbox">All Inbox(s)</option>
                    </Select>
                    <Text 
                    color="#7F7F7F"
                    fontFamily="Open Sans"
                    fontWeight="400"
                    fontSize="14px"
                    >
                        <span
                        style={{color:(colorMode=="light")?"#343A40":"white", 
                        fontWeight:"700"}} 
                        
                        >25/25</span> Inboxes selected
                    </Text>
                </Stack>

                <Box
                w="32px"
                h="32px"
                borderRadius="4px"
                padding="8px"
                border="1px" 
                bgColor={colorMode=="light" ? "white":"#25262B"}
                borderColor={(colorMode=='light') ? "#DFE3E8" : "#25262B"}
                // color={colorMode=="light" ? "white": "gray"}
                >
                    <MdRefresh onClick={handleresetClick} />
                </Box>
            </Flex>

            {/* mid section */}
            <Stack>
                <Box padding="4px 6px">
                    <InputGroup
                    borderRadius="4px"
                    >
                        <InputLeftElement pointerEvents='none'>
                        <CiSearch  color='gray' /> 
                        </InputLeftElement>
                        <Input 
                        backgroundColor={colorMode=="light" ? "white":"#23272C"} 
                        type='text' 
                        placeholder='Search' />
                    </InputGroup>
                </Box>
                
                <Flex
                padding="3px 8px"
                justifyContent="space-between"
                alignItems="center"
                fontFamily="Inter"
                fontWeight="600"
                >
                    <Flex 
                    w="50%"
                    alignItems="center"
                    gap="10px"
                    
                    >
                        <Text
                        padding="3px 8px"
                        bgColor={colorMode=="light" ? "white":"#222426"}
                        borderRadius="17px" 
                        color="#5C7CFA"
                        >26</Text>
                        <Text
                        fontSize="14px"
                        color={colorMode=="light" ? "#172B4D":"#E6E6E6"}
                        >New Replies</Text>
                    </Flex>
                    
                    <Select 
                    w="40%"
                    fontFamily="Inter"
                    fontWeight="600"
                    fontSize="14px"
                    color={colorMode=="light" ? "#172B4D":"#E6E6E6"}
                    variant="unstyled"
                    >
                        <option value="newest">Newest</option>
                    </Select>
                </Flex>

                {/* Bottom section */}
                <Box 
                borderTop="1px"
                // borderColor="#33383F"
                borderColor={(colorMode=='light')? "#D8D8D8":"#343A40"}
                // padding="0px 9px"
                >
                    {
                        // add all inboxes here
                        emails && emails.map((item, i) => (
                         
                            <Box
                            // borderTop="1px"
                            borderBottom="1px"
                            // borderColor="#33383F"
                            borderColor={(colorMode=='light')? "#D8D8D8":"#343A40"}
                            key={i}
                            display="flex"
                            flexDirection="column"
                            gap="8px"
                            padding="12px 8px"
                            cursor='pointer'
                            onClick={()=>handleClick(item.threadId)}
                            >   
                                <Stack
                                textAlign="left"
                                spacing="2px"
                                >
                                    <Flex
                                    justifyContent="space-between"
                                    fontFamily="Inter"
                                    >
                                        <Text 
                                        color={colorMode=="light" ? "#343A40":"white"}
                                        fontSize="14px"
                                        fontWeight="500">{item.fromEmail}</Text>
                                        <Text
                                        fontFamily="Inter"
                                        fontWeight="400"
                                        fontSize="12px"
                                        color={colorMode=='light' ? "#919EAB" : "gray"}
                                        >{getDate(item.sentAt)}</Text>
                                    </Flex>
                                    <Text
                                    w="60%"
                                    fontWeight="400"
                                    fontSize="12px"
                                    color={colorMode=="light" ? "#172B4D":"#E1E0E0"} 
                                    noOfLines={1}>{item.subject}</Text>  
                                </Stack>
                                
                                <Flex
                                gap="8px">
                                    <Button 
                                    height="20px"
                                    padding="3px 8px"
                                    borderRadius="17px"
                                    fontFamily="Open Sans"
                                    fontWeight="600"
                                    color="#57E0A6"
                                    bgColor={colorMode=='light' ? "#F0F0F0" : "#222426"}
                                    fontSize="10px"
                                    >
                                        Interested
                                    </Button>
                                    <Button
                                    height="20px"
                                    padding="3px 8px"
                                    borderRadius="17px"
                                    fontSize="10px"
                                    fontFamily="Open Sans"
                                    fontWeight="600"
                                    color={colorMode=='light' ?"#637381":"#FFFFFF"}
                                    bgColor={colorMode=='light' ? "#F0F0F0" : "#222426"}
                                    
                                    >
                                        Campaign Name
                                    </Button>
                                </Flex>
                            </Box>
                        ))
                    }
                </Box>
            </Stack>
        </Box>
    )
}