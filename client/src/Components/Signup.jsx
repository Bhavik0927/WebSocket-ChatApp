import React from "react";
import { Box, TextField, Button } from "@mui/material";

const Signup = ({ formData, handleChange, handleSignup }) => {
  return (
    <Box component="form" onSubmit={handleSignup}>
      <TextField
        margin="normal"
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
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
        Signup
      </Button>
    </Box>
  );
};

export default Signup;
