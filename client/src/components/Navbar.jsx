import Logo from "./../assets/tinytour-logo.png";
import { useState, useEffect } from 'react';
import { getUserData, logoutUser } from '../utils';
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import Avtar from "./Avtar";



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
    <div className="bg-teal-400 rounded-full max-w-4xl mx-auto px-6 py-4 flex justify-between items-center shadow-xl mt-6 border border-white/30">
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className='h-10 w-10 inline-block' />
          <span className="playpen-sans text-xl">Tiny Tours</span>
        </Link>
      </div>
      <div>
        {
          userData?.name ? (
            <Link to='/dashboard' className="flex item-center gap-2">
              <Avtar name={userData.name} size="lg" />
              Hello, {userData.name}!
              <div><Button title="logout" varient="tertiary" size="medium" onClick={logoutUser} /></div>
            </Link>
          ) : (
            <Link to="/login">
              <Button title="Login"
                variant="primary"
                size="medium"
              />
            </Link>
          )
        }

      </div>
      <Toaster />
    </div>
  )
}

export default Navbar