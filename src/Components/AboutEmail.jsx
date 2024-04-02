import { Box, Flex, Stack, Text, Select, Button, useColorMode } from "@chakra-ui/react";
import { ReplyEmailPopup } from "./ReplyEmailPopup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Delete from "./Delete";
import { useEmailContext } from "./ContestApi";

const user = [{
    "id": 4,
    "fromName": "Shaw Adley",
    "fromEmail": "shaw@getmemeetings.com",
    "toName": "",
    "toEmail": "mitrajit2022@gmail.com",
    "cc": null,
    "bcc": null,
    "threadId": 209,
    "messageId": "<a5dcWbm1ac5e46d38746648c3e2f6d2c@getmemeetings.com>",
    "inReplyTo": "<4a5cWemdbfda475fabaf856ef5e806a7@gmail.com>",
    "references": "<4a5cWemdbfda475fabaf856ef5e806a7@gmail.com>",
    "subject": "Test mail",
    "body": "<p>Hi Mitrajit,</p><p>Just wondering if you&rsquo;re still interested.</p><p>Regards,<br/>Shaw Adley</p><p>6KG634E practicecowboy</p>",
    "isRead": true,
    "folder": "INBOX",
    "uid": 594,
    "sentAt": "2023-11-23T04:08:45.000Z",
    "archivedAt": null,
    "createdAt": "2023-11-23T07:38:46.000Z",
    "updatedAt": "2023-11-23T07:38:46.000Z",
    "deletedAt": null
  }];
  function formatDateString(originalDateString) {
    // Convert string to Date object
    var originalDate = new Date(originalDateString);
    
    // Function to add leading zeros
    function addLeadingZero(num) {
        return (num < 10 ? '0' : '') + num;
    }
    
    // Format the date
    var formattedDate = originalDate.toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    return formattedDate;
}



export const AboutEmail = () =>{
    const { colorMode, toggleColorMode } = useColorMode();
    const { thread_id } = useParams();
    const token = localStorage.getItem('token');
    const {isToggled, setIsToggled  } = useEmailContext();
    const [data, setData] = useState([]);
   
    const getEmailData = async(thread_id, token)=>{
        console.log(thread_id)
        
        try{
            let res = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${thread_id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": 'application/json'
                  },
            });
            if(res){
                // return res;
                setData(res.data.data);
            }
            
        }catch(err){
            console.log('get email data error:', err.message);
        }
      }
    useEffect(()=>{
        if(thread_id){
            // console.log(token, thread_id);
            getEmailData(thread_id)
        }
        
    }, [thread_id])
  
    return (
        <Box textAlign="left"  >
            {/* Header */}
            <Flex 
            borderBottom="1px"
            
            borderColor={(colorMode=='light')? "#D8D8D8":"#343A40"}
            gap="8px"
            padding="20px"
            alignItems="center"
            justifyContent="space-between"
            // border={"1px"}
            
            >
                <Stack
                w="49%"
                spacing="2px"
                
                >
                    
                        <Text
                        fontFamily="Inter"
                        fontWeight="600"
                        fontSize="14px"
                        color={colorMode=="light"?"#343A40":"white"}
                        >{data[0]?.fromName}</Text>
                        <Text
                        fontFamily="Inter"
                        color={colorMode=='light' ? "rgba(52, 58, 64, 0.7)": "#666666"}
                        fontSize="12px"
                        >{data[0]?.fromEmail}</Text>
                    
                </Stack>
                <Flex 
                width="48%"
                gap="14px"
                alignItems="center"
                fontSize="12px"
                fontFamily="Open Sans"
                fontWeight="600"
                justifyContent="end"
                >
                    <Select 
                    w="fit-content"
                    borderRadius="4px"
                    padding="8px"
                    color={colorMode == 'light' ? "#172B4D" : "white"}
                    borderColor={(colorMode=='light')? "#D8D8D8":"#343A40"}
                    bgColor={colorMode=="light"?"white":"#1F1F1F"}
                    fontSize="12px"
                    >
                        <option value="meeting_completed">Meeting Completed</option>
                    </Select>

                    <Select 
                    width="fit-content"
                    borderRadius="4px"
                    padding="8px"
                    color={colorMode == 'light' ? "#172B4D" : "white"}
                    borderColor={(colorMode=='light')? "#D8D8D8":"#343A40"}
                    bgColor={colorMode=="light"?"white":"#1F1F1F"}
                    fontSize="12px"
                    >
                        <option value="move">Move</option>
                    </Select>

                    <Button
                    borderRadius="4px"
                    padding="8px"
                    border="1px"
                    borderColor={(colorMode=='light')? "#D8D8D8":"#343A40"}
                    bgColor={colorMode=="light"?"white":"#1F1F1F"}
                    fontSize="12px"
                    >...</Button>
                </Flex> 
                    
                
            </Flex>

            {/* Content */}

            {
              data?.map((user, i) =>(
                    <Stack
                    key={i}
                    textAlign="left"
                    spacing="18px"
                    margin="40px 21px"
                    padding="12px 16px"
                    borderRadius="4px"
                    border="1px"
                    borderColor={(colorMode=='light')? "#D8D8D8":"#343A40"}
                    bgColor={colorMode=="light"?"white":"#141517"}
                    >
                        <Stack>
                            <Flex justifyContent="space-between">
                                <Text
                                fontFamily="Open Sans"
                                fontWeight="600"
                                fontSize="14px"
                                color={colorMode=='light' ? "black" : "#F8FAFC"}
                                >{user.subject}</Text>
                                <Text
                                fontFamily={"Inter"}
                                fontWeight={"400"}
                                fontSize="14px"
                                color={colorMode=='light' ? "#637381" : "#7F7F7F"}
                                > {formatDateString(user.sentAt)}</Text>
                            </Flex>
                            
                            <Flex gap="5px"
                            fontFamily={"Inter"}
                            fontWeight={"400"}
                            fontSize="14px"
                            color={colorMode=='light' ? "#637381" : "#7F7F7F"}
                            >
                                <Text>from: {user.fromEmail}</Text>
                                {
                                    user.cc && user.cc.map((item, i)=>(
                                        <Text key={i}>cc: {item}</Text>
                                    ))
                                }
                                
                            </Flex>
                            <Text
                            fontFamily={"Inter"}
                            fontWeight={"400"}
                            fontSize="14px"
                            color={colorMode=='light' ? "#637381" : "#7F7F7F"}
                            >to: {user.toEmail}</Text>
                        </Stack>
                        <Box dangerouslySetInnerHTML={{__html:user.body}}
                        paddingLeft="1px"
                        fontFamily={"Open Sans"}
                        fontWeight={"400"}
                        fontSize="14px"
                        color={colorMode=='light' ? "#172B4D" : "#E1E0E0"}
                        ></Box>
                    </Stack>
                ))
            }
        <Box>
            <ReplyEmailPopup threadId={thread_id} token={token} />
        </Box>
        {isToggled ? <Box  >
            <Delete threadId={thread_id} token={token}  />
        </Box>:""}
       
            

        </Box>
    )
}