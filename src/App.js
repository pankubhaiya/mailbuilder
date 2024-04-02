import './App.css';
import {Login} from './Pages/Login';
import { Box, Button, useColorMode } from "@chakra-ui/react";
import Onebox from './Pages/Onebox';
import { AllRoutes } from './Pages/AllRoutes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { colorMode, toggleColorMode } = useColorMode();


 
  return (
    <div className="App">
     
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
