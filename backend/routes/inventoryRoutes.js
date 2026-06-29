const express=require("express");

const router=express.Router();

const inventoryController=require("../controllers/inventoryController");

router.get("/",inventoryController.getItems);

router.post("/",inventoryController.createItem);

router.put("/:id",inventoryController.updateItem);

router.patch("/:id/deactivate",inventoryController.deactivateItem);

module.exports=router;