import Inquiry from "../model/inquiryModel.js";

export const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

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
  const inquiries = await Inquiry.find()
    .populate("product")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    inquiries,
  });
};