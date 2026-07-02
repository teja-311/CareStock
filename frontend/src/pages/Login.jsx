import { useState } from "react";
import api from "../services/api";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await api.post("/auth/login", {
        email,
        password
      });

      console.log(res.data);

      alert("Login Successful");

    } catch (err) {

      alert("Invalid Credentials");

    }

  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            padding: 4,
            borderRadius: 3
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            mb={3}
            fontWeight="bold"
          >
            CareStock
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            LOGIN
          </Button>

        </Paper>
      </Box>
    </Container>
  );

}

export default Login;