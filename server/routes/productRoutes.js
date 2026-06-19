import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleAuth.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

import { PERMISSIONS } from "../config/rolePermission.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.VIEW_PRODUCT),
  getProducts
);

router.get(
  "/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.VIEW_PRODUCT),
  getProduct
);

router.post(
  "/",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.CREATE_PRODUCT),
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.UPDATE_PRODUCT),
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware(PERMISSIONS.DELETE_PRODUCT),
  deleteProduct
);

export default router;