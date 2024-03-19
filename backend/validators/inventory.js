const { check } = require("express-validator");

exports.inventoryCreateValidator = [
  check("item_name").not().isEmpty().withMessage("Item Name is Required"),
  check("sku").not().isEmpty().withMessage("SKU is Required"),

  check("serial_number")
    .not()
    .isEmpty()
    .withMessage("Serial Number is Required"),

  check("vendor_details")
    .not()
    .isEmpty()
    .withMessage("Vendor Details is Required"),

  check("item_location")
    .not()
    .isEmpty()
    .withMessage("Item Location is Required"),
  check("expiry_date").not().isEmpty().withMessage("Expiry Date is Required"),
  check("quantity_available")
    .not()
    .isEmpty()
    .withMessage("Quantity Available is Required"),
  check("minimum_stock")
    .not()
    .isEmpty()
    .withMessage("Minimum Stock is Required"),
];
