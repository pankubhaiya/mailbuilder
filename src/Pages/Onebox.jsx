import React, {useState, useEffect} from 'react';
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from '../Components/Sidebar';
import { OneboxNavbar } from '../Components/OneboxNavbar';
import { Content } from '../Components/Content';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEmailContext } from '../Components/ContestApi';
import { Navigate, useNavigate } from 'react-router-dom/dist';

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoic2hhaGFuZXByaXlhbmthczAxQGdtYWlsLmNvbSIsImlkIjo5LCJmaXJzdE5hbWUiOiJQcml5YW5rYSIsImxhc3ROYW1lIjoiU2hhaGFuZSJ9LCJpYXQiOjE3MTEzODYwMzUsImV4cCI6MTc0MjkyMjAzNX0.aawIHorCsYmq5bCQViAo7oEmEvwBHl_LhBq-Hh3sYGc`

const resetList = async(token) =>{
    try{
      const res = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/reset`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
      })

      // console.log(res);
      return res;
    }catch(err){
      console.log("Error fetching data:" , err);
    }
}

const fetchData = async (token) => {
     
  try {
    const res = await axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
    });
    // console.log(response.data);
    return res;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



export const Onebox = ()=> {
  const {loading, setLoading,  } = useEmailContext();
  const [data, setData] = useState(null);
  const [contentName, setContentName] = useState('Home');
  const location = useLocation();
  const [token, setToken] = useState("");
  const navigat = useNavigate()
  useEffect(() => {
    // Parse the URL to extract the token
    setToken(localStorage.getItem("token"))
    if(localStorage.getItem("token")){

      fetchData()
    }else{
      navigat("/")
    }
  }, []); 
//  const Navigate = useNavigate()


  useEffect(()=>{
    // reset data
    
    if(token){

      fetchData(token).then(res=>{
        setData(res.data.data);
        console.log(res.data);
      }).catch(err=>{
        console.log(err);
      });
    }

  },[token]);

  return (
    <Box>
      <Flex>
        {/* sidebar  */}
        <Sidebar contentName={contentName} setContentName={setContentName} />
        <Box w="96%">
            <OneboxNavbar />
            <Content contentName={contentName}  data={data} />
        </Box>
      </Flex>
    </Box>
  )
}

