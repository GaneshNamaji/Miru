import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FiLogIn, FiHome } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { CiTimer } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

const navigate = useNavigate();
  return (
      <div className='absolute top-0 left-0 z-100 flex-none flex-col h-screen w-15 hover:w-60 bg-gray-800 p-2 transition-all duration-400 overflow-hidden'>
        <Link to="/"> <img className='w-10 h-10' src={logo} alt="miru"/></Link>
        <div className='flex flex-col mt-40 gap-3'>

          <Link to="/" className='w-80 text-white text-sm mb-4 hover:text-gray-400 flex gap-10'>
            <FiLogIn className='ml-2 text-lg' />
            <span>Login</span>
          </Link>   


          <Link to="/" className='w-80 text-white text-sm mb-4 hover:text-gray-400 flex gap-10'>
            <FiHome className='ml-2 text-lg' />
            <span>Home</span>
          </Link>

          <Link to="/search" className='w-80 text-white text-sm mb-4 hover:text-gray-400 flex gap-10'>
            <IoIosSearch className='ml-2 text-lg' />
            <span>Search</span>
          </Link>

          <Link to="/search" className='w-80 text-white text-sm mb-4 hover:text-gray-400 flex gap-10'>
            <CiTimer className='ml-2 text-lg' />
            <span>Schedule</span>
          </Link>

          <Link to="/admin/add" className='w-80 text-white text-sm mb-4 hover:text-gray-400 flex gap-10'>
            <FaCirclePlus  className='ml-2 text-lg' />
            <span>Add</span>
          </Link>

        </div>
      </div>

      )
}

      export default Navbar
