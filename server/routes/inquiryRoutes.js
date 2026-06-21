import express from "express";
import {
  createInquiry,
  getAllInquiries,
} from "../controller/inquiryController.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/", getAllInquiries);

export default router;