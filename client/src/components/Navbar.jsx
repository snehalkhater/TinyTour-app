import Logo from "./../assets/tinytour-logo.png";
import { useState, useEffect } from 'react';
import { getUserData, logoutUser } from '../utils';
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
function Navbar() {
  const [userData, setUserData] = useState({});
  const fetchUserData = () => {
    const data = getUserData();
    console.log("Fetchuser data:", data)
    setUserData(data);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className='bg-blue-300 px-5 py-4 flex justify-around item-center'>
      <div>
        <Link to="/">
        <img src={Logo} alt="logo" className='h-8 inline-block' />
        <span>Tiny Tours</span>
        </Link>
      </div>
      <div>
        {
          userData?.name ? (
            <div className="flex item-center">
              <sapm className="bg-black text-white flex items-center rounded-full justify-center h-8 w-8 mr-2">{
                userData?.name[0]}</sapm>
              Hello, {userData.name}!
              <div><Button title="logout" varient="tertiary" size="medium" onClick={logoutUser} /></div>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-blue-500 px-3 py-1 rounded mr-2">Login</Link>
          )
        }

      </div>
      <Toaster />
    </div>
  )
}

export default Navbar