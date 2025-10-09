import React from 'react'
import VideoCard from './videocard'
const VideoList = ({videoUrl}) => {
  return (
    <div className='w-full flex flex-col'>
      {[1].map((_,index)=>(
        <VideoCard videoUrl={videoUrl} key={index} />
      ))}
    </div>
  )
}

export default VideoList
