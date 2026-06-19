import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 6;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "mern-auth-rbac/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    transformation: [
      { width: 1600, height: 1600, crop: "limit" },
      { quality: "auto", fetch_format: "auto" },
    ],
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES,
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, WEBP, and GIF images are allowed"));
    }

    return cb(null, true);
  },
});

export const uploadProductImages = (req, res, next) => {
  upload.array("images", MAX_FILES)(req, res, (error) => {
    if (!error) return next();

    if (error instanceof multer.MulterError) {
      const message =
        error.code === "LIMIT_FILE_SIZE"
          ? "Each image must be 5MB or smaller"
          : error.code === "LIMIT_FILE_COUNT"
            ? `You can upload up to ${MAX_FILES} images`
            : error.message;

      return res.status(400).json({ success: false, message });
    }

    return res.status(400).json({
      success: false,
      message: error.message || "Invalid image upload",
    });
  });
};
