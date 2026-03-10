import React from 'react'
import { useEffect } from 'react';

function NewTour() {
        useEffect(() => {
            document.title="New Tour - TinyTours";
        },[]);
  return (
    <div>NewTour</div>
  )
}

export default NewTour