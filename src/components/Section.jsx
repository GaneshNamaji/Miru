import React, { useEffect, useState } from 'react'
import Card from './Card'
const Section = ({ Status,animeList }) => {

    console.log("Section Props - Status:", Status);
  const filteredList = animeList.filter((item) => item.status === Status);
  console.log("Filtered List", filteredList);



  if (filteredList.length === 0) {
    return null; // Don't render if no items with that status
  }


    return (

        <div className='w-full my-5 '>
            <div className='flex justify-between items-center mb-2'>
                <h2 className='text-xl font-medium text-gray-400 mb-3'>{Status}</h2>
                <button className='text-sm mr-3 text-gray-400 hover:text-gray-300'>View all</button>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5'>
                {filteredList.map((item,index) => (
            
                    <Card item={item} key={index} />
                ))}

            </div>
        </div>
    )
}

export default Section
