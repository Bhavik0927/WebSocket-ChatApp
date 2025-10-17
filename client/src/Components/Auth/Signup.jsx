import { useState } from "react";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    const form_Data = new FormData();
    form_Data.append("name", formData.name);
    form_Data.append("email", formData.email);
    form_Data.append("password", formData.password);
    if (formData.picture) {
      form_Data.append("picture", formData.picture);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          picture: formData.picture || "",
        },

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success("Signup successful!");
      console.log("Response:", response.data);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <TextField
        margin="normal"
        fullWidth
        name="picture"
        type="file"
        onChange={handleChange}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Signup"}
      </Button>
    </Box>
  );
};

export default Signup;
