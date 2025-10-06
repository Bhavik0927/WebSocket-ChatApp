import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { useState } from "react";
import { Container, Box, Typography, Paper, Tabs, Tab } from "@mui/material";


function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

const HomePage = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Authentication
        </Typography>

        {/* Tabs for Login / Signup */}
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Login/>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Signup/>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default HomePage;
