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
  TextField,
  Typography,
  Box,
  Autocomplete
} from "@mui/material";

import {
  History as HistoryIcon,
  Search as SearchIcon
} from "@mui/icons-material";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function TransactionHistory() {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [history, setHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadItems = async () => {
    try {
      // Fetch all items (including inactive items, as they might have history)
      const res = await api.get("/items?includeInactive=true");
      setItems(res.data.data);
    } catch (err) {
      console.error("Unable to load items:", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Asynchronous side-effect handles fetching history, decoupled from Select onClick / onChange events
  useEffect(() => {
    if (!selectedItemId) return;

    let isMounted = true;
    const fetchHistory = async () => {
      setLoaded(false);
      try {
        const res = await api.get(`/transactions/${selectedItemId}`);
        if (isMounted) {
          setHistory(res.data.data);
          setLoaded(true);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        if (isMounted) {
          setHistory([]);
          setLoaded(true);
        }
      }
    };

    fetchHistory();
    return () => {
      isMounted = false;
    };
  }, [selectedItemId]);

  const chipStyles = (type) => {
    if (type === "RECEIVED") {
      return {
        label: "Received",
        color: "success",
        bgcolor: "rgba(16, 185, 129, 0.08)",
        textColor: "#10b981"
      };
    }
    if (type === "ISSUED") {
      return {
        label: "Issued",
        color: "error",
        bgcolor: "rgba(239, 68, 68, 0.08)",
        textColor: "#ef4444"
      };
    }
    return {
      label: type,
      color: "default",
      bgcolor: "rgba(100, 116, 139, 0.08)",
      textColor: "#64748b"
    };
  };

  const formatDate = (value) => {
    return new Date(value).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const selectedItem = items.find((item) => item.item_id === selectedItemId);

  return (
    <DashboardLayout>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800" sx={{ fontFamily: "Outfit", mb: 0.5 }}>
          Transaction History
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight="500">
          Search and view all incoming and outgoing transaction logs for any inventory item.
        </Typography>
      </Box>

      {/* Item Selection Panel */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper"
        }}
      >
        <Typography variant="subtitle2" fontWeight="700" color="text.primary" sx={{ mb: 1.5, fontFamily: "Outfit" }}>
          Select Item to View Log
        </Typography>
        
        {/* Autocomplete is much more stable, has built-in search, and prevents UI lags with large item lists */}
        <Autocomplete
          options={items}
          getOptionLabel={(option) => `${option.item_name} (${option.unit})`}
          value={selectedItem || null}
          onChange={(event, newValue) => {
            const nextId = newValue ? newValue.item_id : "";
            setSelectedItemId(nextId);
            if (!nextId) {
              setHistory([]);
              setLoaded(false);
            }
          }}
          isOptionEqualToValue={(option, value) => option.item_id === value.item_id}
          renderInput={(params) => {
            try {
              if (params.slotProps?.input) {
                return (
                  <TextField
                    {...params}
                    placeholder="Search or select an item..."
                    slotProps={{
                      ...params.slotProps,
                      input: {
                        ...params.slotProps.input,
                        startAdornment: (
                          <>
                            <SearchIcon color="action" fontSize="small" sx={{ mr: 1, ml: 0.5 }} />
                            {params.slotProps.input.startAdornment}
                          </>
                        )
                      }
                    }}
                  />
                );
              }
              const inputProps = params.InputProps || {};
              return (
                <TextField
                  {...params}
                  placeholder="Search or select an item..."
                  InputProps={{
                    ...inputProps,
                    startAdornment: (
                      <>
                        <SearchIcon color="action" fontSize="small" sx={{ mr: 1, ml: 0.5 }} />
                        {inputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              );
            } catch (err) {
              console.error("Autocomplete renderInput error: ", err);
              return (
                <TextField
                  {...params}
                  placeholder="Search or select an item..."
                />
              );
            }
          }}
          sx={{ maxWidth: 450, width: "100%" }}
        />
      </Paper>

      {/* History Output */}
      {selectedItemId && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <HistoryIcon color="primary" />
            <Typography variant="h6" fontWeight="700" sx={{ fontFamily: "Outfit" }}>
              Ledger for: {selectedItem ? selectedItem.item_name : ""}
            </Typography>
          </Box>

          {!loaded ? (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography color="text.secondary" variant="body2" fontWeight="500">
                Loading ledger entries...
              </Typography>
            </Box>
          ) : history.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <Typography color="text.secondary" variant="body2" fontWeight="500">
                No transaction logs found for this item.
              </Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
              <Table>
                <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Date & Time</TableCell>
                    <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Reference Source/Dest</TableCell>
                    <TableCell sx={{ fontWeight: "700", color: "#475569" }} align="right">Quantity</TableCell>
                    <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((txn) => {
                    const style = chipStyles(txn.transaction_type);
                    return (
                      <TableRow key={txn.transaction_id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
                          {formatDate(txn.transaction_date)}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={style.label}
                            size="small"
                            sx={{
                              bgcolor: style.bgcolor,
                              color: style.textColor,
                              fontWeight: "700",
                              fontSize: "0.75rem",
                              borderRadius: 1.5
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "600", color: "text.primary" }}>
                          {txn.reference || "—"}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "700", color: txn.transaction_type === "RECEIVED" ? "success.main" : "error.main" }}>
                          {txn.transaction_type === "RECEIVED" ? "+" : "-"}{txn.quantity}
                        </TableCell>
                        <TableCell color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                          {txn.remarks || "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </DashboardLayout>
  );
}

export default TransactionHistory;