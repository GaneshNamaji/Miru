import { FaCalendarDays } from "react-icons/fa6";
import { LuTvMinimalPlay } from "react-icons/lu";
import cardimg from '../assets/card.png'
import { useNavigate } from "react-router-dom";

const Card = ({item}) => {
  const navigate = useNavigate();
console.log("Card Props - Item:", item);
  const handleClick = () => {
    navigate(`/video/${item._id}`);
  };
  return (
    <div onClick={handleClick} className='max-w-40 shadow-lg hover:scale-115 transition-all duration-300 cursor-pointer mb-4'>
        <img className="objec-fill h-40" src={item?.imageUrl}  alt="img not loading" />
        <div className='p-1'>
            <h2 className='text-sm font-bold text-gray-100'>{item?.title}</h2>
            <div className='flex justify-between items-center mt-7'>
                <h4 className='flex items-center text-gray-300'><FaCalendarDays className='mr-1' /><span className='text-sm'>{item?.year}</span></h4>
                <h4 className='flex items-center text-gray-300'><LuTvMinimalPlay className='mr-1' /><span className='text-sm'>{item?.status}</span></h4>
            </div>
        
</div>
    </div>
  )
}

export default Card
