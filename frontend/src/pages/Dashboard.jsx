import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Divider
} from "@mui/material";

import {
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  EventBusy as EventBusyIcon,
  CallReceived as CallReceivedIcon,
  CallMade as CallMadeIcon
} from "@mui/icons-material";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalItems: 0,
    lowStock: 0,
    nearExpiry: 0,
    receivedToday: 0,
    issuedToday: 0
  });

  const [lowStockItems, setLowStockItems] = useState([]);
  const [nearExpiryItems, setNearExpiryItems] = useState([]);

  const loadDashboardData = async () => {
    try {
      const [summaryRes, lowStockRes, nearExpiryRes] = await Promise.all([
        api.get("/dashboard/summary"),
        api.get("/dashboard/low-stock"),
        api.get("/dashboard/near-expiry")
      ]);

      setSummary(summaryRes.data.data);
      setLowStockItems(lowStockRes.data.data);
      setNearExpiryItems(nearExpiryRes.data.data);
    } catch (err) {
      console.error("Dashboard Loading Error:", err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const cardDetails = [
    {
      title: "Total Items",
      value: summary.totalItems,
      icon: <InventoryIcon sx={{ fontSize: 32 }} />,
      color: "#0d9488", // Teal
      bg: "rgba(13, 148, 136, 0.08)"
    },
    {
      title: "Low Stock Alert",
      value: summary.lowStock,
      icon: <WarningIcon sx={{ fontSize: 32 }} />,
      color: summary.lowStock > 0 ? "#ef4444" : "#10b981", // Red if active, else Green
      bg: summary.lowStock > 0 ? "rgba(239, 68, 68, 0.08)" : "rgba(16, 185, 129, 0.08)"
    },
    {
      title: "Near Expiry Items",
      value: summary.nearExpiry,
      icon: <EventBusyIcon sx={{ fontSize: 32 }} />,
      color: summary.nearExpiry > 0 ? "#f59e0b" : "#10b981", // Amber if active, else Green
      bg: summary.nearExpiry > 0 ? "rgba(245, 158, 11, 0.08)" : "rgba(16, 185, 129, 0.08)"
    },
    {
      title: "Received Today",
      value: summary.receivedToday,
      icon: <CallReceivedIcon sx={{ fontSize: 32 }} />,
      color: "#10b981", // Green
      bg: "rgba(16, 185, 129, 0.08)"
    },
    {
      title: "Issued Today",
      value: summary.issuedToday,
      icon: <CallMadeIcon sx={{ fontSize: 32 }} />,
      color: "#6366f1", // Indigo
      bg: "rgba(99, 102, 241, 0.08)"
    }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <DashboardLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="800" sx={{ fontFamily: "Outfit", mb: 1 }}>
            Overview
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Welcome back! Here is a summary of CareStock's inventory metrics.
          </Typography>
        </Box>

        {/* KPI Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)"
            },
            gap: { xs: 2, md: 3 },
            mb: 5
          }}
        >
          {cardDetails.map((card) => (
            <Card
              key={card.title}
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)"
                }
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3.5 }, "&:last-child": { pb: { xs: 2.5, md: 3.5 } } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 56,
                    height: 56,
                    borderRadius: 2.5,
                    color: card.color,
                    bgcolor: card.bg,
                    mb: 2.5
                  }}
                >
                  {card.icon}
                </Box>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="600" sx={{ fontFamily: "Outfit" }}>
                  {card.title}
                </Typography>
                <Typography
                  fontWeight="800"
                  color="text.primary"
                  sx={{ mt: 1, fontFamily: "Outfit", fontSize: { xs: "2rem", md: "2.5rem" }, lineHeight: 1.2 }}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Alerts & Lists Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ alignItems: "stretch" }}>
          {/* Low Stock Items Panel */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                width: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" fontWeight="700" color="text.primary" sx={{ fontFamily: "Outfit" }}>
                  Low Stock Alerts
                </Typography>
                <Chip
                  label={`${lowStockItems.length} items`}
                  color={lowStockItems.length > 0 ? "error" : "success"}
                  size="small"
                  sx={{ fontWeight: "600", fontSize: "0.75rem" }}
                />
              </Box>
              <Divider sx={{ mb: 2 }} />

              {lowStockItems.length === 0 ? (
                <Box sx={{ py: 6, textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography color="text.secondary" variant="body2" fontWeight="500">
                    All items are above their minimum stock levels. 👍
                  </Typography>
                </Box>
              ) : (
                <TableContainer sx={{ maxHeight: 380 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "700" }}>Item</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "700" }}>Current</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "700" }}>Minimum</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lowStockItems.map((item) => (
                        <TableRow key={item.item_id} hover>
                          <TableCell sx={{ fontWeight: "500" }}>{item.item_name}</TableCell>
                          <TableCell align="right" sx={{ color: "error.main", fontWeight: "700" }}>
                            {item.current_stock} {item.unit}
                          </TableCell>
                          <TableCell align="right" sx={{ color: "text.secondary" }}>
                            {item.minimum_stock} {item.unit}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>

          {/* Near Expiry Items Panel */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                width: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" fontWeight="700" color="text.primary" sx={{ fontFamily: "Outfit" }}>
                  Near Expiry Items
                </Typography>
                <Chip
                  label={`${nearExpiryItems.length} items`}
                  color={nearExpiryItems.length > 0 ? "warning" : "success"}
                  size="small"
                  sx={{ fontWeight: "600", fontSize: "0.75rem" }}
                />
              </Box>
              <Divider sx={{ mb: 2 }} />

              {nearExpiryItems.length === 0 ? (
                <Box sx={{ py: 6, textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography color="text.secondary" variant="body2" fontWeight="500">
                    No items are expiring soon. 🧼
                  </Typography>
                </Box>
              ) : (
                <TableContainer sx={{ maxHeight: 380 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "700" }}>Item</TableCell>
                        <TableCell sx={{ fontWeight: "700" }}>Expiry Date</TableCell>
                        <TableCell align="right" sx={{ fontWeight: "700" }}>Stock</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {nearExpiryItems.map((item) => (
                        <TableRow key={item.item_id} hover>
                          <TableCell sx={{ fontWeight: "500" }}>{item.item_name}</TableCell>
                          <TableCell sx={{ color: "warning.dark", fontWeight: "600" }}>
                            {formatDate(item.expiry_date)}
                          </TableCell>
                          <TableCell align="right" sx={{ color: "text.primary" }}>
                            {item.current_stock} {item.unit}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;