import axios from "axios";
import { useEffect, useState } from 'react';
import { setPageTitle } from "./../utils.jsx";
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";

function Login() {
  useEffect(() => {
    setPageTitle("Login - TinyTours");
  }, []);


  const [loginUser, setloginUser] = useState({
    email: "",
    password: "",
  });


  const checkUserLogin = async () => {
    const response = await axios.post("http://localhost:8080/login", loginUser);

    console.log(response.data);

    if (response.data.success) {
      toast.success(response.data.message, { id: "loginSuccess" });
      setloginUser({
        email: "",
        password: "",
      });

      const {jwtToken, data} = response.data;
      localStorage.setItem("userJwtToken", jwtToken);
            localStorage.setItem("userData", JSON.stringify(data));
    } else {
      toast.error(response.data.message, { id: "loginError" });
    }
  };


  return (
    <div>
      <h1>Login</h1>
      <div className="w-75 block mx-auto">
        <Input type="email"
          placeholder="Email"
          value={loginUser.email}
          onChange={(e) => {
            setloginUser({ ...loginUser, email: e.target.value })
          }}
        />
        <Input type="password"
          placeholder="password"
          value={loginUser.password}
          onChange={(e) => {
            setloginUser({ ...loginUser, password: e.target.value })
          }}
        />
        <Button
          title="Login"
          onClick={checkUserLogin}
        />

        <Link to="/signup" className="block my-2 text-blue-500">Don't have an account? Register</Link>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default Login