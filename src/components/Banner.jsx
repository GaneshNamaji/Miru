
import Bannerimg from '../assets/anime.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";


const banner = () => {
    var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (

<div className="w-full h-75">
      <Slider {...settings}>
        {[1,2,3].map((_, index) => (
          <div key={index} className="w-full h-full">
          <img src={Bannerimg} className="block w-full h-75 object-fill" alt="..." />
          <div className="absolute inset-0 pointer-events-none z-10" style={{
                boxShadow: `
                  inset 0 80px 80px -20px rgba(0,0,0,0.1),   /* Top */
                  inset 0 -80px 80px -20px rgba(0,0,0,0.1),  /* Bottom */
                  inset 80px 0 80px -20px rgba(0,0,0,0.1),   /* Left */
                  inset -80px 0 80px -20px rgba(0,0,0,0.1)   /* Right */
                `
              }} />
        </div>

        ))}
      </Slider>
</div>
  )
}

export default banner
