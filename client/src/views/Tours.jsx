import React from 'react'
import { useEffect } from 'react';
import { setPageTitle } from "./../utils.jsx"
function Tours() {
      useEffect(() => {
      setPageTitle("Edit Tour - TinyTours");
      },[]);
  return (
    <div>Tours</div>
  )
}

export default Tours