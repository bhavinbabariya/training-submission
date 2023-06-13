const express = require("express");
const { fetchAllOrders, placeOrder } = require("../controller/order");

const router = express.Router();

router.get("/fetch-all-order", fetchAllOrders);
router.post("/place-order", placeOrder);
module.exports = router;
