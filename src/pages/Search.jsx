import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Search = () => {
  const initialFilters = {
    title: '',
    genre: 'any',
    season: 'any',
    format: 'any',
    status: 'any',
    sort: 'any'
  };

  const [filters, setFilters] = useState(initialFilters);
  const [result, setResult] = useState([]); // ✅ store API response

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name.toLowerCase()]: value // ✅ ensure lowercase key matches backend
    }));
  };

  useEffect(() => {
    const filteredAnimeList = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/animes/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(filters)
        });
        const data = await res.json();
        console.log('Filtered Anime List:', data);
        setResult(data); // ✅ update state
      } catch (error) {
        console.error('Error fetching filtered anime list:', error);
      }
    };

    filteredAnimeList(); // ✅ call the function
  }, [filters]);

  function getOptions(key) {
    const optionsMap = {
      Genre: ['Romcom', 'Action'],
      Season: ['Spring', 'Summer'],
      Format: ['TV', 'OVA','Movie','Special'],
      Status: ['Ongoing', 'Completed'],
      Sort: ['Trending', 'Popular']
    };
    return optionsMap[key] || [];
  }

  return (
    <div className='w-full pl-15'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 bg-gray-800 overflow-x-hidden'>
        <div className='flex flex-col w-full p-4'>
          <h1 className='text-xl text-gray-100 font-semibold mb-4'>Title</h1>
          <input
            className='bg-gray-700 text-gray-400 p-0.5'
            onChange={handleChange}
            name='title'
            value={filters.title}
            type='text'
          />
        </div>

        {['Genre', 'Season', 'Format', 'Status', 'Sort'].map((item, index) => (
          <div key={index} className='flex flex-col w-full p-4'>
            <h1 className='text-xl text-gray-100 font-semibold mb-4'>{item}</h1>
            <select
              className='w-full bg-gray-700 text-gray-400 p-0.5 text-sm overflow-hidden truncate'
              name={item.toLowerCase()} // ✅ ensure lowercase keys match state
              value={filters[item.toLowerCase()]}
              onChange={handleChange}
              id={item}
            >
              <option className='w-full' value='any'>
                Any
              </option>
              {getOptions(item).map((option, idx) => (
                <option className='w-full' key={idx} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className='w-full px-5'>
        <h2 className='text-xl font-semibold text-gray-300 mb-6'>Filtered</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5'>
          {result.length > 0 ? (
            result.map((item, index) => <Card key={index} item={item} />)
          ) : (
            <p className='text-gray-400'>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
