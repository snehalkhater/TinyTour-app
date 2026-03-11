import React from 'react'
import { useEffect } from 'react';
import { setPageTitle } from "./../utils.jsx";
import Navbar from '../components/Navbar';

function NewTour() {
        useEffect(() => {
           setPageTitle("Edit Tour - TinyTours");
        },[]);
  return (
    <div>
      <Navbar />
      NewTour</div>
  )
}

export default NewTour