const express = require("express");
const {
  addToCart,
  getCart,
  removeCartItem,
} = require("../controllers/cartController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:itemId", protect, removeCartItem);

module.exports = router;