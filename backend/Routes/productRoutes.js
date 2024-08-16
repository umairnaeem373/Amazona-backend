import express from "express";
import {
  createProduct,
  createProductReview,
  getProducts,
  getProductsById,
  getTopProducts,
  updateProduct,
} from "../Controllers/productControllers.js";
import { admin, protect } from "../Middleware/authMiddleware.js";
import { deleteProduct } from "../Controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route('/top').get(getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductsById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
