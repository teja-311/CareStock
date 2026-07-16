import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Typography,
  Box
} from "@mui/material";

import {
  Edit as EditIcon,
  Block as BlockIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from "@mui/icons-material";

function InventoryTable({ items, onEdit, onDeactivate }) {

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const isLowStock = (item) => {
    return Number(item.current_stock) <= Number(item.minimum_stock);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: "#f1f5f9" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Item Name</TableCell>
            <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Category</TableCell>
            <TableCell sx={{ fontWeight: "700", color: "#475569" }} align="right">Current Stock</TableCell>
            <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Unit</TableCell>
            <TableCell sx={{ fontWeight: "700", color: "#475569" }} align="right">Min. Stock</TableCell>
            <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Expiry Date</TableCell>
            <TableCell sx={{ fontWeight: "700", color: "#475569" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "700", color: "#475569" }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                <Typography color="text.secondary" variant="body1">
                  No inventory items found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const low = isLowStock(item);
              return (
                <TableRow key={item.item_id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={{ fontWeight: "600", color: "text.primary" }}>
                    {item.item_name}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.category_name}
                      size="small"
                      sx={{
                        bgcolor: "rgba(99, 102, 241, 0.08)",
                        color: "#6366f1",
                        fontWeight: "600",
                        fontSize: "0.75rem"
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "700", color: low ? "error.main" : "success.main" }}>
                    {item.current_stock}
                  </TableCell>
                  <TableCell color="text.secondary">{item.unit}</TableCell>
                  <TableCell align="right" color="text.secondary">{item.minimum_stock}</TableCell>
                  <TableCell color="text.secondary">{formatDate(item.expiry_date)}</TableCell>
                  <TableCell>
                    {low ? (
                      <Chip
                        icon={<WarningIcon style={{ fontSize: "0.9rem", color: "#ef4444" }} />}
                        label="Low Stock"
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ fontWeight: "600", borderRadius: 1.5 }}
                      />
                    ) : (
                      <Chip
                        icon={<CheckCircleIcon style={{ fontSize: "0.9rem", color: "#10b981" }} />}
                        label="Good"
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ fontWeight: "600", borderRadius: 1.5 }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <Tooltip title="Edit Item Details">
                        <IconButton
                          color="primary"
                          onClick={() => onEdit(item)}
                          size="small"
                          sx={{
                            bgcolor: "rgba(13, 148, 136, 0.08)",
                            "&:hover": { bgcolor: "rgba(13, 148, 136, 0.15)" }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deactivate Item">
                        <IconButton
                          color="error"
                          onClick={() => onDeactivate(item)}
                          size="small"
                          sx={{
                            bgcolor: "rgba(239, 68, 68, 0.08)",
                            "&:hover": { bgcolor: "rgba(239, 68, 68, 0.15)" }
                          }}
                        >
                          <BlockIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InventoryTable;