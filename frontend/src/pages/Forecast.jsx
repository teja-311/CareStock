import { useEffect, useState } from "react";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Tooltip
} from "@mui/material";

import {
  HelpOutlined as HelpOutlineIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from "@mui/icons-material";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Forecast() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadForecast = async () => {
    setLoading(true);
    try {
      const res = await api.get("/forecast");
      setForecast(res.data.data);
    } catch (err) {
      console.error("Unable to load forecasting data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForecast();
  }, []);

  const statusStyle = (status) => {
    if (status === "Critical") {
      return {
        label: "Critical Supply",
        color: "error",
        bgcolor: "rgba(239, 68, 68, 0.08)",
        textColor: "#ef4444",
        icon: <ErrorIcon style={{ fontSize: "0.9rem", color: "#ef4444" }} />,
        tooltip: "Less than 7 days of estimated supply remaining based on daily consumption patterns."
      };
    }
    if (status === "Restock Soon") {
      return {
        label: "Restock Soon",
        color: "warning",
        bgcolor: "rgba(245, 158, 11, 0.08)",
        textColor: "#f59e0b",
        icon: <WarningIcon style={{ fontSize: "0.9rem", color: "#f59e0b" }} />,
        tooltip: "Less than 30 days of estimated supply remaining. Restocking recommended."
      };
    }
    return {
      label: "Safe Stock",
      color: "success",
      bgcolor: "rgba(16, 185, 129, 0.08)",
      textColor: "#10b981",
      icon: <CheckCircleIcon style={{ fontSize: "0.9rem", color: "#10b981" }} />,
      tooltip: "Over 30 days of estimated supply remaining. Stock levels are healthy."
    };
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800" sx={{ fontFamily: "Outfit", mb: 0.5 }}>
          Demand Forecasting
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight="500">
          Predictive analytics estimating supply longevity based on historical consumption velocity.
        </Typography>
      </Box>

      {/* Forecast Data Table */}
      {loading ? (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography color="text.secondary" variant="body2" fontWeight="500">
            Running predictive analytics on historical ledger...
          </Typography>
        </Box>
      ) : forecast.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
          <Typography color="text.secondary" variant="body2" fontWeight="500">
            No historical consumption data available to generate predictions.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f1f5f9" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Item Name</TableCell>
                <TableCell sx={{ fontWeight: "700", color: "#475569" }} align="right">Current Stock</TableCell>
                <TableCell sx={{ fontWeight: "700", color: "#475569" }} align="right">Avg. Daily Usage</TableCell>
                <TableCell sx={{ fontWeight: "700", color: "#475569" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    Predicted Days Remaining
                    <Tooltip title="Days of supply left based on current stock divided by average daily usage.">
                      <HelpOutlineIcon fontSize="inherit" sx={{ color: "text.secondary", cursor: "help" }} />
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Supply Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forecast.map((item) => {
                const style = statusStyle(item.status);
                const avgUsage = Number(item.average_daily_usage);
                
                return (
                  <TableRow key={item.item_id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    {/* Item Name */}
                    <TableCell sx={{ fontWeight: "600", color: "text.primary" }}>
                      {item.item_name}
                    </TableCell>

                    {/* Current Stock */}
                    <TableCell align="right" sx={{ fontWeight: "600" }}>
                      {item.current_stock} {item.unit}
                    </TableCell>

                    {/* Average Daily Usage */}
                    <TableCell align="right" sx={{ color: "text.secondary" }}>
                      {avgUsage > 0 ? `${avgUsage.toFixed(2)} ${item.unit}/day` : `0.00 ${item.unit}/day`}
                    </TableCell>

                    {/* Days Remaining */}
                    <TableCell sx={{ fontWeight: "700", color: item.status === "Critical" ? "error.main" : "text.primary" }}>
                      {item.predicted_days_remaining === "N/A"
                        ? "N/A (No Usage Recorded)"
                        : item.predicted_days_remaining === 0
                        ? "0 Days (Depleted)"
                        : `${item.predicted_days_remaining} Days`}
                    </TableCell>

                    {/* Supply Status */}
                    <TableCell>
                      <Tooltip title={style.tooltip} placement="left" arrow>
                        <Chip
                          icon={style.icon}
                          label={style.label}
                          size="small"
                          sx={{
                            bgcolor: style.bgcolor,
                            color: style.textColor,
                            fontWeight: "700",
                            fontSize: "0.75rem",
                            borderRadius: 1.5,
                            cursor: "help"
                          }}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
}

export default Forecast;