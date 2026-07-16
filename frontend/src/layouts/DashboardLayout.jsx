import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  CallReceived as CallReceivedIcon,
  CallMade as CallMadeIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon,
  ExitToApp as ExitToAppIcon,
  VolunteerActivism as VolunteerActivismIcon
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve current user info
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    full_name: "NGO Staff",
    role: "staff",
    email: "staff@carestock.com"
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Inventory", path: "/inventory", icon: <InventoryIcon /> },
    { text: "Receive Stock", path: "/receive-stock", icon: <CallReceivedIcon /> },
    { text: "Issue Stock", path: "/issue-stock", icon: <CallMadeIcon /> },
    { text: "Forecast", path: "/forecast", icon: <TrendingUpIcon /> },
    { text: "Transaction History", path: "/transaction-history", icon: <HistoryIcon /> },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="700" color="text.primary" sx={{ fontFamily: "Outfit" }}>
            {menuItems.find((item) => item.path === location.pathname)?.text || "CareStock"}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle2" fontWeight="600" color="text.primary">
                {storedUser.full_name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                {storedUser.role}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, fontSize: "0.875rem", fontWeight: "600" }}>
              {getInitials(storedUser.full_name)}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#0f172a", // Sleek dark slate
            color: "#94a3b8",
            borderRight: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }
        }}
      >
        <Box>
          {/* Logo Header */}
          <Toolbar sx={{ gap: 1.5, px: 2.5, bgcolor: "#0b0f19" }}>
            <VolunteerActivismIcon sx={{ color: "primary.light", fontSize: 28 }} />
            <Typography
              variant="h5"
              fontWeight="800"
              color="#ffffff"
              sx={{ fontFamily: "Outfit", letterSpacing: 0.5 }}
            >
              CareStock
            </Typography>
          </Toolbar>

          <Divider sx={{ borderColor: "#1e293b" }} />

          {/* Navigation Links */}
          <List sx={{ px: 1.5, py: 2, gap: 0.5, display: "flex", flexDirection: "column" }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      py: 1.25,
                      px: 2,
                      transition: "all 0.2s",
                      bgcolor: isActive ? "rgba(13, 148, 136, 0.15)" : "transparent",
                      color: isActive ? "#ffffff" : "#94a3b8",
                      "& .MuiListItemIcon-root": {
                        color: isActive ? "primary.light" : "#64748b",
                        minWidth: 40,
                      },
                      "&:hover": {
                        bgcolor: isActive ? "rgba(13, 148, 136, 0.2)" : "rgba(255, 255, 255, 0.04)",
                        color: "#ffffff",
                        "& .MuiListItemIcon-root": {
                          color: isActive ? "primary.light" : "#94a3b8",
                        }
                      }
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                        fontWeight: isActive ? "600" : "500",
                        fontFamily: "Outfit"
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* User Info / Logout Footer */}
        <Box sx={{ p: 2, bgcolor: "#0b0f19" }}>
          <Divider sx={{ borderColor: "#1e293b", mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ bgcolor: "#1e293b", color: "#ffffff", width: 36, height: 36, fontSize: "0.875rem", fontWeight: "600", border: "1px solid", borderColor: "#334155" }}>
                {getInitials(storedUser.full_name)}
              </Avatar>
              <Box sx={{ maxWidth: 140 }}>
                <Typography variant="body2" fontWeight="600" color="#ffffff" noWrap>
                  {storedUser.full_name}
                </Typography>
                <Typography variant="caption" color="#64748b" noWrap display="block" sx={{ textTransform: "capitalize" }}>
                  {storedUser.role} Account
                </Typography>
              </Box>
            </Box>
            <Tooltip title="Log out" placement="top">
              <IconButton onClick={handleLogout} sx={{ color: "#ef4444", "&:hover": { bgcolor: "rgba(239, 68, 68, 0.08)" } }}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4, lg: 5 },
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, width: "100%", maxWidth: 1800, mx: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;