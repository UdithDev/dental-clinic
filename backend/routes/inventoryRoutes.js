const express = require("express");

//validators
const { inventoryCreateValidator } = require("../validators/inventory");
const { runValidation } = require("../validators");

//controllers

const {
  getInventory,
  createInventoryItem,
  deleteInventoryItem,
  sendEmail,
  updateInventoryItem,
  getItemById,
} = require("../controllers/inventoryController");

const router = express.Router();

router.route("/").get(getInventory);
router
  .route("/add")
  .post(inventoryCreateValidator, runValidation, createInventoryItem);
router
  .route(":/id")
  .get(getItemById)
  .delete(deleteInventoryItem)
  .put(inventoryCreateValidator, runValidation, updateInventoryItem);
router.route("/send-email").post(sendEmail);

module.exports = router;
