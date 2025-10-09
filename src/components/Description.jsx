import { useEffect, useState } from 'react';
import Card from './Card';

const Description = ({ anime }) => {
  const [allAnimes, setAllAnimes] = useState([]);
  const [relatedAnimeList, setRelatedAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all animes once
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/animes/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch animes");
        return res.json();
      })
      .then((data) => {
        setAllAnimes(data);
        console.log("Fetched all animes:", data);
      })
      .catch((err) => {
        console.error("Error fetching all animes:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);
console.log("anime",anime)
  // Recalculate related animes whenever `anime` or `allAnimes` changes
  
  useEffect(() => {
  if (!anime?.genre || allAnimes.length === 0) return;

  // Normalize: lowercase + split on comma or space
  const selectedAnimeGenre = anime.genre
    .toLowerCase()
    .split(/[\s,]+/) // split on space OR comma
    .filter(Boolean); // remove empty strings

  console.log("selectedAnimeGenre:", selectedAnimeGenre);

  const related = allAnimes.filter((a) => {
    const allAnimeGenres = (a.genre || "")
      .toLowerCase()
      .split(/[\s,]+/)
      .filter(Boolean);

    console.log("allAnimeGenres:", allAnimeGenres);

    const setB = new Set(allAnimeGenres);

    return (
      selectedAnimeGenre.some((item) => setB.has(item)) &&
        a._id !== anime._id// exclude itself
    );
  });

  setRelatedAnimeList(related);
  console.log("Related anime list:", related);
}, [anime, allAnimes]);


  if (loading) {
    return <p className="text-gray-400">Loading description...</p>;
  }

  if (error) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  return (
    <div className="text-gray-300 w-full flex-col">
      {/* Synopsis Section */}
      <div className="w-full mt-2">
        <h2 className="text-lg mb-3 text-center text-gray-100 font-semibold">
          Synopsis
        </h2>
        <p className="text-sm">
          {/* Replace with API synopsis later */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eius
          labore officia dolorum modi consequuntur commodi eaque assumenda!
          Architecto dolor fugit optio tempora.
        </p>
        <h5 className="mt-5 text-sm">Notes:</h5>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, porro.
        </p>
      </div>

      {/* Related Section */}
      <div className="w-full mt-10">
        <h2 className="text-lg text-center font-semibold text-gray-100">
          Related
        </h2>
        <div className="w-full flex flex-wrap justify-center gap-4 mt-5">
          {relatedAnimeList.length > 0 ? (
            relatedAnimeList.map((item, index) => (
              <Card item={item} key={index} />
            ))
          ) : (
            <p className="text-gray-400 text-sm">No related animes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
