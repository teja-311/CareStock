import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Alert
} from "@mui/material";

import {
  Email as EmailIcon,
  Lock as LockIcon,
  VolunteerActivism as VolunteerActivismIcon
} from "@mui/icons-material";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0d9488 0%, #0f172a 100%)", // Rich gradient
        px: 2
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)",
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Logo & Branding */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              color: "primary.main"
            }}
          >
            <VolunteerActivismIcon sx={{ fontSize: 36 }} />
            <Typography
              variant="h4"
              fontWeight="800"
              sx={{ fontFamily: "Outfit", letterSpacing: 0.5 }}
            >
              CareStock
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={4}
            fontWeight="500"
          >
            NGO Inventory & Stock Forecasting Portal
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. staff@carestock.com"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "700",
                letterSpacing: 0.5,
                background: "linear-gradient(90deg, #0d9488 0%, #14b8a6 100%)",
                "&:hover": {
                  background: "linear-gradient(90deg, #0f766e 0%, #0d9488 100%)",
                }
              }}
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;