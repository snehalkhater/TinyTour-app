import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { getuserJwtToken } from '../utils';
import addNewTour from "./../assets/add-new-tour.png"
import { Link } from 'react-router';
import TourCard from '../components/TourCard';

function Dashboard() {

    const userJWT = getuserJwtToken();

    const [tours, setTours] = useState([]);

    const loadTours = async () => {
        const response = await axios.get("http://localhost:8080/tours", {
            headers: {
                Authorization: `Bearer ${userJWT}`,
            }
        });
        if (response.data.success) {
            toast.success(response.data.message);
            setTours(response.data.data);
        } else {
            toast.error("failed to load tours");
        }
    };

    useEffect(() => {
        loadTours();
    }, []);
    return (

        <div>
            <Navbar />
            <div className="w-120 block mx-auto mt-10">
                <h2>Dashboard</h2>
                <Link to="/tours/new">
                    <img src={addNewTour} alt="add new tour" className='fixed bottom-10 right-10 h-15 cursur-pointer' />
                </Link>
                {tours.map((tourItem, index) => {
                    return <TourCard key={index} {...tourItem} />;
                })}
                <Toaster />
            </div>
        </div>
    )
}

export default Dashboard