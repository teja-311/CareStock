import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  InputAdornment
} from "@mui/material";

import {
  Add as AddIcon,
  Search as SearchIcon
} from "@mui/icons-material";

import DashboardLayout from "../layouts/DashboardLayout";
import InventoryTable from "../components/InventoryTable";
import ItemDialog from "../components/ItemDialog";
import api from "../services/api";

const emptyForm = {
  item_name: "",
  category_id: "",
  unit: "",
  current_stock: "",
  minimum_stock: "",
  expiry_date: "",
  expiry_alert_days: 30,
  notes: ""
};

function Inventory() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [searchQuery, setSearchQuery] = useState("");

  const loadItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadItems();
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddClick = () => {
    setForm(emptyForm);
    setEditMode(false);
    setSelectedId(null);
    setOpen(true);
  };

  const handleEditClick = (item) => {
    setForm({
      item_name: item.item_name,
      category_id: item.category_id,
      unit: item.unit,
      current_stock: item.current_stock,
      minimum_stock: item.minimum_stock,
      expiry_date: item.expiry_date ? item.expiry_date.slice(0, 10) : "",
      expiry_alert_days: item.expiry_alert_days,
      notes: item.notes || ""
    });

    setEditMode(true);
    setSelectedId(item.item_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(emptyForm);
    setEditMode(false);
    setSelectedId(null);
  };

  const handleDeactivate = async (item) => {
    const confirmed = window.confirm(
      `Deactivate "${item.item_name}"? It will be hidden from active inventory but its transaction history is kept.`
    );

    if (!confirmed) return;

    try {
      await api.patch(`/items/${item.item_id}/deactivate`);
      loadItems();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to deactivate item");
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        expiry_date: form.expiry_date || null
      };

      if (editMode) {
        await api.put(`/items/${selectedId}`, payload);
      } else {
        await api.post("/items", payload);
      }

      handleClose();
      loadItems();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        (editMode ? "Unable to update item" : "Unable to add item")
      );
    }
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 4,
          gap: 2
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ fontFamily: "Outfit", mb: 0.5 }}>
            Inventory Management
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            View and manage active stock levels, categories, and expiry dates.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{
            py: 1.25,
            px: 3,
            background: "linear-gradient(90deg, #0d9488 0%, #14b8a6 100%)",
            "&:hover": {
              background: "linear-gradient(90deg, #0f766e 0%, #0d9488 100%)",
            }
          }}
        >
          Add Item
        </Button>
      </Box>

      {/* Search and Filters Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search items by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: 400,
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Inventory Table */}
      <InventoryTable
        items={filteredItems}
        onEdit={handleEditClick}
        onDeactivate={handleDeactivate}
      />

      {/* Item Dialog Form */}
      <ItemDialog
        open={open}
        onClose={handleClose}
        form={form}
        handleChange={handleChange}
        handleSave={handleSave}
        editMode={editMode}
        categories={categories}
      />
    </DashboardLayout>
  );
}

export default Inventory;