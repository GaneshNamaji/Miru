import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from '../pages/Home'
import Video from '../pages/Video'
import Search from '../pages/Search'
import Add from '../pages/Admin/Admincomponents/Add'
import AdminHome from '../pages/Admin/AdminHome'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/video/:id" element={<Video/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/admin/add" element={<Add/>} />
       <Route path="/admin" element={<AdminHome/>} />
      <Route path="*" element={<div>404 Not Found</div>} /> 
     
      </Routes>
  )
}

export default AllRoutes
