import React from 'react';

const VideoCard = ({ videoUrl }) => {
  console.log("Video link received in VideoCard:", videoUrl);
  console.log(typeof videoUrl, videoUrl);

  if (!videoUrl) {
    return (
      <div className="w-full flex bg-gray-700 mb-7 flex-wrap lg:flex-nowrap lg:justify-items-start">
        <p className="text-gray-300 p-4">Loading video...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex bg-gray-700 mb-7 flex-wrap lg:flex-nowrap lg:justify-items-start">
      <video
        className="lg:w-[40%] p-4 object-cover lg:p-0"
        width="320"
        height="240"
        crossOrigin="anonymous"
        controls
        poster="images/thumbnail.webp"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="w-full md:w-2/3 flex flex-col p-4 mb-3">
        <div className="flex justify-between flex-wrap">
          <h2 className="text-lg font-semibold text-gray-200 mb-3">
            <span>1.</span> title
          </h2>
          <p className="text-sm text-gray-300">24m</p>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Alice in Borderland (Japanese: 今際の国のアリス, Hepburn: Imawa no Kuni no Arisu) is a Japanese suspense manga series written and illustrated by Haro Aso.
        </p>
        <p className="text-xs text-gray-400">2 months ago</p>
      </div>
    </div>
  );
};

export default VideoCard;
