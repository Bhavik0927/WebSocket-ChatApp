import asyncHandler from "express-async-handler";

export const accessChat = asyncHandler(async (req, res) => {
  console.log("accessChat req.body:", req.body);
  console.log("req.user from Protect:", req.user);

  return res.status(200).json({
    message: "accessChat received",
    body: req.body,
    user: req.user || null,
  });
});

export const fetchChat = asyncHandler(async (req, res) => {});
