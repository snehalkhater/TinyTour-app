import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { setPageTitle, getuserJwtToken } from "./../utils.jsx";
import Navbar from '../components/Navbar';
import Input from '../components/Input.jsx';
import MultiSelect from '../components/MultiSelect.jsx';
import Button from '../components/Button.jsx';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import PhotoViewer from "./../components/PhotoViewer.jsx"

function NewTour() {
  const [newTour, setNewTour] = useState({
    "title": "",
    "description": "",
    "cities": [],
    "startDate": "",
    "endDate": "",
    "photos": []
  });
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("http://localhost:8080/auth");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };
  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey, } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      setNewTour({
        ...newTour,
        photos: [...newTour.photos, uploadResponse.url],
      });

      setProgress(0);
      fileInput.value = "";
    } catch (error) {
      console.log(error)
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };



  const addTour = async () => {
    const response = await axios.post("http://localhost:8080/tours", newTour, {
      headers: {
        Authorization: `Bearer ${getuserJwtToken()}`,
      }
    });
    console.log(response.data);
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
        <Input type="date"
          placeholder="Enter Start Date..."
          value={newTour.startDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              startDate: e.target.value,

            })
          }}
        />
        <Input type="date"
          placeholder="Enter End Date..."
          value={newTour.endDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              endDate: e.target.value,

            })
          }}
        />
        <div className='flex gap-x-2'>
          {newTour.photos?.map((photo, index) => (
            <PhotoViewer key={index} imgUrl={photo} index={index} onDelete={(url) => {
              setNewTour({
                ...newTour, photos: newTour.photos.filter((p) => p !== url)
              })
            }}
              showDelete
            />
          ))}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            console.log("file selected");
            console.log(e.target.files)
            if (e.target.files.length > 0) {
              handleUpload();
            }
          }}
        />
        {progress > 0 ? `Uploading...${progress}%` : null}
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