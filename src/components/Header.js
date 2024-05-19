import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./Header.css";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ children, hasHiddenAuthButtons }) => {
  
 
  
  const history = useHistory();

   const logOut = () => {
     localStorage.clear();
     window.location.reload();
     return history.push("/");
  }

  if (hasHiddenAuthButtons) {
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
       
        {children}

        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
          
        >
          Back to explore
        </Button>
        
        
       
      </Box>

    )

  }
  return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      
      {localStorage.getItem('token')
        ? <>
          <Box className="search, search-desktop">
            {children}
         
        </Box>
          <Stack direction="row" spacing={2}>
            
          <Avatar src="public/avatar.png" alt={localStorage.getItem('username')} />
          <div className="padding">{localStorage.getItem('username')}</div>

          <Button onClick={() => logOut()} variant='text'>LOGOUT</Button>
          </Stack>
            
        </>
        

        :
        <>
          <Box className="search, search-desktop">
            {children}
        
        </Box>
          <Stack direction="row" spacing={1.5} variant='text'>
          <Button variant='text' onClick={() => history.push("/login")}>LOGIN</Button>
          <Button variant='contained' onClick={() => history.push("/register")}>REGISTER</Button>
          </Stack>
            
        </>

      }
   </Box>
  )};

export default Header;
