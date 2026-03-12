import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx"
import Signup from "./views/Signup.jsx"
import Tours from "./views/Tours.jsx"
import NewTour from './views/NewTour';
import EditTour from './views/EditTour';
import Dashboard from './views/Dashboard.jsx';

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/tours' element={<Tours />}></Route>
      <Route path='/tours/new' element={<NewTour />}></Route>
      <Route path='/tours/edit' element={<EditTour />}></Route>
    </Routes>
  </BrowserRouter>

);
