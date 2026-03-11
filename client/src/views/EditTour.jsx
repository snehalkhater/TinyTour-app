import React, { useEffect } from 'react'
import { setPageTitle } from "./../utils.jsx"
import Navbar from '../components/Navbar';

function EditTour() {
    useEffect(() => {
        setPageTitle("Edit Tour - TinyTours");
    },[]);
  return (
    <div>
      <Navbar />
      EditTour</div>
  )
}

export default EditTour