import React from 'react'
import { useEffect } from 'react';
import { setPageTitle } from "./../utils.jsx"

function Home() {
      useEffect(() => {
          setPageTitle("Edit Tour - TinyTours");
      },[]);
  return (
    <div>Home</div>
  )
}

export default Home