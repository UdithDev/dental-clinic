const Inventory = require("../models/inventoryModel");
const asyncHandler = require("express-async-handler");

const nodemailer = require("nodemailer");

const getInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventory.find();
  res.json(inventory);
});

const createInventoryItem = asyncHandler(async (req, res) => {
  const {
    item_name,
    sku,
    serial_number,
    vendor_details,
    item_location,
    expiry_date,
    quantity_available,
    minimum_stock,
  } = req.body;

  //check if sku already exists in databse
  const existingItem = await Inventory.findOne({ sku });

  if (existingItem) {
    res.status(400).json({ error: "SKU is already exists in the database" });
    throw new Error(`SKU ${sku} already exists in database`);
  }

  //sku does not exists, create new inventory item
  const inventoryItem = new Inventory({
    item_name,
    sku,
    serial_number,
    vendor_details,
    item_location,
    expiry_date,
    quantity_available,
    minimum_stock,
  });

  const createdItem = await inventoryItem.save();
  res.status(201).json(createdItem);
});

const deleteInventoryItem = asyncHandler(async (req, res) => {
  const removedItem = await Inventory.findOneAndDelete({
    _id: req.params.id,
  })
    .exec()
    .then(() => {
      res.json({ success: "Item deleted" });
    })
    .catch((err) => {
      res.status(404).json({ error: "Item Not Found" });
    });
});

const sendEmail = asyncHandler(async (req, res) => {
  const { item_name, sku, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "daveudith@gmail.com",
      pass: "tdodiwlwbwqfnjyo",
    },
  });

  const mailOptions = {
    from: "daveudith@gmail.com",
    to: email,
    subject: `Expiration reminder for ${item_name}`,
    text: `The item ${item_name} with the SKU:${sku} is about to expire soon`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email send successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error sending email");
  }
});

const updateInventoryItem = asyncHandler(async (req, res) => {
  const {
    item_name,
    sku,
    serial_number,
    vendor_details,
    item_location,
    expiry_date,
    quantity_available,
    minimum_stock,
  } = req.body;

  const updatedItem = await Inventory.findByIdAndUpdate(
    req.params.id,
    {
      item_name,
      sku,
      serial_number,
      vendor_details,
      item_location,
      expiry_date,
      quantity_available,
      minimum_stock,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const getItemById = asyncHandler(async (req, res) => {
  const item = await Inventory.findById(req.params.id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Ïtem not found" });
  }
});

module.exports = {
  getInventory,
  createInventoryItem,
  deleteInventoryItem,
  sendEmail,
  getItemById,
  updateInventoryItem,
};
