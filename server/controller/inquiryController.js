import Inquiry from "../model/inquiryModel.js";

export const createInquiry = async (req, res) => {
  try {
    const { customerName, phone, message, product } = req.body;

    if (!customerName?.trim() || !phone?.trim() || !product) {
      return res.status(400).json({
        success: false,
        message: "Customer name, phone, and product are required",
      });
    }

    // Only accept fields a customer should be able to set — status is
    // internal and must always start as 'pending', regardless of what
    // the request body contains.
    const inquiry = await Inquiry.create({
      customerName: customerName.trim(),
      phone: phone.trim(),
      message: message?.trim() || "",
      product,
    });

    res.status(201).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};