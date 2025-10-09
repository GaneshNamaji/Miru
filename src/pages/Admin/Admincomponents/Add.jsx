import { useState, useRef } from "react";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    type: "TV Series",
    genre: "",
    season: "Summer",
    status: "Ongoing",
    synopsis: "",
    notes: "",
    imageUrl: "",
    videoUrl: "",
    imagePublicId: "", // store Cloudinary public_id
    videoPublicId: "",
  });

  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload to Cloudinary
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");

    try {
      const cloudName = "dfhfvxic3";
      const resourceType = type === "video" ? "video" : "image";

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        { method: "POST", body: data }
      );

      const uploadedFile = await res.json();
      console.log("Uploaded File:", uploadedFile);

      setFormData((prev) => ({
        ...prev,
        [type === "video" ? "videoUrl" : "imageUrl"]: uploadedFile.secure_url,
        [type === "video" ? "videoPublicId" : "imagePublicId"]: uploadedFile.public_id,
      }));
    } catch (error) {
      console.error("Upload Error:", error);
      alert("File upload failed!");
    }

    setUploading(false);
  };

  // Remove file from Cloudinary + state
  const removeFile = async (type) => {
    const publicId = type === "video" ? formData.videoPublicId : formData.imagePublicId;
    const resourceType = type === "video" ? "video" : "image";

    if (!publicId) return;

    try {
      const res = await fetch("http://localhost:5000/api/delete-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId, resourceType }),
      });

      if (!res.ok) throw new Error("Failed to delete file");

      setFormData((prev) => ({
        ...prev,
        [type === "video" ? "videoUrl" : "imageUrl"]: "",
        [type === "video" ? "videoPublicId" : "imagePublicId"]: "",
      }));

      // reset file input
      const inputEl = type === "video" ? videoInputRef.current : imageInputRef.current;
      if (inputEl) inputEl.value = "";
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file");
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Final Data to Save:", formData);

    try {
      const res = await fetch("http://localhost:5000/api/animes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Anime/Movie added successfully!");
        setFormData({
          title: "",
          year: "",
          type: "TV Series",
          genre: "",
          season: "Summer",
          status: "Ongoing",
          synopsis: "",
          notes: "",
          imageUrl: "",
          videoUrl: "",
          imagePublicId: "",
          videoPublicId: "",
        });

        if (imageInputRef.current) imageInputRef.current.value = "";
        if (videoInputRef.current) videoInputRef.current.value = "";
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save!");
    }
  };

  return (
    <div className="w-full max-w-2xl min-h-fit mx-auto my-10 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-100 text-center mb-6">
        Add Anime / Movie
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-red-500"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-red-500"
            placeholder="2024"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-red-500"
          >
            <option>TV Series</option>
            <option>Movie</option>
            <option>OVA</option>
            <option>Special</option>
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-red-500"
            placeholder="e.g. Action, Fantasy, Drama"
          />
        </div>

        {/* Season */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Season</label>
          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-red-500"
          >
            <option>Summer</option>
            <option>Spring</option>
            <option>Winter</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-red-500"
          >
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>
        </div>

        {/* Synopsis */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Synopsis</label>
          <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-red-500"
            placeholder="Write synopsis..."
            rows={4}
            required
          ></textarea>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-red-500"
            placeholder="Any extra notes..."
            rows={2}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Image</label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={(e) => handleFileUpload(e, "image")}
            className="w-full text-gray-300 cursor-pointer"
          />
          {formData.imageUrl && (
            <div className="relative mt-2 w-32 h-32">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeFile("image")}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-sm"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Video</label>
          <input
            id="video-input"
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={(e) => handleFileUpload(e, "video")}
            className="w-full text-gray-300 cursor-pointer"
          />
          {formData.videoUrl && (
            <div className="relative mt-2 w-full">
              <video src={formData.videoUrl} controls className="w-full rounded" />
              <button
                type="button"
                onClick={() => removeFile("video")}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-sm"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full p-2 rounded text-white font-semibold cursor-pointer transition-all ${uploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {uploading ? "Uploading..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
