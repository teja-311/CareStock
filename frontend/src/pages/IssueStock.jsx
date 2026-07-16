import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  Divider,
  Card,
  CardContent
} from "@mui/material";

import {
  CallMade as CallMadeIcon,
  Description as DescriptionIcon,
  Notes as NotesIcon,
  Tag as TagIcon
} from "@mui/icons-material";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

const emptyForm = {
  item_id: "",
  reference: "",
  quantity: "",
  remarks: ""
};

function IssueStock() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);

  // Snackbar Alert State
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const loadItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const triggerAlert = (message, severity = "success") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async () => {
    if (!form.item_id || !form.quantity) {
      triggerAlert("Please select an item and enter a quantity.", "error");
      return;
    }

    if (Number(form.quantity) <= 0) {
      triggerAlert("Quantity must be greater than zero.", "error");
      return;
    }

    const selectedItem = items.find((item) => item.item_id === form.item_id);
    if (selectedItem && Number(selectedItem.current_stock) < Number(form.quantity)) {
      triggerAlert(
        `Insufficient stock! Only ${selectedItem.current_stock} ${selectedItem.unit} available, but you are trying to issue ${form.quantity} ${selectedItem.unit}.`,
        "error"
      );
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    try {
      await api.post("/transactions/issue", {
        item_id: form.item_id,
        reference: form.reference,
        quantity: Number(form.quantity),
        remarks: form.remarks,
        created_by: storedUser.user_id
      });

      triggerAlert("Stock issued successfully.", "success");
      setForm(emptyForm);
      loadItems();
    } catch (err) {
      triggerAlert(
        err.response?.data?.message || "Unable to issue stock.",
        "error"
      );
    }
  };

  const selectedItem = items.find(
    (item) => item.item_id === form.item_id
  );

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800" sx={{ fontFamily: "Outfit", mb: 0.5 }}>
          Issue Stock
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight="500">
          Record outgoing items (distribution, usage, or kitchen consumption) to reduce stock counts.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            maxWidth: 600,
            width: "100%",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* Form Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 2,
                color: "error.main",
                bgcolor: "rgba(239, 68, 68, 0.08)",
              }}
            >
              <CallMadeIcon />
            </Box>
            <Typography variant="h6" fontWeight="700" sx={{ fontFamily: "Outfit" }}>
              Outgoing Stock Details
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Select Item */}
          <TextField
            fullWidth
            select
            margin="normal"
            label="Select Item"
            name="item_id"
            value={form.item_id}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          >
            {items.map((item) => (
              <MenuItem key={item.item_id} value={item.item_id}>
                {item.item_name} ({item.unit})
              </MenuItem>
            ))}
          </TextField>

          {/* Quick Item Info Card */}
          {selectedItem && (
            <Card
              variant="outlined"
              sx={{
                bgcolor: "background.default",
                borderStyle: "dashed",
                mt: 1.5,
                mb: 2,
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Typography variant="body2" color="text.secondary" fontWeight="500">
                  Available Inventory Stock Level:
                </Typography>
                <Typography variant="h6" fontWeight="700" color="error.main" sx={{ mt: 0.5 }}>
                  {selectedItem.current_stock} {selectedItem.unit}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Quantity Input */}
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Quantity to Issue"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="0.00"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TagIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Reference Input */}
          <TextField
            fullWidth
            margin="normal"
            label="Reference Destination"
            name="reference"
            value={form.reference}
            onChange={handleChange}
            placeholder="e.g. Kitchen consumption, Volunteer distribution"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Remarks Input */}
          <TextField
            fullWidth
            margin="normal"
            multiline
            rows={3}
            label="Remarks / Description"
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            placeholder="Provide details about the purpose of issuance, department request reference, etc."
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  <NotesIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                px: 5,
                py: 1.25,
                fontWeight: "700",
                background: "linear-gradient(90deg, #ef4444 0%, #f87171 100%)",
                "&:hover": {
                  background: "linear-gradient(90deg, #dc2626 0%, #ef4444 100%)",
                }
              }}
            >
              Issue Stock
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default IssueStock;