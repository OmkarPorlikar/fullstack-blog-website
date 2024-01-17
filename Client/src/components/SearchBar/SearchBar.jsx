import React from 'react'
import './SearchBar.css'
import { HiLocationMarker } from "react-icons/hi";
const SearchBar = ({filter , setFilter}) => {
  return (
<div className="flexCenter search-bar ">
      {/* <img src="./images/location pin.svg" alt=" location pin"  className='location'/> */}
      <HiLocationMarker color="var(--blue)" size={25} />
      <input type="text" className='input-bar' value={filter} onChange={(e)=> setFilter(e.target.value)}/>
      <button className='Button'> Search </button>
   </div>
  
    )
}

export default SearchBar