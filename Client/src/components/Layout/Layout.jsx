import React from 'react'
import Navbar from '../Navbar/Navbar.js'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer.js'

export const Layout = () => {
  return (
    <> 
    <div>
        <Navbar/>
        <Outlet/>
    </div>
    <Footer/>
    </>
  )
}
