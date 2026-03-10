import React from 'react'
import { useEffect } from 'react';

function Tours() {
      useEffect(() => {
          document.title="Tours - TinyTours";
      },[]);
  return (
    <div>Tours</div>
  )
}

export default Tours