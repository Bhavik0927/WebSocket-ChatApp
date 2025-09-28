import React from "react";
import { Box, TextField, Button } from "@mui/material";

const Login = ({formData, handleChange, handleLogin}) => {
  
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
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
