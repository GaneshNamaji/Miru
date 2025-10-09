import express from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();
// Configure Cloudinary with your credentials


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// POST /api/delete-file
router.post("/delete-file", async (req, res) => {
  const { publicId, resourceType } = req.body;

  if (!publicId || !resourceType) {
    return res.status(400).json({ message: "Missing publicId or resourceType" });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    
    console.log("Cloudinary delete result:", result);
    res.status(200).json({ message: "Deleted successfully", result });
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    res.status(500).json({ message: "Failed to delete file" });
  }
});

export default router;
