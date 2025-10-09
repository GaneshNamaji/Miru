import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, enum: ["tv", "Movie", "OVA", "Special"], default: "tv" },
    genre: { type: String },
    season: { type: String, enum: ["Summer", "Spring", "Winter", "Fall"] },
    status: { type: String, enum: ["Ongoing", "Completed", "Upcoming"], default: "Ongoing" },
    synopsis: { type: String, required: true },
    notes: { type: String },
    imageUrl: { type: String },
    videoUrl: { type: String },
  },
  { timestamps: true }
);

const Anime = mongoose.model("Anime", animeSchema);

export default Anime;
