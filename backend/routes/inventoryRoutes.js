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
const { isIntern, isAdmin, isManager } = require("../middlewares/authCheck");

const router = express.Router();

router.get("/", isIntern, getInventory);
router
  .route("/add")
  .post(
    inventoryCreateValidator,
    runValidation,
    isManager,
    createInventoryItem
  );
router
  .route("/:id")
  .get(isIntern, getItemById)
  .delete(isManager, deleteInventoryItem)
  .put(inventoryCreateValidator, runValidation, isManager, updateInventoryItem);
router.route("/send-email").post(isManager, sendEmail);

module.exports = router;
