import React, { useState } from "react";
import {Box, TextField, Button, IconButton, InputAdornment, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData ,[name] : value});
  }

  const handleLogin = async (e) =>{
    e.preventDefault();

    console.log(formData.email);
    console.log(formData.password);


    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      {
        email: formData.email,
        password: formData.password,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log(response);
    toast.success(`Login successfully ${response?.data?.existUser?.name}`)
    navigate("/chats");
  }


  return (
    <Box component="form" onSubmit={handleLogin}>
      <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
      {/* <TextField
        margin="normal"
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      /> */}
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        name="password"
        type={!showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        required
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
