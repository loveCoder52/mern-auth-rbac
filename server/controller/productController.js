import Product from "../model/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.userId,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find();

  res.json({
    success: true,
    products,
  });
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json({
    success: true,
    product,
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json({
    success: true,
    product,
  });
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Product deleted",
  });
};