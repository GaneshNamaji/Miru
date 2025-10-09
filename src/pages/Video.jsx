import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCalendarDays, FaRegHeart, FaHeart, FaPlay } from "react-icons/fa6";
import { LuTvMinimalPlay } from "react-icons/lu";
import VideoList from '../components/videolist';
import Description from '../components/Description';

const Video = () => {
  const { id } = useParams(); // get id from URL

  const [anime, setAnime] = useState(null);  // null = not loaded yet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  const handleLike = () => setLiked(!liked);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/animes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch anime");
        return res.json();
      })
      .then(data => {
        setAnime(data);
        console.log("Fetched Anime:", data);
      })
      .catch(err => {
        console.error("Error fetching anime:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-300">
        Loading anime...
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-red-400">
        {error}
      </div>
    );
  }

  // ✅ Success state
  return (
    <div className='w-full h-full bg-gray-800 pl-15 overflow-y-scroll'>
      <img src={anime?.imageUrl} alt="img" className='w-full object-fill lg:object-cover h-65'/>
      
      <div className='w-full flex flex-wrap lg:mt-[-200px]'>
        {/* Left side */}
        <div className='w-full sm:w-[60%]'>
          <div className='w-full flex flex-wrap gap-4 p-4'>
            <img src={anime?.imageUrl} alt="" className='w-full h-80 md:w-[25%]'/>
            
            <div className='flex flex-col items-start justify-end w-[70%]'>
              <h2 className='text-3xl font-bold text-gray-300'>{anime?.title}</h2>
              
              <div className='w-2/3 flex flex-wrap gap-3 items-center mt-4'>
                <h4 className='flex items-center text-gray-400'>
                  <FaCalendarDays className='mr-1' />
                  <span className='text-sm'>{anime?.year}</span>
                </h4>
                <h4 className='flex items-center text-gray-400'>
                  <LuTvMinimalPlay className='mr-1' />
                  <span className='text-sm'>{anime?.type}</span>
                </h4>
                <h4 className='flex items-center text-gray-400'>
                  <LuTvMinimalPlay className='mr-1' />
                  <span className='text-sm'>Episodes: 12</span>
                </h4>
              </div>

              <div className='flex gap-2 items-center mt-5'>
                <Link to="/" className='flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-md'>
                  <FaPlay className='mr-2' />Watch Now
                </Link>
                <button className="text-white text-xl" onClick={handleLike}>
                  {liked ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className='w-full p-4'>
            <ul className='flex flex-wrap gap-3 text-gray-400 text-sm font-semibold'>
              <li>{anime?.season}</li>
              <li>{anime?.status}</li>
              <li>Manga</li>
            </ul>
            <div className='w-full bg-gray-50 rounded-2xl h-1 mt-3'></div>
          </div>

          {/* Description */}
          <div className='w-full p-4'>
            <Description anime={anime}/>
          </div>
        </div>

        {/* Right side */}
        <div className='w-full md:w-[40%] bg-transparent pr-5'>
          <VideoList videoUrl={anime?.videoUrl}/>
        </div>
      </div>
    </div>
  );
};

export default Video;
