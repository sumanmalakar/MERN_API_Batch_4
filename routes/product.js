import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

// @method - get
// @route - /api/products/get
// @desc - to get all products
router.get("/get", getProducts);

// @method - post
// @route - /api/products/add
// @desc - to add product
router.post("/add", addProduct);

// @method - get
// @route - /api/products/:id
// @desc - to get single product
router.get("/:id", getProductById);

// @method - delete
// @route - /api/products/:id
// @desc - to delete product
router.delete("/:id", deleteProduct);

// @method - put
// @route - /api/products/:id
// @desc - to update product
router.put("/:id", updateProduct);

export default router;
