import Product from "../model/productModel.js";
import cloudinary from "../config/cloudinary.js";

const pickProductFields = ({ title, description, price, category, stock }) => ({
  title: title?.trim(),
  description: description?.trim(),
  price: Number(price),
  category: category?.trim(),
  stock: Number(stock ?? 0),
});

const parseJsonArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getUploadedImages = (files = []) =>
  files.map((file) => ({
    public_id: file.filename,
    url: file.path,
  }));

const deleteCloudinaryImages = async (publicIds = []) => {
  const ids = publicIds.filter(Boolean);
  if (!ids.length) return;

  const results = await Promise.allSettled(
    ids.map((publicId) => cloudinary.uploader.destroy(publicId))
  );

  const failed = results.filter((result) => result.status === "rejected");
  if (failed.length) {
    throw new Error("Failed to delete one or more product images");
  }
};

const validateProductPayload = (body, { partial = false } = {}) => {
  const fields = pickProductFields(body);
  const errors = [];

  if (!partial || body.title !== undefined) {
    if (!fields.title || fields.title.length < 2) errors.push("Title is required");
  }

  if (!partial || body.description !== undefined) {
    if (!fields.description || fields.description.length < 5) {
      errors.push("Description is required");
    }
  }

  if (!partial || body.category !== undefined) {
    if (!fields.category) errors.push("Category is required");
  }

  if (!partial || body.price !== undefined) {
    if (!Number.isFinite(fields.price) || fields.price < 0) {
      errors.push("Price must be a valid non-negative number");
    }
  }

  if (body.stock !== undefined && (!Number.isFinite(fields.stock) || fields.stock < 0)) {
    errors.push("Stock must be a valid non-negative number");
  }

  return { fields, errors };
};

export const createProduct = async (req, res) => {
  const uploadedImages = getUploadedImages(req.files);

  try {
    const { fields, errors } = validateProductPayload(req.body);

    if (errors.length) {
      await deleteCloudinaryImages(uploadedImages.map((image) => image.public_id));
      return res.status(400).json({ success: false, message: errors.join(". ") });
    }

    const product = await Product.create({
      ...fields,
      images: uploadedImages,
      image: uploadedImages[0]?.url || "",
      createdBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      product,
      images: uploadedImages,
    });
  } catch (error) {
    await deleteCloudinaryImages(uploadedImages.map((image) => image.public_id)).catch(
      console.error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    products,
  });
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  return res.json({
    success: true,
    product,
  });
};

export const updateProduct = async (req, res) => {
  const uploadedImages = getUploadedImages(req.files);

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      await deleteCloudinaryImages(uploadedImages.map((image) => image.public_id));
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { fields, errors } = validateProductPayload(req.body, { partial: true });

    if (errors.length) {
      await deleteCloudinaryImages(uploadedImages.map((image) => image.public_id));
      return res.status(400).json({ success: false, message: errors.join(". ") });
    }

    Object.entries(fields).forEach(([key, value]) => {
      if (req.body[key] !== undefined) product[key] = value;
    });

    const replaceImages = req.body.replaceImages === "true" || req.body.replaceImages === true;
    const removedImagePublicIds = parseJsonArray(req.body.removedImagePublicIds);

    let nextImages = replaceImages ? [] : [...product.images];
    const imagePublicIdsToDelete = replaceImages
      ? product.images.map((image) => image.public_id)
      : removedImagePublicIds;

    if (!replaceImages && removedImagePublicIds.length) {
      nextImages = nextImages.filter(
        (image) => !removedImagePublicIds.includes(image.public_id)
      );
    }

    nextImages = [...nextImages, ...uploadedImages];

    product.images = nextImages;
    product.image = nextImages[0]?.url || "";

    await product.save();
    await deleteCloudinaryImages(imagePublicIdsToDelete);

    return res.json({ success: true, product, images: uploadedImages });
  } catch (error) {
    await deleteCloudinaryImages(uploadedImages.map((image) => image.public_id)).catch(
      console.error
    );

    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await deleteCloudinaryImages(product.images.map((image) => image.public_id));
    await product.deleteOne();

    return res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
