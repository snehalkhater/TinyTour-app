import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { getuserJwtToken } from '../utils';

function Dashboard() {

    const userJWT = getuserJwtToken();
    const [tours, setTours] = useState([]);
    const loadTours = async() => {
        const response = await axios.get("http://localhost:8080/tours",{
            headers:{
                Authorization: `Bearer ${userJWT}`,
            }
        });
        if(response.data.success){
            toast.success(response.data.message);
        }else{
            toast.error("failed to load tours");
        }
    };

    useEffect(() => {
        loadTours();
    }, []);
    return (

        <div>
            <Navbar />
            <h2>Dashboard</h2>
            <Toaster />
            </div>
    )
}

export default Dashboard