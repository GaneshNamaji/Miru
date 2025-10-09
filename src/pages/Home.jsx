import React, { useEffect, useState } from 'react'
import Banner from '../components/banner'
import Section from '../components/Section'

const Home = () => {
  const status = ["Ongoing", "Completed", "Upcoming"];

  const [animeList, setAnimeList] = useState([]);
  
      useEffect(() => {
    fetch('http://localhost:5000/api/animes')
      .then((response) => response.json())
      .then((data) => {
        setAnimeList(data);
        console.log("Fetched Data:", data);
      })
      .catch((err) => console.error("Error fetching animes:", err));
  }, []);
console.log("Anime List State:", animeList);
  // Filter only the animes that match the given Status\


  return (
    <div className='w-full pl-15'>
      <Banner/>
      <div className='w-full flex flex-col gap-2 px-4'>
        {status.map((item, index) => (
          <Section key={index} Status={item} animeList={animeList} />
        ))}
        
        
      </div>
    </div>
  )
}

export default Home
