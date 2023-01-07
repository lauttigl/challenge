import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
      <div className="navbar flex items-center justify-between p-4 bg-stone-800 text-white  font-light" >
        <Link to={`/`}>
          <button className="bg-fuchsia-900 hover:bg-fuchsia-400 text-white-800 font-light py-4 px-6 rounded-full focus:outline-none focus:shadow-outline-gray" >
            Home
          </button>
        </Link>
        <h1 className="text-pink-200 mb-2" >Bienvenidos al Challenge de Greydive</h1>
      </div>
    );
  };
  



export default NavBar