import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
  Box,
  Divider
} from "@mui/material";

function ItemDialog({
  open,
  onClose,
  form,
  handleChange,
  handleSave,
  editMode,
  categories
}) {
  const [focused, setFocused] = useState(false);

  // Reset focus state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setFocused(false);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1.5,
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight="800" sx={{ fontFamily: "Outfit" }}>
          {editMode ? "Edit Item Details" : "Add New Item"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {editMode ? "Modify the item information below." : "Enter details to register a new item in inventory."}
        </Typography>
      </DialogTitle>
      
      <Divider sx={{ mx: 3, my: 1 }} />

      <DialogContent sx={{ py: 1 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Item Name"
          name="item_name"
          value={form.item_name}
          onChange={handleChange}
          placeholder="e.g. Basmati Rice"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          select
          margin="normal"
          label="Category"
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Unit"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            placeholder="e.g. kg, packet, litres"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Current Stock"
            name="current_stock"
            value={form.current_stock}
            onChange={handleChange}
            disabled={editMode}
            helperText={editMode ? "Use Receive/Issue Stock to change quantity" : ""}
            placeholder="0"
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Minimum Stock"
            name="minimum_stock"
            value={form.minimum_stock}
            onChange={handleChange}
            placeholder="0"
            InputLabelProps={{ shrink: true }}
          />

          {/* Expiry Date input field styled to prevent Chrome collapsing label overlap */}
          <TextField
            fullWidth
            margin="normal"
            type={form.expiry_date || focused ? "date" : "text"}
            label="Expiry Date"
            name="expiry_date"
            value={form.expiry_date}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? "" : "Select Date (Optional)"}
            InputLabelProps={{ shrink: !!form.expiry_date || focused }}
          />
        </Box>

        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={3}
          label="Notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Add additional details, storage directions, shelf location, etc."
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1.5, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{
            px: 3,
            borderColor: "divider",
            color: "text.secondary",
            "&:hover": { bgcolor: "action.hover" }
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            px: 4,
            background: "linear-gradient(90deg, #0d9488 0%, #14b8a6 100%)",
            "&:hover": {
              background: "linear-gradient(90deg, #0f766e 0%, #0d9488 100%)",
            }
          }}
        >
          {editMode ? "Save Changes" : "Create Item"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemDialog;