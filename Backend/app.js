import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import animeRoutes from "./routes/animeRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cloudinaryRoutes from "./routes/cloudinary.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/animes", animeRoutes);
app.use("/api", cloudinaryRoutes);



// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
export default app;