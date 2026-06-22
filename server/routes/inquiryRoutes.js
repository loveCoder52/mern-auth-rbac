import express from "express";
import {
  createInquiry,
  getAllInquiries,
} from "../controller/inquiryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleAuth.js";
import permissionMiddleware from "../middleware/permissionMiddleware.js";
import { PERMISSIONS } from "../config/rolePermission.js";

const router = express.Router();

// Public — customers submit inquiries without logging in
router.post("/", createInquiry);

// Staff-only — inquiry data includes customer names, phone numbers, and
// messages, so this must not be readable by anonymous visitors.
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "manager"]),
  permissionMiddleware(PERMISSIONS.VIEW_USERS),
  getAllInquiries
);

export default router;