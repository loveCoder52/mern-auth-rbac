import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleAuth.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";
import { uploadProductImages } from "../middleware/productImageUpload.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

import { PERMISSIONS } from "../config/rolePermission.js";

const router = express.Router();

// PUBLIC: anyone (logged in or not) can browse the catalog.
// No authMiddleware / permissionMiddleware here on purpose —
// this is the customer-facing product listing.
router.get("/", getProducts);
router.get("/:id", getProduct);

// PROTECTED: only admin/manager can create, update, delete.
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "manager"]),
  permissionMiddleware(PERMISSIONS.CREATE_PRODUCT),
  uploadProductImages,
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "manager"]),
  permissionMiddleware(PERMISSIONS.UPDATE_PRODUCT),
  uploadProductImages,
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  permissionMiddleware(PERMISSIONS.DELETE_PRODUCT),
  deleteProduct
);

export default router;