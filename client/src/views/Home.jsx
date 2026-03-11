import React from 'react'
import { useEffect } from 'react';
import { setPageTitle } from "./../utils.jsx"
import Navbar from '../components/Navbar';

function Home() {
      useEffect(() => {
          setPageTitle("Edit Tour - TinyTours");
      },[]);
  return (
    <div><Navbar />
    Home</div>
  )
}

export default Home