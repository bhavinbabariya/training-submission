const express = require("express");
const { fetchAllProducts, addProduct } = require("../controller/product");

const router = express.Router();

router.get("/fetch-all-product", fetchAllProducts);
router.post("/add-product", addProduct);
module.exports = router;
