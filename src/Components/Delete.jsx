import React from "react";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEmailContext } from "./ContestApi";
// import { useEmailContext } from "./Content.Data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Delete = ({threadId}) => {
    const Navigate = useNavigate()
    const {isToggled, setIsToggled  } = useEmailContext();
//    console.log(hidevalue)
  const deleteBox = () => {
    // close delete box function hare 
    setIsToggled(false)
  };

  const handleDelete = async () => {
    console.log(threadId, localStorage.getItem("token"));
    try {
      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.reload();
      Navigate("/onebox");
      
    } catch (error) {
        toast.success(error.meassage);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <Box
      className={`delete-div`}
      w="500px"
      h="300px"
      p="32px 24px"
      borderRadius="8px 0px 0px 0px"
      bgGradient="linear(to-b, #141517, #232528)"
      border="1px solid"
      borderColor="linear-gradient(to bottom, #484e53, #2f3338)"
      pos="absolute"
      top="200px"
      zIndex="999"
      left="600px"
      backdropFilter="blur(5px)"
      textAlign="center"
    >
      <Text className="heading-div" fontSize="28px" fontWeight="700" color="#ffffff">
        Are you sure?
      </Text>
      <Text className="pera" fontSize="15px" fontWeight="400" color="#e8e8e8" mt="30px">
        Your selected email will be deleted
      </Text>
      <Flex mt="36px" gap="20px" justify="center">
        <Button
          className="cancel"
          borderRadius="4pxx"
          bg="#25262b"
          p="25px"
          color="#ffffff"
          onClick={deleteBox}
        >
          Cancel
        </Button>
        <Button
          className="delete"
          borderRadius="4px"
          bgGradient="linear(to-r, #FA5252, #A91919)"
          color="#ffffff"
          ml="10px"
          p="25px"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default Delete;


