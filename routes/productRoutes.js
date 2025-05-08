const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post("/", protect, createProduct);

router.put("/:productId", protect, updateProduct);

router.delete("/:productId", protect, deleteProduct);

module.exports = router;
