import express from "express";
import { addAnime, getAnimes, getAnimeById,getFilteredAnimes} from "../controllers/animeControllers.js";

const router = express.Router();

router.post("/", addAnime);
router.get("/", getAnimes);
router.get("/:id", getAnimeById); // Optional: Get anime by ID
router.post("/search", getFilteredAnimes);

export default router;
