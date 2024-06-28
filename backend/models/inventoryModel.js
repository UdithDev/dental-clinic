const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    serial_number: {
      type: Number,
      required: true,
    },

    vendor_details: {
      type: String,
      required: true,
    },

    item_location: {
      type: String,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    quantity_available: {
      type: String,
      required: true,
    },
    minimum_stock: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const inventory = mongoose.model("Inventory", inventorySchema);
module.exports = inventory;
