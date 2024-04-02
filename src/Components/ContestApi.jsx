// EmailContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailContext = createContext();

export const useEmailContext = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailDetails, setEmailDetails] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [threadid, setthreadid] = useState(null);
  const [fromEmail,setFrom]= useState("")
  const [toEmail,setTo]= useState("")
  const [subject,setSubject]= useState("")
  
  const [token, setToken] = useState("");
  const navigat = useNavigate()
  console.log(name, email);
  // const tokenFromStorage =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiamFpbmtyaXNoYW5rdW1hcjZAZ21haWwuY29tIiwiaWQiOjM3LCJmaXJzdE5hbWUiOiJrcmlzaGFuIGt1bWFyIiwibGFzdE5hbWUiOiJqYWluIn0sImlhdCI6MTcxMTg5MjIzOCwiZXhwIjoxNzQzNDI4MjM4fQ.CRrjJA6x9AaL6kUoV1rVeGUW93x6uNe0SNm4TAUDoOk";

  // useEffect(() => {
  //   // const tokenFromStorage = localStorage.getItem("token");

  //   // If the token exists in local storage, set it in the component's state
  //   if (tokenFromStorage) {
  //     setToken(tokenFromStorage);
  //     navigat("/onebox");
  //   }
  //   else{
  //     navigat("/")
  //   }
  // }, []);
  const urlParams =new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token");

  // Set the token in the component's state
  if (tokenFromUrl) {
    // setToken(tokenFromUrl);
    localStorage.setItem('token', tokenFromUrl);
  }


  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "KeyR") {
        setIsMessageBoxOpen(!isMessageBoxOpen);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "KeyD") {
        setIsToggled(!isToggled); // Toggle the boolean value
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array ensures the effect runs only once
  return (
    <EmailContext.Provider
      value={{
        
        isMessageBoxOpen,
        isToggled,
        threadid,
        loading, setLoading,
        setthreadid,
        setIsToggled,
        setIsMessageBoxOpen,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
