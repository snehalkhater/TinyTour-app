import React from 'react'
import { useEffect } from 'react';
import { setPageTitle } from "./../utils.jsx"
function NewTour() {
        useEffect(() => {
           setPageTitle("Edit Tour - TinyTours");
        },[]);
  return (
    <div>NewTour</div>
  )
}

export default NewTour