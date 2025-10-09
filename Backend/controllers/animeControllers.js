import Anime from "../models/Anime.js";

// @desc    Add new anime/movie
// @route   POST /api/animes
export const addAnime = async (req, res) => {
  try {
    const anime = await Anime.create(req.body);
    res.status(201).json(anime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all animes/movies
// @route   GET /api/animes

export const getAnimes = async (req, res) => {
    try {
    const animes = await Anime.find().sort({ createdAt: -1 });
    res.json(animes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching anime with ID:", id);

    const anime = await Anime.findById(id);
    console.log("backend res",anime);
    if (!anime) return res.status(404).json({ message: "Anime not found" });

    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getFilteredAnimes = async (req, res) => {
  try {
    const filters = req.body;
    console.log("Received filters:", filters);

    const query = {};

    // 🔍 Title filter (case-insensitive, partial)
    if (filters.title && filters.title.trim() !== "") {
      query.title = { $regex: filters.title.trim(), $options: "i" };
    }

    // 🎭 Genre filter (case-insensitive)
    if (filters.genre && filters.genre !== "any") {
      query.genre = { $regex: filters.genre, $options: "i" };
    }

    // 🌸 Season filter (case-insensitive)
    if (filters.season && filters.season !== "any") {
      query.season = { $regex: filters.season, $options: "i" };
    }

    // 📺 Format filter (map -> type field in DB)
    if (filters.format && filters.format !== "any") {
      query.type = { $regex: filters.format, $options: "i" };
    }

    // ⚡ Status filter (case-insensitive)
    if (filters.status && filters.status !== "any") {
      query.status = { $regex: filters.status, $options: "i" };
    }

    // 🔽 Sorting options
    let sortOption = {};
    if (filters.sort && filters.sort !== "any") {
      switch (filters.sort) {
        case "title_asc":
          sortOption.title = 1;
          break;
        case "title_desc":
          sortOption.title = -1;
          break;
        case "releaseDate_asc":
          sortOption.year = 1; // ✅ match schema field
          break;
        case "releaseDate_desc":
          sortOption.year = -1;
          break;
        case "trending": // optional
          sortOption.createdAt = -1; // most recent first
          break;
        default:
          sortOption = {};
      }
    }

    console.log("Mongo Query:", query, "Sort:", sortOption);

    // 🗂️ Fetch from DB
    const animes = await Anime.find(query).sort(sortOption);

    res.status(200).json(animes);
  } catch (error) {
    console.error("Error in getFilteredAnimes:", error);
    res.status(500).json({ message: error.message });
  }
};

