import React from 'react'
import { useEffect, useState } from 'react';
import { setPageTitle,getuserJwtToken } from "./../utils.jsx";
import Navbar from '../components/Navbar';
import Input from '../components/Input.jsx';
import MultiSelect from '../components/MultiSelect.jsx';
import Button from '../components/Button.jsx';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";


function NewTour() {
  const [newTour, setNewTour] = useState({
    "title": "",
    "description": "",
    "cities": [],
    "startDate": "",
    "endDate": "",
    "photos": []
  });

const addTour = async () => { 
const response = await axios.post("http://localhost:8080/tours", newTour,{
  headers: {
    Authorization: `Bearer ${getuserJwtToken()}`,
  }
});
console.log(Response.data);
if (response.data.success) {
        toast.success(response.data.message);
    } else {
        toast.error("failed to add the tours");
    }
};


  useEffect(() => {
    setPageTitle("Edit Tour - TinyTours");
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Add New Tour</h1>
      <div className='w-85 block mx-auto '>
        <Input type="text"
          placeholder="Enter Title..."
          value={newTour.title}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              title: e.target.value,

            })
          }}
        />
        <Input type="text"
          placeholder="Enter Discription..."
          value={newTour.description}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              description: e.target.value,

            })
          }}
        />

        <MultiSelect
          selectedItems={newTour.cities}
          placeholder={"Enter Cities..."}
          onAddItem={(val) => {
            setNewTour({
              ...newTour,
              cities: [...newTour.cities, val]
            });
          }}
          onRemoveItem={(val) => {
            setNewTour({
              ...newTour,
              cities: newTour.cities.filter((city) => city !== val),
            });
          }}
        />
        <Input type="Date"
          placeholder="Enter Start Date..."
          value={newTour.startDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              startDate: e.target.value,

            })
          }}
        />
        <Input type="Date"
          placeholder="Enter End Date..."
          value={newTour.endDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              endDate: e.target.value,

            })
          }}
        />
      </div>
      <div className='w-80 block mx-auto mt-10'>
        <Button title="Add Tour" 
        varient='primary'
        size='medium'
        onClick={addTour}
         />
      </div>
      <Toaster />
   </div>
  )
}

export default NewTour