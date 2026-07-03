import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";

function Inventory() {

  const [items, setItems] = useState([]);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    item_name: "",
    category_id: "",
    unit: "",
    current_stock: "",
    minimum_stock: "",
    expiry_date: "",
    expiry_alert_days: 30,
    notes: ""
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {

    try {

      const res = await api.get("/items");

      setItems(res.data.data);

    } catch (err) {

      console.error(err);

    }

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSave = async () => {

    try {

      const payload = {
        ...form,
        expiry_date: form.expiry_date || null
      };

      await api.post("/items", payload);

      setOpen(false);

      setForm({
        item_name: "",
        category_id: "",
        unit: "",
        current_stock: "",
        minimum_stock: "",
        expiry_date: "",
        expiry_alert_days: 30,
        notes: ""
      });

      loadItems();

    } catch (err) {

      alert(err.response?.data?.message || "Unable to add item");

    }

  };

  return (

    <DashboardLayout>

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => setOpen(true)}
      >
        + Add Item
      </Button>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Inventory
      </Typography>

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><b>Item</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Stock</b></TableCell>
              <TableCell><b>Unit</b></TableCell>
              <TableCell><b>Minimum</b></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {items.map((item) => (

              <TableRow key={item.item_id}>

                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>{item.current_stock}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.minimum_stock}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >

        <DialogTitle>Add Inventory Item</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Item Name"
            name="item_name"
            value={form.item_name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            select
            margin="normal"
            label="Category"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
          >
            <MenuItem value={1}>Food</MenuItem>
            <MenuItem value={2}>Medicine</MenuItem>
            <MenuItem value={3}>Cleaning</MenuItem>
            <MenuItem value={4}>Personal Care</MenuItem>
            <MenuItem value={5}>Stationery</MenuItem>
            <MenuItem value={6}>Other</MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            label="Unit"
            name="unit"
            value={form.unit}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Current Stock"
            name="current_stock"
            value={form.current_stock}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Minimum Stock"
            name="minimum_stock"
            value={form.minimum_stock}
            onChange={handleChange}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>

    </DashboardLayout>

  );

}

export default Inventory;